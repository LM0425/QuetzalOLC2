import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Identificador implements Instruccion {
    identificador: string;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(identificador: string, fila: number, columna: number) {
        this.identificador = identificador;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        return this.identificador;
    }

    interpretar(tree: AST, table: Entorno) {
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);

        this.tipo = simbolo.getTipo();

        return simbolo.getValor();
    }

    getNodo() {
        let nodo = new NodoAST("IDENTIFICADOR");
        nodo.agregarHijo(String(this.identificador));
        return nodo;
    }

}