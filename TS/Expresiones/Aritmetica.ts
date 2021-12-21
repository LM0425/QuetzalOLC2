import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { OperadorAritmetico, Tipo } from "../AST/Tipo";
import {  TemporalAux } from "../AST/temporalAux";

export class Aritmetica implements Instruccion {

    operador: OperadorAritmetico;
    opIzquierdo: any;
    opDerecho: any;
    fila: number;
    columna: number;
    tipo: Tipo

    constructor(operador: OperadorAritmetico, opIzquierdo: any, opDerecho: any, fila: number, columna: number) {
        this.operador = operador;
        this.opDerecho = opDerecho;
        this.opIzquierdo = opIzquierdo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = null;
    }
    traducir(tree: AST, table: Entorno) {
        //console.log("el izquierdo es: ",this.opIzquierdo);
        var izq = this.opIzquierdo.traducir(tree, table);
        if(izq instanceof Excepcion) return izq;
        if(this.opDerecho !== null){
            var der = this.opDerecho.traducir(tree, table);
            if(der instanceof Excepcion) return der;
        }

        if (this.operador === OperadorAritmetico.MAS) {
            if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                let posStack=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"stack[(int)"+posStack+"]+"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            } else if(this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack=tree.getValorTablaByIdentificador(der);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"+"+"stack[(int)"+posStack+"]");
                tree.addTemporalClase(temporalAux);
                return temporal;
            }else if(this.opIzquierdo.identificador && this.opDerecho.identificador){
                let posStackIzq=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let valueIzq=tree.getValorPosStack(posStackIzq).toString()

                let posStackDer=tree.getValorTablaByIdentificador(der);
                let valueDer=tree.getValorPosStack(posStackDer).toString()

                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"stack[(int)"+posStackIzq+"]+"+"stack[(int)"+posStackDer+"]");
                tree.addTemporalClase(temporalAux);
                return temporal;


            }else{
                let temporal =tree.generarTemporal()
                let texto3d= tree.generarInstruccion(temporal+"="+izq+"+"+der);
                //tree.updateConsola(texto3d);
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"+"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            
                
        }else if (this.operador === OperadorAritmetico.MENOS) {
            if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                let posStack=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,value+"-"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            } else if(this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack=tree.getValorTablaByIdentificador(der);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"-"+value);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }else if(this.opIzquierdo.identificador && this.opDerecho.identificador){
                let posStackIzq=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let valueIzq=tree.getValorPosStack(posStackIzq).toString()

                let posStackDer=tree.getValorTablaByIdentificador(der);
                let valueDer=tree.getValorPosStack(posStackDer).toString()

                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,valueIzq+"-"+valueDer);
                tree.addTemporalClase(temporalAux);
                return temporal;


            }else{
                let temporal =tree.generarTemporal()
                let texto3d= tree.generarInstruccion(temporal+"="+izq+"-"+der);
                //tree.updateConsola(texto3d);
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"-"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            
                
        }else if (this.operador === OperadorAritmetico.POR) {
            if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                let posStack=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,value+"*"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            } else if(this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack=tree.getValorTablaByIdentificador(der);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"*"+value);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }else if(this.opIzquierdo.identificador && this.opDerecho.identificador){
                let posStackIzq=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let valueIzq=tree.getValorPosStack(posStackIzq).toString()

                let posStackDer=tree.getValorTablaByIdentificador(der);
                let valueDer=tree.getValorPosStack(posStackDer).toString()

                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,valueIzq+"*"+valueDer);
                tree.addTemporalClase(temporalAux);
                return temporal;


            }else{
                let temporal =tree.generarTemporal()
                let texto3d= tree.generarInstruccion(temporal+"="+izq+"*"+der);
                //tree.updateConsola(texto3d);
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"*"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            
                
        }else if (this.operador === OperadorAritmetico.DIV) {
            if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                let posStack=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,value+"/"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            } else if(this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack=tree.getValorTablaByIdentificador(der);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"/"+value);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }else if(this.opIzquierdo.identificador && this.opDerecho.identificador){
                let posStackIzq=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let valueIzq=tree.getValorPosStack(posStackIzq).toString()

                let posStackDer=tree.getValorTablaByIdentificador(der);
                let valueDer=tree.getValorPosStack(posStackDer).toString()

                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,valueIzq+"/"+valueDer);
                tree.addTemporalClase(temporalAux);
                return temporal;


            }else{
                let temporal =tree.generarTemporal()
                let texto3d= tree.generarInstruccion(temporal+"="+izq+"/"+der);
                //tree.updateConsola(texto3d);
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+"/"+der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            
                
        }else if (this.operador === OperadorAritmetico.MOD) {
            if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                let posStack=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"fmod("+value+","+der+")");
                tree.addTemporalClase(temporalAux);
                return temporal;
            } else if(this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack=tree.getValorTablaByIdentificador(der);
                let temporal=tree.generarTemporal();
                let value=tree.getValorPosStack(posStack).toString()
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"fmod("+izq+","+value+")");
                tree.addTemporalClase(temporalAux);
                return temporal;
            }else if(this.opIzquierdo.identificador && this.opDerecho.identificador){
                let posStackIzq=tree.getValorTablaByIdentificador(izq);
                let temporal=tree.generarTemporal();
                let valueIzq=tree.getValorPosStack(posStackIzq).toString()

                let posStackDer=tree.getValorTablaByIdentificador(der);
                let valueDer=tree.getValorPosStack(posStackDer).toString()

                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"fmod("+valueIzq+","+valueDer+")");
                tree.addTemporalClase(temporalAux);
                return temporal;


            }else{
                let temporal =tree.generarTemporal()
                //let texto3d= tree.generarInstruccion(temporal+"="+izq+"-"+der);
                //tree.updateConsola(texto3d);
                let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"fmod("+izq+","+der+")");
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            
                
        }
    }

    interpretar(tree: AST, table: Entorno) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion) return izq;
        if (this.opDerecho !== null) {
            var der = this.opDerecho.interpretar(tree, table);
            if (der instanceof Excepcion) return der;
        }

        if (this.operador === OperadorAritmetico.MAS) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) + Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) + parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) + Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) + Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) + parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) + parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) + Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) + parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) + der.charCodeAt(0)
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                //var aux=izq;
                //var ascii =aux.charCodeAt(0).toString();
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.BOOL && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.BOOL) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion +", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.MENOS) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) - Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) - parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) - Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) - Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) - parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) - parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) - Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) - parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) - der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion -", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.POR) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) * Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) * parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) * Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) * Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) * parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) * parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) * Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) * parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) * der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion *", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.DIV) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) / Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) / parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) / Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) / Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) / parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) / parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) / Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) / parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) / der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion /", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.MOD) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) % Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) % parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) % Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) % Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) % parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) % parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) % Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) % parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) % der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion %", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.UMENOS) {

            if(this.opIzquierdo.tipo === Tipo.INT){
                this.tipo = Tipo.INT;
                return izq * -1;
            }else if(this.opIzquierdo.tipo === Tipo.DOUBLE){
                this.tipo = Tipo.DOUBLE;
                return izq * -1;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion (-)", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.CONCATENAR) {

            if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion de Concatenacion", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.REPETIR) {

            if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.STRING;
                var resultado = izq.repeat(Number(der));
                //console.log("iterar:", der);
                return resultado;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion de Repeticion", this.fila, this.columna);
            }

        } else {
            return new Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }

}