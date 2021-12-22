"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Llamada {
    constructor(nombre, parametros, fila, columna) {
        this.tipo = Tipo_1.Tipo.NULL;
        this.nombre = nombre;
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        /* console.log("la tabla es: ",tree.getTabla());
        console.log("el stak es ",tree.getStack()); */
        let posApuntador = tree.getValorTablaByIdentificador(this.nombre);
        //console.log("la pos es: ",posApuntador);
        let texto3d = "";
        texto3d += tree.generarInstruccion("P = 1 +" + posApuntador);
        this.parametros.forEach(element => {
            let variable = element.traducir(tree, table);
            //console.log("la variable es: ",variable);
            let posAux = tree.getValorTablaByIdentificador(variable);
            let valorStack = tree.getValorPosStack(posAux);
            let temporal = tree.generarTemporal();
            texto3d += tree.generarInstruccion(temporal + " = P");
            texto3d += tree.generarInstruccion("P = P + 1");
            if (valorStack) {
                texto3d += tree.generarInstruccion("stack[(int)" + temporal + "] = " + valorStack);
            }
            else {
                texto3d += tree.generarInstruccion("stack[(int)" + temporal + "] = " + variable);
            }
            //console.log("el valor del estak es: ",valorStack)
        });
        texto3d += tree.generarInstruccion(this.nombre + "()") + "\n";
        let lista = tree.getListaFunciones3D();
        //console.log(lista+"\n"+texto3d);
        return "\n//------------llamado de funion " + this.nombre + "\n" + texto3d;
    }
    interpretar(tree, table) {
        let result = tree.getFuncion(this.nombre);
        if (result === null)
            return new Excepcion_1.Excepcion("Semantico", "No se encontro la funcion: " + this.nombre, this.fila, this.columna);
        let nuevaTabla = new Entorno_1.Entorno(tree.getTSglobal());
        if (result.parametros.length === this.parametros.length) {
            let contador = 0;
            for (let parametro of this.parametros) {
                let resultParametro = parametro.interpretar(tree, table);
                if (resultParametro instanceof Excepcion_1.Excepcion)
                    return resultParametro;
                if (result.parametros[contador]['arreglo'] === true) {
                    let simbolo = new Simbolo_1.Simbolo(result.parametros[contador]['identificador'], Tipo_1.Tipo.ARRAY, this.fila, this.columna, resultParametro);
                    simbolo.setTipoArreglo(result.parametros[contador]['tipo']);
                    let resultTabla = nuevaTabla.agregarSimbolo(simbolo);
                    if (resultTabla instanceof Excepcion_1.Excepcion)
                        return resultTabla;
                }
                else if (result.parametros[contador]['tipo'] === parametro.tipo) {
                    let simbolo = new Simbolo_1.Simbolo(result.parametros[contador]['identificador'], result.parametros[contador]['tipo'], this.fila, this.columna, resultParametro);
                    let resultTabla = nuevaTabla.agregarSimbolo(simbolo);
                    if (resultTabla instanceof Excepcion_1.Excepcion)
                        return resultTabla;
                }
                else {
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato diferente en Parametros", this.fila, this.columna);
                }
                contador += 1;
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Cantidad de parametros incorrecta", this.fila, this.columna);
        }
        let value = result.interpretar(tree, nuevaTabla);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        this.tipo = result.tipo;
        return value;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("LLAMADA A FUNCION");
        nodo.agregarHijo(this.nombre);
        let instrucciones = new NodoAST_1.NodoAST("PARAMETROS");
        for (let param of this.parametros) {
            instrucciones.agregarHijoNodo(param.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Llamada = Llamada;
