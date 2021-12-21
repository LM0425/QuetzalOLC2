import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo, OperadorRelacional } from "../AST/Tipo";
import {  TemporalAux } from "../AST/temporalAux";

export class Relacional implements Instruccion {
    operador: OperadorRelacional;
    opIzquierdo: any;
    opDerecho: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(operador: OperadorRelacional, opIzquierdo: any, opDerecho: any, fila: number, columna: number) {
        this.operador = operador;
        this.opIzquierdo = opIzquierdo;
        this.opDerecho = opDerecho;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.BOOL;
    }
    traducir(tree: AST, table: Entorno) {
        var izq = this.opIzquierdo.traducir(tree, table);
        if (izq instanceof Excepcion) return izq;
        var der = this.opDerecho.traducir(tree, table);
        if (der instanceof Excepcion) return der;
        /* console.log(tree.getTabla());
        console.log(tree.getStack()); */
        if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
            let posStack=tree.getValorTablaByIdentificador(izq);
            //let value=tree.getValorPosStack(Number(posStack)).toString()
            let temporal=tree.generarTemporal();
            let texto3d=tree.generarInstruccion(temporal+" = stack[(int)"+posStack+"]")
            let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"stack[(int)"+posStack+"]");
            tree.addTemporalClase(temporalAux);
            return temporal +this.getSigno(this.operador)+der.toString();;
        } else if(this.opDerecho.identificador && !this.opIzquierdo.identificador) {
            let posStack=tree.getValorTablaByIdentificador(der);
            let temporal=tree.generarTemporal();
            let value=tree.getValorPosStack(posStack).toString()
            let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+this.getSigno(this.operador)+value);
            tree.addTemporalClase(temporalAux);
            return temporal;
        }else if(this.opIzquierdo.identificador && this.opDerecho.identificador){
            let posStackIzq=tree.getValorTablaByIdentificador(izq);
            let temporal=tree.generarTemporal();
            let valueIzq=tree.getValorPosStack(posStackIzq).toString()

            let posStackDer=tree.getValorTablaByIdentificador(der);
            let valueDer=tree.getValorPosStack(posStackDer).toString()

            let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,valueIzq+this.getSigno(this.operador)+valueDer);
            tree.addTemporalClase(temporalAux);
            return temporal;


        }else{
            let temporal =tree.generarTemporal()
            //let texto3d= tree.generarInstruccion(temporal+"="+izq+"+"+der);
            //tree.updateConsola(texto3d);
            let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,izq+this.getSigno(this.operador)+der);
            tree.addTemporalClase(temporalAux);
            return temporal;
        }

        //return izq.toString() +this.getSigno(this.operador)+der.toString();
    }

    interpretar(tree: AST, table: Entorno) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion) return izq;
        var der = this.opDerecho.interpretar(tree, table);
        if (der instanceof Excepcion) return der;

        if (this.operador === OperadorRelacional.IGUALIGUAL) {
            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                return Number(izq) === Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                return Number(izq) === parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                return Number(izq) === der.charCodeAt(0);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                return parseFloat(izq) === Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                return parseFloat(izq) === parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                return parseFloat(izq) === der.charCodeAt(0);
            } else if (this.opIzquierdo.tipo === Tipo.BOOL && this.opDerecho.tipo === Tipo.BOOL) {
                return izq === der;
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                return izq.charCodeAt(0) === Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                return izq.charCodeAt(0) === parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                return izq.charCodeAt(0) === der.charCodeAt(0);
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.STRING) {
                return izq === der;
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para ==.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorRelacional.DIFERENTE) {
            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                return Number(izq) !== Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                return Number(izq) !== parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                return Number(izq) !== der.charCodeAt(0);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                return parseFloat(izq) !== Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                return parseFloat(izq) !== parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                return parseFloat(izq) !== der.charCodeAt(0);
            } else if (this.opIzquierdo.tipo === Tipo.BOOL && this.opDerecho.tipo === Tipo.BOOL) {
                return izq !== der;
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                return izq.charCodeAt(0) !== Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                return izq.charCodeAt(0) !== parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                return izq.charCodeAt(0) !== der.charCodeAt(0);
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.STRING) {
                return izq !== der;
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para !=.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorRelacional.MENORQUE) {
            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                return Number(izq) < Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                return Number(izq) < parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                return parseFloat(izq) < Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                return parseFloat(izq) < parseFloat(der);
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para <.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorRelacional.MAYORQUE) {
            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                return Number(izq) > Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                return Number(izq) > parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                return parseFloat(izq) > Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                return parseFloat(izq) > parseFloat(der);
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para >.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorRelacional.MENORIGUAL) {
            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                return Number(izq) <= Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                return Number(izq) <= parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                return parseFloat(izq) <= Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                return parseFloat(izq) <= parseFloat(der);
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para <=.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorRelacional.MAYORIGUAL) {
            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                return Number(izq) >= Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                return Number(izq) >= parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                return parseFloat(izq) >= Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                return parseFloat(izq) >= parseFloat(der);
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para >=.", this.fila, this.columna);
            }
        } else {
            return new Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }

    getSigno(operador){
        if (operador===OperadorRelacional.DIFERENTE) {
            return "!="
        }else if(operador===OperadorRelacional.MENORQUE){
            return "<"
        }else if(operador===OperadorRelacional.MAYORQUE){
            return ">"
        }else if(operador===OperadorRelacional.MENORIGUAL){
            return "<="
        }else if(operador===OperadorRelacional.MAYORIGUAL){
            return ">="
        }else if(operador===OperadorRelacional.IGUALIGUAL){
            return "=="
        }
    }

}