import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Return implements Instruccion{

    expresion: any;
    fila: number;
    columna: number;
    tipo:Tipo;
    result:any;

    constructor(expresion:any, fila:number, columna:number){
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let result = this.expresion.interpretar(tree, table);
        if(result instanceof Excepcion) return result;

        this.tipo = this.expresion.tipo;
        this.result = result;

        return this
    }
    
}