"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Length {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        return expresion.length;
    }
}
exports.Length = Length;
