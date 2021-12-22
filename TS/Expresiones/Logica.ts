import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo, OperadorLogico } from "../AST/Tipo";

export class Logica implements Instruccion {
    operador: OperadorLogico;
    opIzquierdo: any;
    opDerecho: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(operador: OperadorLogico, opIzquierdo: any, opDerecho: any, fila: number, columna: number) {
        this.operador = operador;
        this.opIzquierdo = opIzquierdo;
        this.opDerecho = opDerecho;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.BOOL;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion) return izq;
        if (this.opDerecho !== null) {
            var der = this.opDerecho.interpretar(tree, table);
            if (der instanceof Excepcion) return der;
        }

        if (this.operador === OperadorLogico.AND) {
            if (this.opIzquierdo.tipo === Tipo.BOOL && this.opDerecho.tipo === Tipo.BOOL) {
                return izq && der;
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para &&.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorLogico.OR) {
            if (this.opIzquierdo.tipo === Tipo.BOOL && this.opDerecho.tipo === Tipo.BOOL) {
                return izq || der;
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para ||.", this.fila, this.columna);
            }
        } else if (this.operador === OperadorLogico.NOT) {
            if (this.opIzquierdo.tipo === Tipo.BOOL) {
                return !izq;
            } else {
                return new Excepcion("Semantico", "Tipo Erroneo de operando para !.", this.fila, this.columna);
            }
        } else {
            return new Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }

    getNodo() {
        let nodo = new NodoAST("LOGICA");
        if(this.opDerecho !== null){
            nodo.agregarHijoNodo(this.opIzquierdo.getNodo());
            nodo.agregarHijo(this.obtenerOperador(this.operador));
            nodo.agregarHijoNodo(this.opDerecho.getNodo());
        } else{
            nodo.agregarHijo(this.obtenerOperador(this.operador));
            nodo.agregarHijoNodo(this.opIzquierdo.getNodo());
        }
        return nodo;
    }

    obtenerOperador(op:OperadorLogico){
        if(op === OperadorLogico.NOT){
            return "!";
        } else if(op === OperadorLogico.AND){
            return "&&";
        } else if(op === OperadorLogico.OR){
            return "||";
        } 
    }

}