import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
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
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table);
        if(expresion instanceof Excepcion) return expresion;

        return expresion.length
    }

    getNodo() {
        let nodo = new NodoAST("LENGTH");

        let instrucciones = new NodoAST("EXPRESION")
        instrucciones.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
    
}