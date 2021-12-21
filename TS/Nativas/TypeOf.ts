import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class TypeOf implements Instruccion {

    valor: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(valor: any, fila: number, columna: number) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.STRING;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;

        if(this.valor.tipo === Tipo.INT){
            return "int"
        } else if(this.valor.tipo === Tipo.DOUBLE){
            return "double"
        } else if(this.valor.tipo === Tipo.STRING){
            return "string"
        } else if(this.valor.tipo === Tipo.CHAR){
            return "char"
        } else if(this.valor.tipo === Tipo.ARRAY){
            return "array"
        } else if(this.valor.tipo === Tipo.STRUCT){
            return "struct"
        } else if(this.valor.tipo === Tipo.BOOL){
            return "boolean"
        }
    }

}