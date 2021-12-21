"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Log {
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
        return Math.log10(valor);
    }
}
exports.Log = Log;
