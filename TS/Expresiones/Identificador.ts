import { Instruccion } from "../Abstract/Instruccion";
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

    interpretar(tree: AST, table: Entorno) {
        let simbolo = table.getSimbolo(this.identificador);
        if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);

        this.tipo = simbolo.getTipo();

        return simbolo.getValor();
    }

}