"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
class While {
    constructor(condicion, instruccionesIf, fila, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        //sconsole.log('el true es',this.instruccionesIf.traducir(tree,table));
        let nuevaTabla = new Entorno_1.Entorno(table);
        let texto3dVerdadero = "";
        let textoFalso = "";
        let instrucion = "";
        //console.log("la condicion es:",this.condicion);
        let cond = this.condicion.traducir(tree, nuevaTabla); //.split("$");
        //let condicion=cond[0];
        let lista = tree.getListaTemporalClase();
        tree.limpiartemporalClase();
        for (let instruccion of this.instruccionesIf) {
            let result = instruccion.traducir(tree, nuevaTabla);
            if (result instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(result);
                tree.updateConsola(result.toString());
            }
            //console.log('la instruccion es: ', result);
            texto3dVerdadero += result;
        }
        instrucion = tree.getWhile(cond, texto3dVerdadero);
        //console.log(lista+"\n" + instrucion);
        return lista + "\n" + instrucion;
    }
    interpretar(tree, table) {
        while (true) {
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
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("WHILE");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES ");
        for (let instr of this.instruccionesIf) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.While = While;
