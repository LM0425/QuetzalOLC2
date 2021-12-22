"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caracter = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Caracter {
    constructor(expresion, posicion, fila, columna) {
        this.expresion = expresion;
        this.posicion = posicion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.CHAR;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let posicion = this.posicion.interpretar(tree, table);
        if (posicion instanceof Excepcion_1.Excepcion)
            return posicion;
        return expresion[posicion];
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("CARACTER OF POSITION");
        let exp = new NodoAST_1.NodoAST("EXPRESION");
        exp.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(exp);
        let pos = new NodoAST_1.NodoAST("POSICION");
        pos.agregarHijoNodo(this.posicion.getNodo());
        nodo.agregarHijo(pos);
        return nodo;
    }
}
exports.Caracter = Caracter;
