"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
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
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);
        var result;
        if ((simbolo.getTipo() === Tipo_1.Tipo.DOUBLE) && (this.expresion.tipo === Tipo_1.Tipo.INT)) {
            let simboloActualizado = new Simbolo_1.Simbolo(this.identificador, simbolo.getTipo(), this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        else {
            let simboloActualizado = new Simbolo_1.Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
}
exports.Asignacion = Asignacion;
