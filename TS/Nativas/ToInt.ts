import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class ToInt implements Instruccion {

    valor: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(valor: any, fila: number, columna: number) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.INT;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;

        if(this.valor.tipo !== Tipo.DOUBLE) return new Excepcion("Semantico", "El parametro debe ser de tipo Double", this.fila, this.columna);
        
        return Math.trunc(valor)
    }

}