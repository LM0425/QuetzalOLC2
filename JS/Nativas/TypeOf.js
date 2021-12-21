"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class TypeOf {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo === Tipo_1.Tipo.INT) {
            return "int";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.DOUBLE) {
            return "double";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.STRING) {
            return "string";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.CHAR) {
            return "char";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.ARRAY) {
            return "array";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.STRUCT) {
            return "struct";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.BOOL) {
            return "boolean";
        }
    }
}
exports.TypeOf = TypeOf;
