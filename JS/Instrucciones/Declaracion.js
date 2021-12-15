"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Declaracion {
    constructor(tipo, identficador, fila, columna, expresion, decArreglo, porRefencia, copia) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.fila = fila;
        this.columna = columna;
        this.expresion = expresion;
        this.decArreglo = decArreglo;
        this.porReferencia = porRefencia;
        this.copia = copia;
    }
    interpretar(tree, table) {
        if (this.decArreglo === true) {
            if (this.porReferencia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null)
                    return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);
                if (this.tipo !== simbolo.getTipoArreglo())
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);
                simbolo.setId(this.identificador.pop());
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
            else if (this.copia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null)
                    return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);
                if (this.tipo !== simbolo.getTipoArreglo())
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);
                let nuevoSimbolo = new Simbolo_1.Simbolo(this.identificador.pop(), Tipo_1.Tipo.ARRAY, this.fila, this.columna, simbolo.getValor().slice());
                nuevoSimbolo.setTipoArreglo(this.tipo);
                let result = table.agregarSimbolo(nuevoSimbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
            else {
                let value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                if (this.tipo !== this.expresion.tipoArreglo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo del arreglo.", this.fila, this.columna);
                this.tipo = Tipo_1.Tipo.ARRAY;
                let simbolo = new Simbolo_1.Simbolo(this.identificador.pop(), this.tipo, this.fila, this.columna, value);
                simbolo.setTipoArreglo(this.expresion.tipoArreglo);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        else {
            let value = null;
            if (this.expresion !== null) {
                value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (this.tipo !== this.expresion.tipo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
            }
            for (let id of this.identificador) {
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                let simbolo = new Simbolo_1.Simbolo(id, this.tipo, this.fila, this.columna, value);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        return null;
    }
}
exports.Declaracion = Declaracion;
