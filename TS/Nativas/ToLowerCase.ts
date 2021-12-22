import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class ToLowerCase implements Instruccion{

    expresion:any;
    fila: number;
    columna: number;
    tipo:Tipo;

    constructor(expresion:any, fila:number, columna:number){
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.STRING;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.interpretar(tree, table)
        if(expresion instanceof Excepcion) return expresion;

        if(this.expresion.tipo !== Tipo.STRING) return new Excepcion("Semantico", "El parametro de ToLower no es cadena", this.fila, this.columna);

        return expresion.toLowerCase();
    }
    
    getNodo() {
        let nodo = new NodoAST("TO LOWER CASE");

        let instrucciones = new NodoAST("VALOR")
        instrucciones.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
    
}