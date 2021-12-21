import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Pow implements Instruccion {

    base: any;
    exponente: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(base: any, exponente: any, fila: number, columna: number) {
        this.base = base;
        this.exponente = exponente;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.INT;
    }

    interpretar(tree: AST, table: Entorno) {
        let base = this.base.interpretar(tree, table);
        if (base instanceof Excepcion) return base;

        let exponente = this.exponente.interpretar(tree, table);
        if (exponente instanceof Excepcion) return exponente;

        if (this.base.tipo !== Tipo.INT) return new Excepcion("Semantico", "La base de la potencia debe ser entero o decimal.", this.fila, this.columna);

        if (this.exponente.tipo !== Tipo.INT) return new Excepcion("Semantico", "El exponente debe ser entero.", this.fila, this.columna);

        return Math.pow(base, exponente)
    }

}