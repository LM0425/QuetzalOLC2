import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Return } from "./Return";
import {  TemporalAux } from "../AST/temporalAux";
import { NodoAST } from "../Abstract/NodoAST";
import { SimboloReporte } from "../AST/SimboloReporte";


export class Funcion implements Instruccion {
    tipo: Tipo;
    nombre: string;
    parametros: any;
    instrucciones: any;
    fila: number;
    columna: number;

    constructor(tipo: Tipo, nombre: string, parametros: any, instrucciones: any, fila: number, columna: number) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        let texto3d="\n//-----------------Funcion "+this.nombre+"\n"
        let instrucciones="";
        let cantidadParametros=this.parametros.length;
        

        let id:any=this.nombre;

        

        let apuntador=tree.getApuntadorStack().toString();
        tree.addStack(0);
        
        let temporalAux = new TemporalAux(id,Tipo.VOID,this.fila,this.columna,apuntador);
        tree.addTabla(temporalAux);

        this.parametros.forEach(element => {
            if (element["arreglo"]===false) {
                //console.log("no es un array")
                //validacion de tipo
                let apuntador=tree.getApuntadorStack().toString();
                //texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+0);
                tree.addStack(0);
                let temporalAux = new TemporalAux(element["identificador"],this.tipo,this.fila,this.columna,apuntador);
                tree.addTabla(temporalAux);
            } else {
                //console.log("SI es un array")
            }
            
        });

        for (let instruccion of this.instrucciones) {
            let value = instruccion.traducir(tree, table);
            instrucciones+=value;
            //console.log("el valor es: ",instruccion)
        }

        texto3d+="\nvoid "+id+"(){\n"+instrucciones+"\n}\n"

        //console.log(texto3d);
        tree.addFuncion3D(texto3d);

    }

    interpretar(tree: AST, table: Entorno) {
        // console.log(this.nombre)
        let entornoAnterior = tree.entorno;
        tree.entorno = "F_" + this.nombre;
        tree.addSimbolo(this.nombre, new SimboloReporte(this.nombre, "Funcion", this.valorTipo(this.tipo), "Global", "---",this.fila, this.columna))
        // console.log(tree.getSimbolos())
        let entornoFuncion = new Entorno(table);

        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoFuncion);
            if(value instanceof Excepcion){
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
            if(value instanceof Return){
                tree.updateSimbolo(this.nombre, value.result)
                tree.entorno = entornoAnterior;
                return value.result;
            }
        }

        tree.entorno = entornoAnterior;
        return null;
    }

    getNodo() {
        let nodo = new NodoAST("FUNCION");
        nodo.agregarHijo(this.valorTipo(this.tipo));
        nodo.agregarHijo(this.nombre);
        let parametros = new NodoAST("PARAMETROS");
        for(let param of this.parametros){
            let parametro = new NodoAST("PARAMETRO");
            parametro.agregarHijo(this.valorTipo(param['tipo']));
            parametro.agregarHijo(param['identificador']);
            parametros.agregarHijoNodo(parametro);
        }
        nodo.agregarHijoNodo(parametros);

        let instrucciones = new NodoAST("INSTRUCCIONES");
        for(let instr of this.instrucciones){
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
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