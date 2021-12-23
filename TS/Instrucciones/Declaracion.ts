import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import {  TemporalAux } from "../AST/temporalAux";
import { NodoAST } from "../Abstract/NodoAST";
import { SimboloReporte } from "../AST/SimboloReporte";

export class Declaracion implements Instruccion {
    tipo: Tipo;
    identificador: string[];
    expresion: any;
    fila: number;
    columna: number;
    decArreglo: boolean;
    porReferencia: any;
    copia: any;

    constructor(tipo: Tipo, identficador: string[], fila: number, columna: number, expresion: any, decArreglo: boolean, porRefencia: any, copia: any) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.fila = fila;
        this.columna = columna;
        this.expresion = expresion;
        this.decArreglo = decArreglo;
        this.porReferencia = porRefencia;
        this.copia = copia;
    }
    traducir(tree: AST, table: Entorno) {
        //console.log('la expresion es: ',this.expresion);
        /* console.log('la el tipo: ',this.tipo); */
        if (this.decArreglo===true) {
            if (this.porReferencia) {
                

            } else if (this.copia) {
               

            } else {
                let tamanio=this.expresion.valor.length;
                //console.log("el tamaño es: ",tamanio);
                let posHeap=tree.getApuntadorHeap();
                let temporal0=tree.generarTemporal();
                let texto3d="\n//-----------Array\n";
                let posStack=tree.getApuntadorStack();
                texto3d+=tree.generarInstruccion("P = "+posStack);//0
                texto3d+=tree.generarInstruccion("H = "+posHeap);//0
                texto3d+=tree.generarInstruccion(temporal0+" = H")//t0=0
                let temporal1=tree.generarTemporal();
                
                //texto3d+=tree.generarInstruccion("H = H + "+tamanio);//H=2
                texto3d+=tree.generarInstruccion("stack[(int)"+posStack+"] = "+temporal0);//stak(0)=0
                tree.addStack(posHeap);
                let temporalAux = new TemporalAux(this.identificador[0],Tipo.ARRAY,this.fila,this.columna,posHeap.toString());
                tree.addTabla(temporalAux);
                
                texto3d+=tree.generarInstruccion(temporal1+" = "+temporal0);//t1=0
                
                let aux=tamanio
                if (this.tipo===Tipo.INT) {
                    for (let i = 0; i < tamanio; i++) {
                        tree.addHeap(aux);
                        texto3d+=tree.generarInstruccion("heap[(int)"+temporal1+"] = "+aux) //heap(0)=2----heap(1)=3
                        texto3d+=tree.generarInstruccion("H = H + 1");//H=3----H=4
                        texto3d+=tree.generarInstruccion(temporal1+" = "+temporal1+" + 1");//t1=1---T1=2  
                        aux++;         
                    }

                    this.expresion.valor.forEach(element => {
                        let valor=element.traducir(tree,table);
                        //console.log("el valor es: ", valor)
                        tree.addHeap(valor);
                        //texto3d+=tree.generarInstruccion(temporal1+" = "+temporal0);//t1=2
                        texto3d+=tree.generarInstruccion("heap[(int)"+temporal1+"] = "+valor) //heap(0)=2----heap(1)=3
                        texto3d+=tree.generarInstruccion("H = H + 1");//H=3----H=4
                        texto3d+=tree.generarInstruccion(temporal1+" = "+temporal1+" + 1");//t1=1---T1=2  
                       
                    });

                    //console.log(texto3d)
                    /* console.log("la tabla es: ",tree.getTabla());
                    console.log("stack: ",tree.getStack());
                    console.log("heap :", tree.getHeap()); */
                    return(texto3d);
                }
            }
        } else {
            if (this.expresion!=null) {

                if (this.tipo===Tipo.INT || this.tipo===Tipo.DOUBLE) {
                    if (this.expresion.valor || this.expresion.valor===0 && this.expresion.valor!=Object) {
                        
                        let value = this.expresion.traducir(tree, table);
                        if (value instanceof Excepcion) return value;
                        //console.log("se fue para int con valor",value)
                        //let temporal=tree.getUltimoTemporal();
                        let apuntador=tree.getApuntadorStack().toString();
                        let texto3d="";
                        //console.log("se fue la object",this.expresion.valor.identificador,value);
                        if(this.expresion.valor.identificador){
                            console.log("se fue al if del valor",this.expresion.valor)
                            texto3d=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+value);
                            tree.addStack(this.expresion.valor);
                        }else{
                            console.log("se fue al else del valor")
                            texto3d=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+this.expresion.valor);
                            tree.addStack(this.expresion.valor);
                        }
                        
                        //tree.addStack(this.expresion.valor);
                        let temporalAux = new TemporalAux(this.identificador[0],this.tipo,this.fila,this.columna,apuntador);
                        tree.addTabla(temporalAux);
                        let lista=tree.getListaTemporalClase();
                        console.log(texto3d+"\n")
                        tree.limpiartemporalClase();
                        return "\n//-------------------------Declaracion\n"+lista+texto3d+"\n";
                    } else {
                        //console.log("se fue para int sen valor")
                        //console.log(tree.getTemporalClase());
                        let ultimoTemporal = this.expresion.traducir(tree, table);
                        if (ultimoTemporal instanceof Excepcion) return ultimoTemporal;
                        let temporal=tree.getUltimoTemporal();
                        let apuntador=tree.getApuntadorStack().toString();
                        let texto3d="";
                        texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+temporal);
                        /* tree.updateConsola(texto3d);
                        tree.updateConsola("\n"); */

                        //let valorTemporal=tree.getValueByTemporal(temporal);
                        tree.addStack(temporal);
                        let temporalAux = new TemporalAux(this.identificador[0],this.tipo,this.fila,this.columna,apuntador);
                        tree.addTabla(temporalAux); 
                        //console.log(tree.getListaTemporalClase()+ texto3d);
                        texto3d="\n//-------------------------Declaracion\n"+tree.getListaTemporalClase()+texto3d;
                       /*  console.log(tree.getTemporalClase());
                        console.log(tree.getStack()); */
                        tree.limpiartemporalClase();
                        console.log(texto3d+"\n")
                        return texto3d+"\n";
                    }
                    
                } else if(this.tipo===Tipo.STRING){
                    let exp = this.expresion.traducir(tree, table);
                    let temporal=tree.generarTemporal();
                    let texto3d="\n//-------------------------Declaracion\n"+tree.generarInstruccion(temporal+" = H");
                    let apuntadorHeap=tree.getApuntadorHeap();
                    for (let i = 0; i < exp.length; i++) {
                        const element = exp[i];
                        let value = element.charCodeAt(0);
                        tree.addHeap(value);
                        texto3d+=tree.generarInstruccion("heap[(int)H] = "+value);
                        texto3d+=tree.generarInstruccion('H = H + 1');                       
                    }
                    tree.addHeap(-1);
                    texto3d+=tree.generarInstruccion("heap[(int)H] = -1");
                    texto3d+=tree.generarInstruccion('H = H + 1');
                    let apuntador=tree.getApuntadorStack().toString();
                    texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+temporal);
                    /* tree.updateConsola(texto3d);
                    tree.updateConsola("\n");
 */
                    tree.addStack(apuntadorHeap);
                    let temporalAux = new TemporalAux(this.identificador[0],this.tipo,this.fila,this.columna,apuntadorHeap.toString());
                    tree.addTabla(temporalAux);
                    console.log(texto3d);

                    return texto3d;

                }       
            }else{
                
                if (this.tipo===Tipo.INT || this.tipo===Tipo.DOUBLE) {
                    let texto3d="";
                    for (let id of this.identificador) {
                        let apuntador=tree.getApuntadorStack().toString();
                        texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+0);
                        tree.addStack(0);
                        let temporalAux = new TemporalAux(id,this.tipo,this.fila,this.columna,apuntador);
                        tree.addTabla(temporalAux);
    
                    }
                    
                    console.log(texto3d+"\n")
                    return "\n//-------------------------Declaracion\n"+texto3d+"\n";
                    
                }
            }
        }
        
    }

    interpretar(tree: AST, table: Entorno) {
        if (this.decArreglo === true) {
            if (this.porReferencia) {
                let simbolo = table.getTabla(this.identificador[0]);
                if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador[0] + "no encontrada", this.fila, this.columna);

                if(this.tipo !== simbolo.getTipoArreglo()) return new Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);

                simbolo.setId(this.identificador[0]);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion) return result;

                tree.addSimbolo(this.identificador[0]+tree.entorno, new SimboloReporte(this.identificador[0], "Variable", this.valorTipo(this.tipo),tree.entorno,simbolo.getValor().slice(), this.fila, this.columna))

            } else if (this.copia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);

                if(this.tipo !== simbolo.getTipoArreglo()) return new Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);

                let nuevoSimbolo = new Simbolo(this.identificador[0], Tipo.ARRAY, this.fila, this.columna, simbolo.getValor().slice());
                nuevoSimbolo.setTipoArreglo(this.tipo)
                
                let result = table.agregarSimbolo(nuevoSimbolo);
                if (result instanceof Excepcion) return result

                tree.addSimbolo(this.identificador[0]+tree.entorno, new SimboloReporte(this.identificador[0], "Variable", this.valorTipo(this.tipo),tree.entorno,simbolo.getValor().slice(), this.fila, this.columna))

            } else {
                let value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (value instanceof Excepcion) return value;

                if (this.tipo !== this.expresion.tipoArreglo) return new Excepcion("Semantico", "Tipo de dato difente al tipo del arreglo.", this.fila, this.columna);
                this.tipo = Tipo.ARRAY;

                let simbolo = new Simbolo(this.identificador[0], this.tipo, this.fila, this.columna, value);
                simbolo.setTipoArreglo(this.expresion.tipoArreglo)
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion) return result;

                tree.addSimbolo(this.identificador[0]+tree.entorno, new SimboloReporte(this.identificador[0], "Variable", this.valorTipo(this.tipo),tree.entorno,value, this.fila, this.columna))
            }
        } else {
            let value = null;
            if (this.expresion !== null) {
                value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if(this.tipo === Tipo.DOUBLE && this.expresion.tipo === Tipo.INT){

                }else if (this.tipo !== this.expresion.tipo) return new Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
            }else{
                if((this.tipo === Tipo.INT) || (this.tipo === Tipo.DOUBLE) || (this.tipo === Tipo.CHAR)) value = 0;
                if(this.tipo === Tipo.BOOL) value = false;
            }

            for (let id of this.identificador) {
                if (value instanceof Excepcion) return value;

                let simbolo = new Simbolo(id, this.tipo, this.fila, this.columna, value);

                let result = table.agregarSimbolo(simbolo);

                if (result instanceof Excepcion) return result;

                tree.addSimbolo(id+tree.entorno, new SimboloReporte(id, "Variable", this.valorTipo(this.tipo),tree.entorno,value, this.fila, this.columna))
            }
        }

        return null;
    }

    getNodo() {
        let nodo = new NodoAST("DECLARACION");
        for(let id of this.identificador){
            nodo.agregarHijo(String(id));
        }
        return nodo;
    }

    valorTipo(valor:Tipo){
        if(valor === Tipo.INT){
            return "int";
        } else if(valor === Tipo.DOUBLE){
            return "double";
        } else if(valor === Tipo.BOOL){
            return "boolean";
        } else if(valor === Tipo.CHAR){
            return "char";
        } else if(valor === Tipo.STRING){
            return "String";
        } else if(valor === Tipo.ARRAY){
            return "array";
        } else if(valor === Tipo.VOID){
            return "void";
        }
    }
}