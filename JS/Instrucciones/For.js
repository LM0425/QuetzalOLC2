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
    traducir(tree, table) {
        let variable = this.variable.traducir(tree, table);
        let condicion = this.condicion.traducir(tree, table);
        let lista = tree.getListaTemporalClase();
        let expre = this.expresion.traducir(tree, table);
        console.log("la variable es \n", variable);
        console.log("la lista es  \n", lista);
        console.log("la consicion es  \n", condicion);
        console.log("la expresion  es \n", expre);
        let instrucciones = "";
        this.instrucciones.forEach(element => {
            instrucciones += element.traducir(tree, table);
        });
        let temporalRetorno = tree.generarTemporal();
        let temporalEntrada = tree.generarTemporal();
        let temporalSalida = tree.generarTemporal();
        let texto3d = "\n//-------------------FOR\n";
        texto3d += variable;
        texto3d += temporalRetorno + ":\n";
        texto3d += lista;
        texto3d += tree.generarInstruccion("if(" + condicion + ") goto " + temporalEntrada);
        texto3d += tree.generarInstruccion("goto " + temporalSalida);
        texto3d += "\n" + temporalEntrada + ":\n";
        texto3d += instrucciones + "\n";
        texto3d += expre;
        texto3d += tree.generarInstruccion("goto " + temporalRetorno);
        texto3d += "\n" + temporalSalida + ":\n";
        console.log(texto3d);
        return texto3d;
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
