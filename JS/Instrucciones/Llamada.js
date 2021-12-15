"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Llamada {
    constructor(nombre, parametros, fila, columna) {
        this.tipo = Tipo_1.Tipo.NULL;
        this.nombre = nombre;
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let result = tree.getFuncion(this.nombre);
        if (result === null)
            return new Excepcion_1.Excepcion("Semantico", "No se encontro la funcion: " + this.nombre, this.fila, this.columna);
        let nuevaTabla = new Entorno_1.Entorno(tree.getTSglobal());
        if (result.parametros.length === this.parametros.length) {
            let contador = 0;
            for (let parametro of this.parametros) {
                let resultParametro = parametro.interpretar(tree, table);
                if (resultParametro instanceof Excepcion_1.Excepcion)
                    return resultParametro;
                if (result.parametros[contador]['tipo'] === parametro.tipo) {
                    let simbolo = new Simbolo_1.Simbolo(result.parametros[contador]['identificador'], result.parametros[contador]['tipo'], this.fila, this.columna, resultParametro);
                    let resultTabla = nuevaTabla.agregarSimbolo(simbolo);
                    if (resultTabla instanceof Excepcion_1.Excepcion)
                        return resultTabla;
                }
                else {
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato diferente en Parametros", this.fila, this.columna);
                }
                contador += 1;
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Cantidad de parametros incorrecta", this.fila, this.columna);
        }
        let value = result.interpretar(tree, nuevaTabla);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        this.tipo = result.tipo;
        return value;
    }
}
exports.Llamada = Llamada;
