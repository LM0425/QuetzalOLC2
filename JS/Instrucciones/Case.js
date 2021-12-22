"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Case3d_1 = require("../AST/Case3d");
const NodoAST_1 = require("../Abstract/NodoAST");
class Case {
    constructor(expresion, instrucciones, fila, columna) {
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let valor = this.expresion.traducir(tree, table);
        let ins = this.instrucciones; //.traducir(tree,table);
        let caso = new Case3d_1.Case3d(valor, ins);
        //console.log("el caso a ingresar es: ",caso);
        //tree.addCaso(caso);
        return caso;
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("CASE");
        let condicion = new NodoAST_1.NodoAST("CONDICION CASE");
        condicion.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(condicion);
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES CASE");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Case = Case;
