"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        // this.structs = []
        this.funciones = [];
        this.excepciones = [];
        this.consola = "";
        this.TSGlobal = null;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    getExcepciones() {
        return this.excepciones;
    }
    setExcepciones(excepciones) {
        this.excepciones = excepciones;
    }
    getConsola() {
        return this.consola;
    }
    updateConsola(cadena) {
        this.consola += cadena;
    }
    getTSglobal() {
        return this.TSGlobal;
    }
    setTSglobal(TSglobal) {
        this.TSGlobal = TSglobal;
    }
    getFunciones() {
        return this.funciones;
    }
    getFuncion(nombre) {
        for (let funcion of this.funciones) {
            if (funcion.nombre === nombre) {
                return funcion;
            }
        }
        return null;
    }
    addFuncion(funcion) {
        this.funciones.push(funcion);
    }
}
exports.AST = AST;
