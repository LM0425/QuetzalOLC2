import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export class VerStruct implements Instruccion {

    identificador: any;
    atributo: any;
    fila: number;
    columna: number;

    constructor(identificador: any, atributo: any,fila: number, columna: number) {
        this.identificador=identificador;
        this.atributo=atributo;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let value = this.identificador.interpretar(tree, table);
        console.log('el valor en ver es ',value);
    }

}