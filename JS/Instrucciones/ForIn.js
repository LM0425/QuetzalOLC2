"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class ForIn {
    constructor(variable, expresion, instrucciones, fila, columna) {
        this.variable = variable;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let entornoFor = new Entorno_1.Entorno(table);
        let expresion = this.expresion.interpretar(tree, entornoFor);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let tipo;
        if (this.expresion.tipo === Tipo_1.Tipo.ARRAY) {
            tipo = this.expresion.tipoArreglo;
        }
        else {
            tipo = this.expresion.tipo;
        }
        for (let caracter of expresion) {
            let entornoPasadFor = new Entorno_1.Entorno(entornoFor);
            let simbolo = new Simbolo_1.Simbolo(this.variable, tipo, this.fila, this.columna, caracter);
            let result = entornoPasadFor.agregarSimbolo(simbolo);
            if (result instanceof Excepcion_1.Excepcion)
                return result;
            for (let instruccion of this.instrucciones) {
                let result = instruccion.interpretar(tree, entornoPasadFor);
                if (result instanceof Excepcion_1.Excepcion) {
                    tree.getExcepciones().push(result);
                    tree.updateConsola(result.toString());
                }
                if (result instanceof Break_1.Break)
                    return null;
                if (result instanceof Continue_1.Continue)
                    break;
                if (result instanceof Return_1.Return)
                    return result;
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("FOR IN");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES FOR");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ForIn = ForIn;
