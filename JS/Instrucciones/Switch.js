"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
class Switch {
    constructor(expresion, cases, porDefecto, fila, columna) {
        this.expresion = expresion;
        this.cases = cases;
        this.porDefecto = porDefecto;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let condicion = this.expresion.interpretar(tree, table);
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        let cumple = false;
        if (this.cases !== null) {
            for (let caso of this.cases) {
                let expresionCaso = caso.interpretar(tree, table);
                if (expresionCaso instanceof Excepcion_1.Excepcion) {
                    tree.getExcepciones().push(expresionCaso);
                    tree.updateConsola(expresionCaso.toString());
                    continue;
                }
                if (this.expresion.tipo === caso.expresion.tipo) {
                    if (condicion === expresionCaso) {
                        let nuevaTabla = new Entorno_1.Entorno(table);
                        for (let instruccion of caso.instrucciones) {
                            let result = instruccion.interpretar(tree, nuevaTabla);
                            if (result instanceof Excepcion_1.Excepcion) {
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }
                            if (result instanceof Break_1.Break) {
                                cumple = true;
                                return null;
                            }
                        }
                    }
                }
            }
        }
        if (!cumple) {
            if (this.porDefecto !== null) {
                let nuevaTabla = new Entorno_1.Entorno(table);
                for (let instruccion of this.porDefecto.instrucciones) {
                    let result = instruccion.interpretar(tree, nuevaTabla);
                    if (result instanceof Excepcion_1.Excepcion) {
                        tree.getExcepciones().push(result);
                        tree.updateConsola(result.toString());
                    }
                    if (result instanceof Break_1.Break)
                        return null;
                }
            }
        }
    }
}
exports.Switch = Switch;
