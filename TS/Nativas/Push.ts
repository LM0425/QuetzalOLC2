import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
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

    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let expresion = this.expresion.identificador
        let simbolo = table.getTabla(expresion);
        if (simbolo === null) return new Excepcion("Semantico", "Variable " + expresion + " no encontrada", this.fila, this.columna);

        let val = simbolo.getValor();

        let valor = this.valor.interpretar(tree, table);
        if(valor instanceof Excepcion) return valor;

        val.push(valor)        

        return this
    }

    getNodo() {
        let nodo = new NodoAST("PUSH");

        let arreglo = new NodoAST("ARREGLO")
        arreglo.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijoNodo(arreglo);

        let instrucciones = new NodoAST("VALOR")
        instrucciones.agregarHijoNodo(this.valor.getNodo())
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
    
}