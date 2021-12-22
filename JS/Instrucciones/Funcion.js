"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
const temporalAux_1 = require("../AST/temporalAux");
const NodoAST_1 = require("../Abstract/NodoAST");
class Funcion {
    constructor(tipo, nombre, parametros, instrucciones, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let texto3d = "\n//-----------------Funcion " + this.nombre + "\n";
        let instrucciones = "";
        let cantidadParametros = this.parametros.length;
        let id = this.nombre;
        let apuntador = tree.getApuntadorStack().toString();
        tree.addStack(0);
        let temporalAux = new temporalAux_1.TemporalAux(id, Tipo_1.Tipo.VOID, this.fila, this.columna, apuntador);
        tree.addTabla(temporalAux);
        this.parametros.forEach(element => {
            if (element["arreglo"] === false) {
                //console.log("no es un array")
                //validacion de tipo
                let apuntador = tree.getApuntadorStack().toString();
                //texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+0);
                tree.addStack(0);
                let temporalAux = new temporalAux_1.TemporalAux(element["identificador"], this.tipo, this.fila, this.columna, apuntador);
                tree.addTabla(temporalAux);
            }
            else {
                //console.log("SI es un array")
            }
        });
        for (let instruccion of this.instrucciones) {
            let value = instruccion.traducir(tree, table);
            instrucciones += value;
            //console.log("el valor es: ",instruccion)
        }
        texto3d += "\nvoid " + id + "(){\n" + instrucciones + "\n}\n";
        //console.log(texto3d);
        tree.addFuncion3D(texto3d);
    }
    interpretar(tree, table) {
        let entornoFuncion = new Entorno_1.Entorno(table);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoFuncion);
            if (value instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
            if (value instanceof Return_1.Return) {
                return value.result;
            }
        }
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("FUNCION");
        nodo.agregarHijo(this.valorTipo(this.tipo));
        nodo.agregarHijo(this.nombre);
        let parametros = new NodoAST_1.NodoAST("PARAMETROS");
        for (let param of this.parametros) {
            let parametro = new NodoAST_1.NodoAST("PARAMETRO");
            parametro.agregarHijo(this.valorTipo(param['tipo']));
            parametro.agregarHijo(param['identificador']);
            parametros.agregarHijoNodo(parametro);
        }
        nodo.agregarHijoNodo(parametros);
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
    valorTipo(valor) {
        if (valor === Tipo_1.Tipo.INT) {
            return "int";
        }
        else if (valor === Tipo_1.Tipo.DOUBLE) {
            return "double";
        }
        else if (valor === Tipo_1.Tipo.BOOL) {
            return "boolean";
        }
        else if (valor === Tipo_1.Tipo.CHAR) {
            return "char";
        }
        else if (valor === Tipo_1.Tipo.STRING) {
            return "String";
        }
        else if (valor === Tipo_1.Tipo.ARRAY) {
            return "array";
        }
        else if (valor === Tipo_1.Tipo.VOID) {
            return "void";
        }
    }
}
exports.Funcion = Funcion;
