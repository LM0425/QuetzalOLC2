import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Ternario implements Instruccion{

    expresion:any;
    condicionV:any;
    condicionF:any;
    fila: number;
    columna: number;
    tipo:Tipo;

    constructor(expresion:any, condicionV:any, condicionF:any, fila: number, columna: number){
        this.expresion = expresion;
        this.condicionV = condicionV;
        this.condicionF = condicionF;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let entrada = this.expresion.interpretar(tree,table);
        if(entrada instanceof Excepcion) return entrada;

        let salidaV = this.condicionV.interpretar(tree, table);
        if(salidaV instanceof Excepcion) return salidaV;

        let salidaF = this.condicionF.interpretar(tree, table);
        if(salidaF instanceof Excepcion) return salidaF;

        console.log("Entrada -- " + this.expresion)
        console.log("Entrada -- " + entrada)
        console.log("Salidav -- " + salidaV)
        console.log("SalidaF -- " + salidaF)
        if(entrada){
            this.tipo = this.condicionV.tipo;
            return salidaV;
        }else{
            this.tipo = this.condicionF.tipo;
            return salidaF;
        }
    }

    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    getNodo() {
        let nodo = new NodoAST("OPERADOR TERNARIO")
        let entrada = new NodoAST("Entrada");
        entrada.agregarHijoNodo(this.expresion.getNodo());
        let salidaV = new NodoAST("RESULTADO VERDADERO");
        salidaV.agregarHijoNodo(this.condicionV.getNodo());
        let salidaF = new NodoAST("RESULTADO FALSO");
        salidaF.agregarHijoNodo(this.condicionF.getNodo());
        nodo.agregarHijoNodo(entrada);
        nodo.agregarHijoNodo(salidaV);
        nodo.agregarHijoNodo(salidaF);
        return nodo;
    }
    
}