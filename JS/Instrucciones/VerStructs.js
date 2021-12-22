"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerStruct = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
class VerStruct {
    constructor(identificador, atributo, fila, columna) {
        this.identificador = identificador;
        this.atributo = atributo;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let value = this.identificador.interpretar(tree, table);
        console.log('el valor en ver es ', value);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("VER STRUCT");
    }
}
exports.VerStruct = VerStruct;
