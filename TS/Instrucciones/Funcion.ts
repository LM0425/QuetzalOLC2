import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Return } from "./Return";

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