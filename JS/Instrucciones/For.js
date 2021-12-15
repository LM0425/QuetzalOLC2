"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
class For {
    constructor(variable, condicion, expresion, instrucciones, fila, columna) {
        this.variable = variable;
        this.condicion = condicion;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let variable = this.variable.interpretar(tree, table);
        console.log('la variable es: ', variable);
        console.log('la global es:', this.variable);
    }
}
exports.For = For;
