import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Pop implements Instruccion{

    expresion: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(expresion:any, fila:number, columna:number){
        this.expresion = expresion;
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

        if(!(val instanceof Array)) return new Excepcion("Semantico", "Variable " + expresion + " no es un arreglo", this.fila, this.columna);

        this.tipo = simbolo.getTipoArreglo();

        return val.pop()
    }

    getNodo() {
        let nodo = new NodoAST("POP");

        let instrucciones = new NodoAST("ARREGLO")
        instrucciones.agregarHijoNodo(this.expresion.getNodo())
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
    
}