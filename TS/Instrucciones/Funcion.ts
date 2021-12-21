import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Return } from "./Return";
import {  TemporalAux } from "../AST/temporalAux";


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
                console.log("no es un array")
                //validacion de tipo
                let apuntador=tree.getApuntadorStack().toString();
                //texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+0);
                tree.addStack(0);
                let temporalAux = new TemporalAux(element["identificador"],this.tipo,this.fila,this.columna,apuntador);
                tree.addTabla(temporalAux);
            } else {
                console.log("SI es un array")
            }
            
        });

        for (let instruccion of this.instrucciones) {
            let value = instruccion.traducir(tree, table);
            instrucciones+=value;
        }

        texto3d+="\nvoid "+id+"(){\n"+instrucciones+"\n}\n"

        console.log(texto3d);
        tree.addFuncion3D(texto3d);

    }

    interpretar(tree: AST, table: Entorno) {
        let entornoFuncion = new Entorno(table);

        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoFuncion);
            if(value instanceof Excepcion){
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
            if(value instanceof Return){
                return value.result;
            }
        }

        return null;
    }

}