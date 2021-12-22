"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
class Main {
    constructor(instrucciones, fila, columna) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let entornoMain = new Entorno_1.Entorno(table);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoMain);
            if (value instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("MAIN");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES ");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Main = Main;
