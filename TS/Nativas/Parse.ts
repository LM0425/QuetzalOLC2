import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Parse implements Instruccion {

    tipo: Tipo;
    expresion: any;
    fila: number;
    columna: number;

    constructor(tipo: Tipo, expresion: any, fila: number, columna: number) {
        this.tipo = tipo;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion) return expresion;

        if (this.tipo === Tipo.DOUBLE) {
            return parseFloat(expresion)
        } else if (this.tipo === Tipo.INT) {
            return Number(expresion)
        } else if (this.tipo === Tipo.BOOL) {
            return expresion === '1'
        } else {
            return new Excepcion("Semantico", "Tipo de dato en Parse no es int, double o boolean", this.fila, this.columna);
        }
    }

    getNodo() {
        let nodo = new NodoAST("PARSE");

        let instrucciones = new NodoAST("VALOR ")
        instrucciones.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }

}