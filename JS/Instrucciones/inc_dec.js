"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inc_dec = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Simbolo_1 = require("../AST/Simbolo");
class inc_dec {
    constructor(operador, expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.operador = operador;
        this.tipo = null;
    }
    interpretar(tree, table) {
        let id = this.expresion.interpretar(tree, table);
        if (id instanceof Excepcion_1.Excepcion)
            return id;
        if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
            if (this.expresion.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = Number(id) + 1;
                let simbolo = new Simbolo_1.Simbolo(this.expresion.identificador, this.expresion.tipo, this.fila, this.columna, aux);
                let result = table.actualizarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                return aux;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no INT en Incremento.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.MENOS) {
            if (this.expresion.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = Number(id) - 1;
                let simbolo = new Simbolo_1.Simbolo(this.expresion.identificador, this.expresion.tipo, this.fila, this.columna, aux);
                let result = table.actualizarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                return aux;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no INT en Decremento.", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo erroneo de operador en Incremento/Decremento.", this.fila, this.columna);
        }
    }
}
exports.inc_dec = inc_dec;
