import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";

export class Declaracion implements Instruccion {
    tipo: Tipo;
    identificador: string[];
    expresion: any;
    fila: number;
    columna: number;

    constructor(tipo: Tipo, identficador: string[], fila: number, columna: number, expresion: any) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let value = null;
        if (this.expresion !== null) {
            value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
            if (this.tipo !== this.expresion.tipo) return new Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
        }

        for (let id of this.identificador) {
            if (value instanceof Excepcion) return value;

            let simbolo = new Simbolo(id, this.tipo, this.fila, this.columna, value);

            let result = table.agregarSimbolo(simbolo);

            if (result instanceof Excepcion) return result;
        }

        return null;
    }

}