"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const temporalAux_1 = require("../AST/temporalAux");
const Tipo_1 = require("../AST/Tipo");
class Main {
    constructor(instrucciones, fila, columna) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let texto3d = ""; //"\n//-----------------Funcion "+this.nombre+"\n"
        let instrucciones = "";
        //let cantidadParametros=this.parametros.length;
        //let id:any=this.nombre;
        let apuntador = tree.getApuntadorStack().toString();
        tree.addStack(0);
        let temporalAux = new temporalAux_1.TemporalAux("main", Tipo_1.Tipo.VOID, this.fila, this.columna, apuntador);
        tree.addTabla(temporalAux);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.traducir(tree, table);
            instrucciones += value;
        }
        texto3d += tree.setMain(instrucciones);
        //console.log(texto3d);
    }
    interpretar(tree, table) {
        let entornoMain = new Entorno_1.Entorno(table);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoMain);
            if (value instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("MAIN");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES ");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Main = Main;
