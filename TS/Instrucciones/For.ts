import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Break } from "./Break";

export class For implements Instruccion {

    variable: any;
    condicion:any;
    expresion:any;
    instrucciones: any;
    fila: number;
    columna: number;

    constructor(variable: any, condicion: any, expresion: any, instrucciones: any,fila: number, columna: number){
        this.variable=variable;
        this.condicion = condicion;
        this.expresion=expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let variable = this.variable.interpretar(tree, table);
        console.log('la variable es: ',variable);
        console.log('la global es:', this.variable);
    }
}