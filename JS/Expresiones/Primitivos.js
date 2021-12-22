"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivos = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Primitivos {
    constructor(tipo, valor, fila, columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipoArreglo = null;
    }
    traducir(tree, table) {
        if (this.tipo === Tipo_1.Tipo.ARRAY) {
        }
        else {
            return this.valor;
        }
    }
    interpretar(tree, table) {
        if (this.tipo === Tipo_1.Tipo.ARRAY) {
            let valTipo = this.defTipo(this.valor);
            if (valTipo instanceof Excepcion_1.Excepcion)
                return valTipo;
            let val = this.definirArreglo(this.valor, tree, table);
            if (val instanceof Excepcion_1.Excepcion) {
                return val;
            }
            else {
                this.valor = val;
            }
        }
        return this.valor;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("PRIMITIVO");
        nodo.agregarHijo(String(this.valor));
        return nodo;
    }
    defTipo(arreglo) {
        for (let valor of arreglo) {
            if (valor instanceof Array) {
                let result = this.defTipo(valor);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                continue;
            }
            if (this.tipoArreglo === null) {
                this.tipoArreglo = valor.tipo;
            }
            else if (this.tipoArreglo !== valor.tipo) {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato diferentes en arreglo", this.fila, this.columna);
            }
        }
        return null;
    }
    definirArreglo(arreglo, tree, table) {
        let retorno = [];
        for (let valor of arreglo) {
            if (valor instanceof Array) {
                retorno.push(this.definirArreglo(valor, tree, table));
                continue;
            }
            let val = valor.interpretar(tree, table);
            if (val instanceof Excepcion_1.Excepcion)
                return val;
            retorno.push(val);
        }
        return retorno;
    }
}
exports.Primitivos = Primitivos;
