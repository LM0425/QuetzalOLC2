import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export class Continue implements Instruccion{
    
    fila: number;
    columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        return this;
    }
    
    getNodo() {
        let nodo = new NodoAST("CONTINUE");
        return nodo;
    }
}