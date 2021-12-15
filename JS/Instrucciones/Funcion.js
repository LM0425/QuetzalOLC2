"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Return_1 = require("./Return");
class Funcion {
    constructor(tipo, nombre, parametros, instrucciones, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let entornoFuncion = new Entorno_1.Entorno(table);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoFuncion);
            if (value instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
            if (value instanceof Return_1.Return) {
                return value.result;
            }
        }
        return null;
    }
}
exports.Funcion = Funcion;
