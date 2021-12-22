import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Return implements Instruccion {

    expresion: any;
    fila: number;
    columna: number;
    tipo: Tipo;
    result: any;

    constructor(expresion: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        if (this.expresion !== null) {
            let result = this.expresion.interpretar(tree, table);
            if (result instanceof Excepcion) return result;

            this.tipo = this.expresion.tipo;
            this.result = result;

            return this
        } else {
            this.tipo = Tipo.VOID;
            this.result = null;
            return this
        }
    }

    getNodo() {
        let nodo = new NodoAST("RETURN");
        if(this.expresion !== null){
            nodo.agregarHijoNodo(this.expresion.getNodo());
        }
        return nodo;
    }

}