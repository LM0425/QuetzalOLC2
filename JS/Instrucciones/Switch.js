"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Return_1 = require("./Return");
class Switch {
    constructor(expresion, cases, porDefecto, fila, columna) {
        this.expresion = expresion;
        this.cases = cases;
        this.porDefecto = porDefecto;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let variable = this.expresion.traducir(tree, table);
        console.log("la tabla tiene: ", tree.getTabla());
        let posStack = tree.getValorTablaByIdentificador(variable);
        let temporal = tree.generarTemporal();
        let etiquetaSalida = tree.generarEtiquetas();
        let texto3d = "\n//-----------------switch\n";
        texto3d += tree.generarInstruccion(temporal + " = stack[(int)" + posStack + "]");
        let etiquetaDefault;
        for (let k = 0; k < this.cases.length; k++) {
            const caso = this.cases[k];
            let expresionCaso = caso.traducir(tree, table);
            let etiquetainstruccion = tree.generarEtiquetas();
            let etiquetaSalidaAux = tree.generarEtiquetas();
            etiquetaDefault = etiquetaSalidaAux;
            //console.log("el caso es: ",expresionCaso)
            //console.log("el id es ",expresionCaso.identificador);            
            texto3d += tree.generarInstruccion("if(" + temporal + "==" + expresionCaso.identificador + ") goto " + etiquetainstruccion);
            texto3d += tree.generarInstruccion("goto " + etiquetaSalidaAux);
            texto3d += "\n" + etiquetainstruccion + ":\n";
            for (let i = 0; i < expresionCaso.instrucciones.length; i++) {
                const element = expresionCaso.instrucciones[i];
                //console.log('las intrucciones del caso son: ',element.traducir(tree,table));
                texto3d += element.traducir(tree, table);
            }
            texto3d += tree.generarInstruccion("goto " + etiquetaSalida);
            if (this.cases[k + 1]) {
                //let temporalSiguiente=tree.generarEtiquetas();
                texto3d += "\n" + etiquetaSalidaAux + ":";
            }
        }
        texto3d += "\n" + etiquetaDefault + ":\n";
        for (let i = 0; i < this.porDefecto.instrucciones.length; i++) {
            const element = this.porDefecto.instrucciones[i];
            texto3d += element.traducir(tree, table);
        }
        texto3d += "\n" + etiquetaSalida + ":\n";
        console.log(texto3d);
        return texto3d;
    }
    interpretar(tree, table) {
        let condicion = this.expresion.interpretar(tree, table);
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        let cumple = false;
        if (this.cases !== null) {
            for (let caso of this.cases) {
                let expresionCaso = caso.expresion.interpretar(tree, table);
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
                            cumple = true;
                            if (result instanceof Break_1.Break) {
                                return null;
                            }
                            if (result instanceof Return_1.Return) {
                                return result;
                            }
                        }
                    }
                    else if (cumple) {
                        let nuevaTabla = new Entorno_1.Entorno(table);
                        for (let instruccion of caso.instrucciones) {
                            let result = instruccion.interpretar(tree, nuevaTabla);
                            if (result instanceof Excepcion_1.Excepcion) {
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }
                            if (result instanceof Break_1.Break) {
                                return null;
                            }
                            if (result instanceof Return_1.Return) {
                                return result;
                            }
                        }
                    }
                }
            }
        }
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
                if (result instanceof Return_1.Return) {
                    return result;
                }
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("SWITCH");
        if (this.cases !== null) {
            for (let instr of this.cases) {
                nodo.agregarHijoNodo(instr.getNodo());
            }
        }
        if (this.porDefecto !== null) {
            nodo.agregarHijoNodo(this.porDefecto.getNodo());
        }
        return nodo;
    }
}
exports.Switch = Switch;
