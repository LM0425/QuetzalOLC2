"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoW = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
class DoW {
    constructor(condicion, instruccionesIf, fila, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        do {
            let condicion = this.condicion.interpretar(tree, table);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (this.condicion.tipo === Tipo_1.Tipo.BOOL) {
                if (condicion === true) {
                    let nuevaTabla = new Entorno_1.Entorno(table);
                    for (let instruccion of this.instruccionesIf) {
                        let result = instruccion.interpretar(tree, nuevaTabla);
                        if (result instanceof Break_1.Break) {
                            break;
                        }
                        if (result instanceof Excepcion_1.Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no booleano en condicion While.", this.fila, this.columna);
            }
        } while (true);
    }
}
exports.DoW = DoW;
