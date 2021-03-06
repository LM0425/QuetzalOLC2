"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SString = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class SString {
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
        if (this.valor.tipo === Tipo_1.Tipo.NULL)
            return new Excepcion_1.Excepcion("Semantico", "El parametro no puede ser NULL", this.fila, this.columna);
        return String(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("STRING");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.SString = SString;
