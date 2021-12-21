import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";

export class Push implements Instruccion{

    expresion: any;
    valor:any;
    fila: number;
    columna: number;

    constructor(expresion:any, valor:any, fila:number, columna:number){
        this.expresion = expresion;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if(expresion instanceof Excepcion) return expresion;

        let valor = this.valor.interpretar(tree, table);
        if(valor instanceof Excepcion) return valor;

        return expresion.push(valor)
    }
    
}