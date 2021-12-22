"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
class Break {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("BREAK");
        return nodo;
    }
}
exports.Break = Break;
