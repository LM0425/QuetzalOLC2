"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerStruct = void 0;
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
}
exports.VerStruct = VerStruct;
