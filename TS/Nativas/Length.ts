import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Length implements Instruccion{

    expresion:any;
    fila: number;
    columna: number;
    tipo:Tipo;

    constructor(expresion:any, fila:number, columna:number){
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.INT
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if(expresion instanceof Excepcion) return expresion;

        return expresion.length
    }
    
}