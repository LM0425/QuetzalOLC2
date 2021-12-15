"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imprimir = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Imprimir {
    constructor(salto, expresion, fila, columna) {
        this.salto = salto;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let cadena = "";
        for (let imprimir of this.expresion) {
            let value = imprimir.interpretar(tree, table);
            if (value instanceof Excepcion_1.Excepcion)
                return value;
            // Agregar ciclo interpretar
            if (imprimir.tipo === Tipo_1.Tipo.ARRAY) {
                cadena += "[" + value + "]";
            }
            else {
                cadena += value;
            }
        }
        tree.updateConsola(cadena);
        if (this.salto === true)
            tree.updateConsola('\n');
        return this;
    }
}
exports.Imprimir = Imprimir;
