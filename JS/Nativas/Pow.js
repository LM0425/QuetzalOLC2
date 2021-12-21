"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pow = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Pow {
    constructor(base, exponente, fila, columna) {
        this.base = base;
        this.exponente = exponente;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let base = this.base.interpretar(tree, table);
        if (base instanceof Excepcion_1.Excepcion)
            return base;
        let exponente = this.exponente.interpretar(tree, table);
        if (exponente instanceof Excepcion_1.Excepcion)
            return exponente;
        if (this.base.tipo !== Tipo_1.Tipo.INT)
            return new Excepcion_1.Excepcion("Semantico", "La base de la potencia debe ser entero o decimal.", this.fila, this.columna);
        if (this.exponente.tipo !== Tipo_1.Tipo.INT)
            return new Excepcion_1.Excepcion("Semantico", "El exponente debe ser entero.", this.fila, this.columna);
        return Math.pow(base, exponente);
    }
}
exports.Pow = Pow;
