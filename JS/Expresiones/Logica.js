"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Logica {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opIzquierdo = opIzquierdo;
        this.opDerecho = opDerecho;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.BOOL;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion_1.Excepcion)
            return izq;
        if (this.opDerecho !== null) {
            var der = this.opDerecho.interpretar(tree, table);
            if (der instanceof Excepcion_1.Excepcion)
                return der;
        }
        if (this.operador === Tipo_1.OperadorLogico.AND) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                return izq && der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para &&.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorLogico.OR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                return izq || der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para ||.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorLogico.NOT) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL) {
                return !izq;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para !.", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }
}
exports.Logica = Logica;
