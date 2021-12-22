"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubString = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class SubString {
    constructor(expresion, posInicial, posFinal, fila, columna) {
        this.expresion = expresion;
        this.posInicial = posInicial;
        this.posFinal = posFinal;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let posInicial = this.posInicial.interpretar(tree, table);
        if (posInicial instanceof Excepcion_1.Excepcion)
            return posInicial;
        let posFinal = this.posFinal.interpretar(tree, table);
        if (posFinal instanceof Excepcion_1.Excepcion)
            return posFinal;
        return expresion.slice(posInicial, posFinal);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("SUBSTRING");
        let instrucciones = new NodoAST_1.NodoAST("EXPRESION");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        let posi = new NodoAST_1.NodoAST("POSICION INICIAL");
        posi.agregarHijoNodo(this.posInicial.getNodo());
        nodo.agregarHijoNodo(posi);
        let posf = new NodoAST_1.NodoAST("POSICION FINAL");
        posf.agregarHijoNodo(this.posFinal.getNodo());
        nodo.agregarHijoNodo(posf);
        return nodo;
    }
}
exports.SubString = SubString;
