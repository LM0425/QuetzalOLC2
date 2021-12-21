"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubString = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class SubString {
    constructor(expresion, posInicial, posFinal, fila, columna) {
        this.expresion = expresion;
        this.posInicial = posInicial;
        this.posFinal = posFinal;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let posInicial = this.posInicial.interpretar(tree, table);
        if (posInicial instanceof Excepcion_1.Excepcion)
            return posInicial;
        let posFinal = this.posFinal.interpretar(tree, table);
        if (posFinal instanceof Excepcion_1.Excepcion)
            return posFinal;
        return expresion.slice(posInicial, posFinal);
    }
}
exports.SubString = SubString;
