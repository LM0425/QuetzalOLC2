import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class SubString implements Instruccion {

    expresion: any;
    posInicial: any;
    posFinal: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(expresion: any, posInicial: any, posFinal: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.posInicial = posInicial;
        this.posFinal = posFinal;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.STRING;
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion) return expresion;

        let posInicial = this.posInicial.interpretar(tree, table);
        if (posInicial instanceof Excepcion) return posInicial;

        let posFinal = this.posFinal.interpretar(tree, table);
        if (posFinal instanceof Excepcion) return posFinal;

        return expresion.slice(posInicial, posFinal);
    }

}