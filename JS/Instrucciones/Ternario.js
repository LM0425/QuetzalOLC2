"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
class Ternario {
    constructor(expresion, condicionV, condicionF, fila, columna) {
        this.expresion = expresion;
        this.condicionV = condicionV;
        this.condicionF = condicionF;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let entrada = this.expresion.interpretar(tree, table);
        if (entrada instanceof Excepcion_1.Excepcion)
            return entrada;
        let salidaV = this.condicionV.interpretar(tree, table);
        if (salidaV instanceof Excepcion_1.Excepcion)
            return salidaV;
        let salidaF = this.condicionF.interpretar(tree, table);
        if (salidaF instanceof Excepcion_1.Excepcion)
            return salidaF;
        console.log("Entrada -- " + this.expresion);
        console.log("Entrada -- " + entrada);
        console.log("Salidav -- " + salidaV);
        console.log("SalidaF -- " + salidaF);
        if (entrada) {
            this.tipo = this.condicionV.tipo;
            return salidaV;
        }
        else {
            this.tipo = this.condicionF.tipo;
            return salidaF;
        }
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("OPERADOR TERNARIO");
        let entrada = new NodoAST_1.NodoAST("Entrada");
        entrada.agregarHijoNodo(this.expresion.getNodo());
        let salidaV = new NodoAST_1.NodoAST("RESULTADO VERDADERO");
        salidaV.agregarHijoNodo(this.condicionV.getNodo());
        let salidaF = new NodoAST_1.NodoAST("RESULTADO FALSO");
        salidaF.agregarHijoNodo(this.condicionF.getNodo());
        nodo.agregarHijoNodo(entrada);
        nodo.agregarHijoNodo(salidaV);
        nodo.agregarHijoNodo(salidaF);
        return nodo;
    }
}
exports.Ternario = Ternario;
