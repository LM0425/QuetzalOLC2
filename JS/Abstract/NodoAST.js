"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoAST = void 0;
class NodoAST {
    constructor(valor) {
        this.hijos = [];
        this.valor = valor;
    }
    setHijos(hijos) {
        this.hijos = hijos;
    }
    agregarHijo(valorHijo) {
        this.hijos.push(new NodoAST(valorHijo));
    }
    agregarHijos(hijos) {
        for (let hijo of hijos) {
            this.hijos.push(hijo);
        }
    }
    agregarHijoNodo(hijo) {
        this.hijos.push(hijo);
    }
    agregarPrimerHijo(valorHijo) {
        this.hijos.unshift(new NodoAST(valorHijo));
    }
    agregarPrimerHijoNodo(hijo) {
        this.hijos.unshift(hijo);
    }
    getValor() {
        return String(this.valor);
    }
    setValor(valor) {
        this.valor = valor;
    }
    getHijos() {
        return this.hijos;
    }
}
exports.NodoAST = NodoAST;
