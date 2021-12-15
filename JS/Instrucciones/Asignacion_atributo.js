"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion_atributo = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Asignacion_atributo {
    constructor(identificador, atributo, expresion, fila, columna) {
        this.identificador = identificador;
        this.atributo = atributo;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let entorno = this.identificador.interpretar(tree, table);
        /* console.log('el atributo es:',this.atributo)
        console.log('el dato es ',this.expresion) */
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        if (entorno instanceof Excepcion_1.Excepcion)
            return entorno;
        let simbolo = new Simbolo_1.Simbolo(this.atributo.identificador, this.expresion.tipo, this.fila, this.columna, value);
        let result = entorno.actualizarSimbolo(simbolo);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
}
exports.Asignacion_atributo = Asignacion_atributo;
