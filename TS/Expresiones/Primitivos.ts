import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";


export class Primitivos implements Instruccion {

    tipo: Tipo;
    valor: any;
    fila: number;
    columna: number;
    tipoArreglo: Tipo;

    constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipoArreglo = null;
    }
    traducir(tree: AST, table: Entorno) {
        if (this.tipo===Tipo.ARRAY) {
            
        } else {
            return this.valor;
        }
    }

    interpretar(tree: AST, table: Entorno) {
        if(this.tipo === Tipo.ARRAY){
            let valTipo = this.defTipo(this.valor);
            if(valTipo instanceof Excepcion) return valTipo

            let val = this.definirArreglo(this.valor, tree, table);
            if(val instanceof Excepcion){
                return val
            }else{
                this.valor = val;
            }
        }
        return this.valor;
    }

    getNodo() {
        let nodo = new NodoAST("PRIMITIVO");
        nodo.agregarHijo(String(this.valor));
        return nodo;
    }

    defTipo(arreglo:any){
        for(let valor of arreglo){
            if(valor instanceof Array){
                let result = this.defTipo(valor);
                if(result instanceof Excepcion) return result;
                continue
            }

            if(this.tipoArreglo === null){
                this.tipoArreglo = valor.tipo
            }else if(this.tipoArreglo!== valor.tipo){
                return  new Excepcion("Semantico", "Tipo de dato diferentes en arreglo", this.fila, this.columna);
            }
        }

        return null
    }

    definirArreglo(arreglo:any, tree:AST, table:Entorno){
        let retorno = [];

        for(let valor of arreglo){
            if(valor instanceof Array){
                retorno.push(this.definirArreglo(valor, tree, table));
                continue
            }
            let val = valor.interpretar(tree, table);
            if(val instanceof Excepcion) return val;
            retorno.push(val);
        }

        return retorno;
    }
}