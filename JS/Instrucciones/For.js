"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class For {
    constructor(decAsig, condicion, actualizacion, instrucciones, fila, columna) {
        this.decAsig = decAsig;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let entornoFor = new Entorno_1.Entorno(table);
        let decAsig = this.decAsig.interpretar(tree, entornoFor);
        if (decAsig instanceof Excepcion_1.Excepcion)
            return decAsig;
        while (true) {
            let condicion = this.condicion.interpretar(tree, entornoFor);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (this.condicion.tipo === Tipo_1.Tipo.BOOL) {
                if (condicion === true) {
                    let entornoPasadaFor = new Entorno_1.Entorno(entornoFor);
                    for (let instruccion of this.instrucciones) {
                        let result = instruccion.interpretar(tree, entornoPasadaFor);
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
                    let actualizacion = this.actualizacion.interpretar(tree, entornoFor);
                    if (actualizacion instanceof Excepcion_1.Excepcion)
                        return actualizacion;
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no booleano en condicion de For", this.fila, this.columna);
            }
        }
    }
}
exports.For = For;
