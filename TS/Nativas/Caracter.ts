import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Caracter implements Instruccion {

    expresion: any;
    posicion: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(expresion: any, posicion: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.posicion = posicion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.CHAR;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion) return expresion;

        let posicion = this.posicion.interpretar(tree, table);
        if (posicion instanceof Excepcion) return posicion;

        return expresion[posicion];
    }

    getNodo() {
        let nodo = new NodoAST("CARACTER OF POSITION");

        let exp = new NodoAST("EXPRESION")
        exp.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijoNodo(exp);

        let pos = new NodoAST("POSICION")
        pos.agregarHijoNodo(this.posicion.getNodo());
        nodo.agregarHijo(pos);

        return nodo;
        
    }

}