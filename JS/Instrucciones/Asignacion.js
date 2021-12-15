"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Asignacion {
    constructor(identificador, expresion, fila, columna) {
        this.identificador = identificador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = new Simbolo_1.Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
        let result = table.actualizarTabla(simbolo);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
}
exports.Asignacion = Asignacion;
