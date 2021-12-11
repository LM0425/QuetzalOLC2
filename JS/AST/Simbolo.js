"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(identificador, tipo, fila, columna, valor) {
        this.indentificador = identificador;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.tipoArreglo = null;
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
    getTipoArreglo() {
        return this.tipoArreglo;
    }
    setTipoArreglo(tipo) {
        this.tipoArreglo = tipo;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
}
exports.Simbolo = Simbolo;
