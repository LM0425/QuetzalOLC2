import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";

export class Pop implements Instruccion{

    expresion: any;
    fila: number;
    columna: number;

    constructor(expresion:any, fila:number, columna:number){
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if(expresion instanceof Excepcion) return expresion;

        return expresion.pop()
    }
    
}