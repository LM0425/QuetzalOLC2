"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
class Pop {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
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
        if (!(val instanceof Array))
            return new Excepcion_1.Excepcion("Semantico", "Variable " + expresion + " no es un arreglo", this.fila, this.columna);
        this.tipo = simbolo.getTipoArreglo();
        return val.pop();
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("POP");
        let instrucciones = new NodoAST_1.NodoAST("ARREGLO");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Pop = Pop;
