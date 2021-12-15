import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { OperadorAritmetico, Tipo } from "../AST/Tipo";
import { Simbolo } from "../AST/Simbolo";

export class inc_dec implements Instruccion {

    expresion: any;
    fila: number;
    columna: number;
    operador: OperadorAritmetico;
    tipo:Tipo

    constructor(operador: OperadorAritmetico,expresion: any, fila: number, columna: number) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.operador=operador;
        this.tipo = null;
    }

    interpretar(tree: AST, table: Entorno) {
       
        let id = this.expresion.interpretar(tree, table);
        if (id instanceof Excepcion) return id;

        if (this.operador === OperadorAritmetico.MAS) {
            
            if (this.expresion.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux= Number(id)+1
                let simbolo = new Simbolo(this.expresion.identificador, this.expresion.tipo, this.fila, this.columna, aux);
                let result = table.actualizarSimbolo(simbolo);
                if (result instanceof Excepcion) return result;
                return aux;
            }else {
                return new Excepcion("Semantico", "Tipo de dato no INT en Incremento.", this.fila, this.columna);
            }
        }else if(this.operador === OperadorAritmetico.MENOS){
            if (this.expresion.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux= Number(id)-1
                let simbolo = new Simbolo(this.expresion.identificador, this.expresion.tipo, this.fila, this.columna, aux);
                let result = table.actualizarSimbolo(simbolo);
                if (result instanceof Excepcion) return result;
                return aux;
            }else {
                return new Excepcion("Semantico", "Tipo de dato no INT en Decremento.", this.fila, this.columna);
            }
        } else {
            return new Excepcion("Semantico", "Tipo erroneo de operador en Incremento/Decremento.", this.fila, this.columna);
        }

    }

}