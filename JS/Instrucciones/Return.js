"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Excepcion_1 = require("../AST/Excepcion");
class Return {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let result = this.expresion.interpretar(tree, table);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        this.tipo = this.expresion.tipo;
        this.result = result;
        return this;
    }
}
exports.Return = Return;
