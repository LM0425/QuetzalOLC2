"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpperCase = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToUpperCase {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        if (this.expresion.tipo !== Tipo_1.Tipo.STRING)
            return new Excepcion_1.Excepcion("Semantico", "El parametro de ToUpper no es cadena", this.fila, this.columna);
        return expresion.toUpperCase();
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TO UPPER CASE");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ToUpperCase = ToUpperCase;
