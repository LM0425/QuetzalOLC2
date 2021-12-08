export class Excepcion {
    tipo: string;
    descripcion: string;
    fila: number;
    columna: number;

    constructor(tipo: string, descripcion: string, fila: number, columna: number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    toString() {
        return this.tipo + " - " + this.descripcion + " [" + String(this.fila) + "," + String(this.columna) + "]";
    }

}