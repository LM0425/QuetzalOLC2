"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDouble = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToDouble {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo !== Tipo_1.Tipo.INT)
            return new Excepcion_1.Excepcion("Semantico", "El parametro debe ser de tipo Int", this.fila, this.columna);
        return parseFloat(valor);
    }
}
exports.ToDouble = ToDouble;
