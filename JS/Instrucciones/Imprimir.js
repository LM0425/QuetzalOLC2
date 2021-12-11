"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imprimir = void 0;
const Tipo_1 = require("../AST/Tipo");
class Imprimir {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let value = this.expresion.interpretar(tree, table);
        if (this.expresion.tipo === Tipo_1.Tipo.ARRAY) {
            value = "[" + value + "]";
        }
        tree.updateConsola(value);
        return 0;
    }
}
exports.Imprimir = Imprimir;
