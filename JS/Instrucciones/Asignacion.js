"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const NodoAST_1 = require("../Abstract/NodoAST");
class Asignacion {
    constructor(identificador, expresion, fila, columna) {
        this.identificador = identificador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let valor = this.expresion.traducir(tree, table);
        let texto3d = "";
        let lista = tree.getListaTemporalClase();
        let posStack = tree.getValorTablaByIdentificador(this.identificador);
        let value = tree.getValorPosStack(posStack).toString();
        if (this.expresion.valor) {
            texto3d = tree.generarInstruccion("stack[(int)" + posStack + "] = " + this.expresion.valor);
        }
        else {
            texto3d = tree.generarInstruccion("stack[(int)" + posStack + "] = " + valor);
        }
        tree.limpiartemporalClase();
        console.log(lista + texto3d);
        return "\n//-------------------Asignacion\n" + lista + texto3d;
    }
    interpretar(tree, table) {
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);
        var result;
        if ((simbolo.getTipo() === Tipo_1.Tipo.DOUBLE) && (this.expresion.tipo === Tipo_1.Tipo.INT)) {
            let simboloActualizado = new Simbolo_1.Simbolo(this.identificador, simbolo.getTipo(), this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        else {
            let simboloActualizado = new Simbolo_1.Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("ASIGNACION");
        nodo.agregarHijo(String(this.identificador));
        nodo.agregarHijoNodo(this.expresion.getNodo());
        return nodo;
    }
}
exports.Asignacion = Asignacion;
