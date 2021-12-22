import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Case3d } from "../AST/Case3d";
import { NodoAST } from "../Abstract/NodoAST";

export class Default implements Instruccion {

    instrucciones: any;
    fila: number;
    columna: number;

    constructor(instrucciones: any, fila: number, columna: number) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        //let valor=this.expresion.traducir(tree,table);
        let ins=this.instrucciones//.traducir(tree,table);
        let caso=new Case3d('default',ins);
        //console.log("el caso a ingresar es: ",caso);
        //tree.addCaso(caso);
        return caso;
    }

    interpretar(tree: AST, table: Entorno) {
        return this
    }

    getNodo() {
        let nodo = new NodoAST("DEFAULT");
        let instrucciones = new NodoAST("INSTRUCCIONES DEFAULT");
        for(let instr of this.instrucciones){
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);

        return nodo;
    }

}