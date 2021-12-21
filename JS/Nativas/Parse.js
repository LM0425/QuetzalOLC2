"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Parse {
    constructor(tipo, expresion, fila, columna) {
        this.tipo = tipo;
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
        if (this.tipo === Tipo_1.Tipo.DOUBLE) {
            return parseFloat(expresion);
        }
        else if (this.tipo === Tipo_1.Tipo.INT) {
            return Number(expresion);
        }
        else if (this.tipo === Tipo_1.Tipo.BOOL) {
            return expresion === '1';
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de dato en Parse no es int, double o boolean", this.fila, this.columna);
        }
    }
}
exports.Parse = Parse;
