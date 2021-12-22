import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";

export class Main implements Instruccion{

    instrucciones:any;
    fila: number;
    columna: number;
    
    constructor(instrucciones:any, fila:number, columna:number){
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let entornoMain = new Entorno(table)
        for(let instruccion of this.instrucciones){
            let value = instruccion.interpretar(tree, entornoMain);

            if(value instanceof Excepcion){
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
        }
    }

    getNodo() {
        let nodo = new NodoAST("MAIN");

        let instrucciones = new NodoAST("INSTRUCCIONES ")
        for(let instr of this.instrucciones){
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
    
}