"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimboloReporte = void 0;
class SimboloReporte {
    constructor(identificador, tipoSimbolo, tipo, entorno, valor, fila, columna) {
        this.identificador = identificador;
        this.tipoSimbolo = tipoSimbolo;
        this.tipo = tipo;
        this.entorno = entorno;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(identificador) {
        this.identificador = identificador;
    }
    getTipoSimbolo() {
        return this.tipoSimbolo;
    }
    setTipoSimbolo(tipoSimbolo) {
        this.tipoSimbolo = tipoSimbolo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getEntorno() {
        return this.entorno;
    }
    setEntorno(entorno) {
        this.entorno = entorno;
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
exports.SimboloReporte = SimboloReporte;
