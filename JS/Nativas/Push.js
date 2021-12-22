"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
class Push {
    constructor(expresion, valor, fila, columna) {
        this.expresion = expresion;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.identificador;
        let simbolo = table.getTabla(expresion);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + expresion + " no encontrada", this.fila, this.columna);
        let val = simbolo.getValor();
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        val.push(valor);
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("PUSH");
        let arreglo = new NodoAST_1.NodoAST("ARREGLO");
        arreglo.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(arreglo);
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Push = Push;
