"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coseno = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Coseno {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return Math.cos(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("COSENO");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Coseno = Coseno;
