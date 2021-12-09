import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export class Case implements Instruccion {

    expresion: any;
    instrucciones: any;
    fila: number;
    columna: number;

    constructor(expresion: any, instrucciones: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        return this
    }

}