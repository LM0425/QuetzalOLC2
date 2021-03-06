import { Tipo } from "./Tipo";

export class TemporalAux {
    indentificador: string;
    tipo: Tipo;
    fila: number;
    columna: number;
    valor: string;
 

    constructor(identificador: string, tipo: Tipo, fila: number, columna: number, valor: string) {
        this.indentificador = identificador;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;

    }

    getId() {
        return this.indentificador;
    }

    setId(identificador: string) {
        this.indentificador = identificador;
    }

    getTipo() {
        return this.tipo;
    }

    setTipo(tipo: Tipo) {
        this.tipo = tipo;
    }

    getValor() {
        return this.valor;
    }

    setValor(valor: any) {
        this.valor = valor;
    }

    getFila() {
        return this.fila;
    }

    getColumna() {
        return this.columna;
    }
    


}