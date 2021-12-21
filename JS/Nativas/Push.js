"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const Excepcion_1 = require("../AST/Excepcion");
class Push {
    constructor(expresion, valor, fila, columna) {
        this.expresion = expresion;
        this.valor = valor;
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
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return expresion.push(valor);
    }
}
exports.Push = Push;
