import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Case3d } from "../AST/Case3d";

export class Case implements Instruccion {

    expresion: any;
    instrucciones: any;
    fila: number;
    columna: number;

    constructor(expresion: any, instrucciones: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        let valor=this.expresion.traducir(tree,table);
        let ins=this.instrucciones//.traducir(tree,table);
        let caso=new Case3d(valor,ins);
        //console.log("el caso a ingresar es: ",caso);
        //tree.addCaso(caso);
        return caso;
    }

    interpretar(tree: AST, table: Entorno) {
        return this
    }

}