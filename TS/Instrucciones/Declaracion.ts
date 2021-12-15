import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";

export class Declaracion implements Instruccion {
    tipo: Tipo;
    identificador: string[];
    expresion: any;
    fila: number;
    columna: number;
    decArreglo: boolean;
    porReferencia: any;
    copia: any;

    constructor(tipo: Tipo, identficador: string[], fila: number, columna: number, expresion: any, decArreglo: boolean, porRefencia: any, copia: any) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.fila = fila;
        this.columna = columna;
        this.expresion = expresion;
        this.decArreglo = decArreglo;
        this.porReferencia = porRefencia;
        this.copia = copia;
    }

    interpretar(tree: AST, table: Entorno) {
        if (this.decArreglo === true) {
            if (this.porReferencia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);

                if(this.tipo !== simbolo.getTipoArreglo()) return new Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);

                simbolo.setId(this.identificador.pop());
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion) return result;

            } else if (this.copia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);

                if(this.tipo !== simbolo.getTipoArreglo()) return new Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);

                let nuevoSimbolo = new Simbolo(this.identificador.pop(), Tipo.ARRAY, this.fila, this.columna, simbolo.getValor().slice());
                nuevoSimbolo.setTipoArreglo(this.tipo)
                
                let result = table.agregarSimbolo(nuevoSimbolo);
                if (result instanceof Excepcion) return result

            } else {
                let value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (value instanceof Excepcion) return value;

                if (this.tipo !== this.expresion.tipoArreglo) return new Excepcion("Semantico", "Tipo de dato difente al tipo del arreglo.", this.fila, this.columna);
                this.tipo = Tipo.ARRAY;

                let simbolo = new Simbolo(this.identificador.pop(), this.tipo, this.fila, this.columna, value);
                simbolo.setTipoArreglo(this.expresion.tipoArreglo)
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion) return result;
            }
        } else {
            let value = null;
            if (this.expresion !== null) {
                value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (this.tipo !== this.expresion.tipo) return new Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
            }

            for (let id of this.identificador) {
                if (value instanceof Excepcion) return value;

                let simbolo = new Simbolo(id, this.tipo, this.fila, this.columna, value);

                let result = table.agregarSimbolo(simbolo);

                if (result instanceof Excepcion) return result;
            }
        }

        return null;
    }

}