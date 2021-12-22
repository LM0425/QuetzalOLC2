import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import {  TemporalAux } from "../AST/temporalAux";

export class Raiz implements Instruccion {

    valor: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(valor:any, fila: number, columna: number) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.DOUBLE;
    }
    traducir(tree: AST, table: Entorno) {
        var izq = this.valor.traducir(tree, table);
        if(izq instanceof Excepcion) return izq;

        let temporal =tree.generarTemporal()
        //let texto3d= tree.generarInstruccion(temporal+"="+izq+"-"+der);
        //tree.updateConsola(texto3d);
        let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,"sqrt("+izq+")");
        tree.addTemporalClase(temporalAux);
        return temporal;
    }

    interpretar(tree: AST, table: Entorno) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;

        return Math.sqrt(valor)
    }

    getNodo() {
        let nodo = new NodoAST("RAIZ");

        let instrucciones = new NodoAST("VALOR ")
        instrucciones.agregarHijoNodo(this.valor.getNodo())
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
}