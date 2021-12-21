"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const Excepcion_1 = require("../AST/Excepcion");
class Pop {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        return expresion.pop();
    }
}
exports.Pop = Pop;
