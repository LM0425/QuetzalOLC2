import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { OperadorAritmetico, Tipo } from "../AST/Tipo";
import { Simbolo } from "../AST/Simbolo";
import { NodoAST } from "../Abstract/NodoAST";

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
    traducir(tree: AST, table: Entorno) {
        console.log(tree.getTabla())
        if (this.operador=== OperadorAritmetico.MAS) {
            let valor=this.expresion.traducir(tree,table);
            let texto3d="";
            let posStack=tree.getValorTablaByIdentificador(valor);
            let temporal =tree.generarTemporal();
            texto3d+=tree.generarInstruccion(temporal+" = stack[(int)"+posStack+"]");
            let temporalMas=tree.generarTemporal();
            texto3d+=tree.generarInstruccion(temporalMas+" = "+temporal+" + 1")
            texto3d+=tree.generarInstruccion("stack[(int)"+posStack+"] = "+temporalMas);
            console.log(texto3d);
            return texto3d;
        } else if(this.operador=== OperadorAritmetico.MENOS){
            let valor=this.expresion.traducir(tree,table);
            let texto3d="";
            let posStack=tree.getValorTablaByIdentificador(valor);
            let temporal =tree.generarTemporal();
            texto3d+=tree.generarInstruccion(temporal+" = stack[(int)"+posStack+"]");
            let temporalMas=tree.generarTemporal();
            texto3d+=tree.generarInstruccion(temporalMas+" = "+temporal+" - 1")
            texto3d+=tree.generarInstruccion("stack[(int)"+posStack+"] = "+temporalMas);
            console.log(texto3d);
            return texto3d;
        }
        

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

    getNodo() {
        let nodo:NodoAST;
        if(this.operador === OperadorAritmetico.MAS){
            nodo = new NodoAST("INCREMENTO");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo("++")
        }else{
            nodo = new NodoAST("Decremento");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo("--")
        }
        return nodo;
        
    }

}