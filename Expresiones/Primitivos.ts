import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";


export class Primitivos implements Instruccion {

    tipo: Tipo;
    valor: any;
    fila: number;
    columna: number;

    constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        return this.valor;
    }
}