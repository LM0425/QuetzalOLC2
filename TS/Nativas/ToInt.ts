import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import {  TemporalAux } from "../AST/temporalAux";

export class ToInt implements Instruccion {

    valor: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(valor: any, fila: number, columna: number) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.INT;
    }
    traducir(tree: AST, table: Entorno) {
        console.log("la tabla: ", tree.getTabla())
        console.log("el stack es ",tree.getStack())
        var izq = this.valor.traducir(tree, table);
        if(izq instanceof Excepcion) return izq;
        let posStack=tree.getValorTablaByIdentificador(izq);
        let temporal=tree.generarTemporal();
        let value=tree.getValorPosStack(posStack).toString()
        console.log("el valor es ", value);
        let nuevoValor="";//Math.trunc(Number(value));
        if (Math.trunc(Number(value))) {
            nuevoValor=Math.trunc(Number(value)).toString();
            
        }else{
            nuevoValor=value;
        }
        console.log("el nuevo valor es ", nuevoValor);
        let temporalAux = new TemporalAux(temporal,Tipo.INT,this.fila,this.columna,nuevoValor);
        tree.addTemporalClase(temporalAux);
        return temporal;
    }

    interpretar(tree: AST, table: Entorno) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion) return valor;

        if(this.valor.tipo !== Tipo.DOUBLE) return new Excepcion("Semantico", "El parametro debe ser de tipo Double", this.fila, this.columna);
        
        return Math.trunc(valor)
    }

    getNodo() {
        let nodo = new NodoAST("TO INT");

        let instrucciones = new NodoAST("VALOR")
        instrucciones.agregarHijoNodo(this.valor.getNodo())
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
}