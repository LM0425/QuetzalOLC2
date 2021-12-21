"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalAux = void 0;
class TemporalAux {
    constructor(identificador, tipo, fila, columna, valor) {
        this.indentificador = identificador;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    getId() {
        return this.indentificador;
    }
    setId(identificador) {
        this.indentificador = identificador;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
}
exports.TemporalAux = TemporalAux;
