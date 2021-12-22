"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Return {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        if (this.expresion !== null) {
            let result = this.expresion.interpretar(tree, table);
            if (result instanceof Excepcion_1.Excepcion)
                return result;
            this.tipo = this.expresion.tipo;
            this.result = result;
            return this;
        }
        else {
            this.tipo = Tipo_1.Tipo.VOID;
            this.result = null;
            return this;
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("RETURN");
        if (this.expresion !== null) {
            nodo.agregarHijoNodo(this.expresion.getNodo());
        }
        return nodo;
    }
}
exports.Return = Return;
