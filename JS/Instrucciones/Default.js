"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Case3d_1 = require("../AST/Case3d");
const NodoAST_1 = require("../Abstract/NodoAST");
class Default {
    constructor(instrucciones, fila, columna) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        //let valor=this.expresion.traducir(tree,table);
        let ins = this.instrucciones; //.traducir(tree,table);
        let caso = new Case3d_1.Case3d('default', ins);
        //console.log("el caso a ingresar es: ",caso);
        //tree.addCaso(caso);
        return caso;
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("DEFAULT");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES DEFAULT");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Default = Default;
