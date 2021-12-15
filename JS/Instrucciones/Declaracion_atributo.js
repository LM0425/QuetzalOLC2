"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion_atributo = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Declaracion_atributo {
    constructor(tipo, identficador, fila, columna, expresion) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let value = null;
        if (this.expresion !== null) {
            value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
            if (this.tipo !== this.expresion.tipo)
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
        }
        //for (let id of this.identificador) {
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = new Simbolo_1.Simbolo(this.identificador, this.tipo, this.fila, this.columna, value);
        //console.log('el simbolo a insertar es: ', simbolo);
        let result = table.agregarSimbolo(simbolo);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        //}
        return null;
    }
}
exports.Declaracion_atributo = Declaracion_atributo;
