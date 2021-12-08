"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Aritmetica {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opDerecho = opDerecho;
        this.opIzquierdo = opIzquierdo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = null;
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
        if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return Number(izq) + Number(der);
            }
        }
        if (this.operador === Tipo_1.OperadorAritmetico.MENOS) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq + der;
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion +", this.fila, this.columna);
        }
    }
}
exports.Aritmetica = Aritmetica;
