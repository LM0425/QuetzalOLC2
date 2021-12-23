import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import {  TemporalAux } from "../AST/temporalAux";
import { Tipo } from "../AST/Tipo";

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
        let texto3d="";//"\n//-----------------Funcion "+this.nombre+"\n"
        let instrucciones="";
        //let cantidadParametros=this.parametros.length;
        

        //let id:any=this.nombre;

        

        let apuntador=tree.getApuntadorStack().toString();
        tree.addStack(0);
        
        let temporalAux = new TemporalAux("main",Tipo.VOID,this.fila,this.columna,apuntador);
        tree.addTabla(temporalAux);


        for (let instruccion of this.instrucciones) {
            let value = instruccion.traducir(tree, table);
            instrucciones+=value;
        }

        texto3d+=tree.setMain(instrucciones);

        //console.log(texto3d);
       

    }

    interpretar(tree: AST, table: Entorno) {
        tree.entorno = "Main"
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