import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";

export class Asignacion_atributo implements Instruccion {
    identificador: any;
    atributo:any;
    expresion: any;
    fila: number;
    columna: number;

    constructor(identificador: any, atributo:any, expresion: any, fila: number, columna: number) {
        this.identificador = identificador;
        this.atributo=atributo;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        
        let entorno = this.identificador.interpretar(tree, table);
        /* console.log('el atributo es:',this.atributo)
        console.log('el dato es ',this.expresion) */
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion) return value;
        
        if (entorno instanceof Excepcion) return entorno;

        let simbolo = new Simbolo(this.atributo.identificador, this.expresion.tipo, this.fila, this.columna, value);
        let result = entorno.actualizarSimbolo(simbolo);

        if (result instanceof Excepcion) return result;  

        return null; 
    }

}