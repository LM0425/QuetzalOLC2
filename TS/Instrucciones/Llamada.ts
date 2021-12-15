import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";

export class Llamada implements Instruccion {

    nombre: string;
    parametros: any;
    fila: number;
    columna: number;
    tipo = Tipo.NULL;

    constructor(nombre: string, parametros: any, fila: number, columna: number) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let result = tree.getFuncion(this.nombre)

        if (result === null) return new Excepcion("Semantico", "No se encontro la funcion: " + this.nombre, this.fila, this.columna);

        let nuevaTabla = new Entorno(tree.getTSglobal());

        if (result.parametros.length === this.parametros.length) {
            let contador = 0;

            for (let parametro of this.parametros) {
                let resultParametro = parametro.interpretar(tree, table);

                if (resultParametro instanceof Excepcion) return resultParametro;

                if (result.parametros[contador]['tipo'] === parametro.tipo) {
                    let simbolo = new Simbolo(result.parametros[contador]['identificador'], result.parametros[contador]['tipo'], this.fila, this.columna, resultParametro);
                    let resultTabla = nuevaTabla.agregarSimbolo(simbolo);
                    if (resultTabla instanceof Excepcion) return resultTabla;
                } else {
                    return new Excepcion("Semantico", "Tipo de dato diferente en Parametros", this.fila, this.columna);
                }

                contador += 1;
            }

        } else {
            return new Excepcion("Semantico", "Cantidad de parametros incorrecta", this.fila, this.columna);
        }

        let value = result.interpretar(tree, nuevaTabla);
        if(value instanceof Excepcion) return value;
        this.tipo = result.tipo;
        
        return value;
    }

}