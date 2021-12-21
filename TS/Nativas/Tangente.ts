import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Tangente implements Instruccion {

    valor: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(valor: any, fila: number, columna: number) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.DOUBLE;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;
        
        return Math.tan(valor)
    }

}