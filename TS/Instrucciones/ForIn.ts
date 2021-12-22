import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class ForIn implements Instruccion {

    variable: string;
    expresion: any;
    instrucciones: any;
    fila: number;
    columna: number;

    constructor(variable: string, expresion: any, instrucciones: any, fila: number, columna: number) {
        this.variable = variable;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let entornoFor = new Entorno(table);

        let expresion = this.expresion.interpretar(tree, entornoFor);
        if (expresion instanceof Excepcion) return expresion;

        let tipo: Tipo;
        if (this.expresion.tipo === Tipo.ARRAY) {
            tipo = this.expresion.tipoArreglo;
        } else {
            tipo = this.expresion.tipo;
        }

        for (let caracter of expresion) {
            let entornoPasadFor = new Entorno(entornoFor);
            let simbolo = new Simbolo(this.variable, tipo, this.fila, this.columna, caracter);

            let result = entornoPasadFor.agregarSimbolo(simbolo);
            if (result instanceof Excepcion) return result;

            for (let instruccion of this.instrucciones) {
                let result = instruccion.interpretar(tree, entornoPasadFor);
                if (result instanceof Excepcion) {
                    tree.getExcepciones().push(result);
                    tree.updateConsola(result.toString());
                }
                if (result instanceof Break) return null;
                if (result instanceof Continue) break;
                if (result instanceof Return) return result;
            }
        }
    }

    getNodo() {
        let nodo = new NodoAST("FOR IN");
        let instrucciones = new NodoAST("INSTRUCCIONES FOR");
        for(let instr of this.instrucciones){
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);

        return nodo;
    }
}