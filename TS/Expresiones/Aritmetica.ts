import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { OperadorAritmetico, Tipo } from "../AST/Tipo";

export class Aritmetica implements Instruccion{
    
    operador: any;
    opIzquierdo:any;
    opDerecho:any;
    fila: number;
    columna: number;
    tipo:Tipo

    constructor(operador:any, opIzquierdo:any, opDerecho:any, fila:number, columna:number){
        this.operador = operador;
        this.opDerecho = opDerecho;
        this.opIzquierdo = opIzquierdo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = null;
    }

    interpretar(tree: AST, table: Entorno) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if(izq instanceof Excepcion) return izq;
        if(this.opDerecho !== null){
            var der = this.opDerecho.interpretar(tree, table);
            if(der instanceof Excepcion) return der;
        }

        if(this.operador === OperadorAritmetico.MAS){
            if(this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT){
                this.tipo = Tipo.INT;
                return izq + der;
            }
        }else{
            return new Excepcion("Semantico", "Tipo de dato erroneo para operacion +", this.fila, this.columna);
        }
    }
    
}