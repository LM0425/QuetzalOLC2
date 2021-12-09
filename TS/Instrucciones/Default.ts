import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export class Default implements Instruccion {

    instrucciones: any;
    fila: number;
    columna: number;

    constructor(instrucciones: any, fila: number, columna: number) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        return this
    }

}