import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export class Imprimir implements Instruccion {
    expresion: any;
    fila: number;
    columna: number;

    constructor(expresion: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let value = this.expresion.interpretar(tree, table);

        tree.updateConsola(String(value))
        return 0;
    }

}