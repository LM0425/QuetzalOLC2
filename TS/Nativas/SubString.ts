import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
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
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
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

    getNodo() {
        let nodo = new NodoAST("SUBSTRING");

        let instrucciones = new NodoAST("EXPRESION")
        instrucciones.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijoNodo(instrucciones);

        let posi = new NodoAST("POSICION INICIAL")
        posi.agregarHijoNodo(this.posInicial.getNodo())
        nodo.agregarHijoNodo(posi);

        let posf = new NodoAST("POSICION FINAL")
        posf.agregarHijoNodo(this.posFinal.getNodo())
        nodo.agregarHijoNodo(posf);
        return nodo;
        
    }
}