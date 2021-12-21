"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToInt {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo !== Tipo_1.Tipo.DOUBLE)
            return new Excepcion_1.Excepcion("Semantico", "El parametro debe ser de tipo Double", this.fila, this.columna);
        return Math.trunc(valor);
    }
}
exports.ToInt = ToInt;
