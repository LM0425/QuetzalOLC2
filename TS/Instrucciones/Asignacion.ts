import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";

export class Asignacion implements Instruccion {
    identificador: string;
    expresion: any;
    fila: number;
    columna: number;

    constructor(identificador: string, expresion: any, fila: number, columna: number) {
        this.identificador = identificador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion) return value;

        let simbolo = new Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
        let result = table.actualizarTabla(simbolo);

        if (result instanceof Excepcion) return result;

        return null;
    }

}