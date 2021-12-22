"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
class ToInt {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    traducir(tree, table) {
        console.log("la tabla: ", tree.getTabla());
        console.log("el stack es ", tree.getStack());
        var izq = this.valor.traducir(tree, table);
        if (izq instanceof Excepcion_1.Excepcion)
            return izq;
        let posStack = tree.getValorTablaByIdentificador(izq);
        let temporal = tree.generarTemporal();
        let value = tree.getValorPosStack(posStack).toString();
        console.log("el valor es ", value);
        let nuevoValor = ""; //Math.trunc(Number(value));
        if (Math.trunc(Number(value))) {
            nuevoValor = Math.trunc(Number(value)).toString();
        }
        else {
            nuevoValor = value;
        }
        console.log("el nuevo valor es ", nuevoValor);
        let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, nuevoValor);
        tree.addTemporalClase(temporalAux);
        return temporal;
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo !== Tipo_1.Tipo.DOUBLE)
            return new Excepcion_1.Excepcion("Semantico", "El parametro debe ser de tipo Double", this.fila, this.columna);
        return Math.trunc(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TO INT");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ToInt = ToInt;
