export class SimboloReporte {

    identificador: string;
    tipoSimbolo: string;
    tipo: any;
    entorno: string;
    valor: any;
    fila: number;
    columna: number;

    constructor(identificador: string, tipoSimbolo: string, tipo: any, entorno: string, valor: any, fila: number, columna: number) {
        this.identificador = identificador;
        this.tipoSimbolo = tipoSimbolo;
        this.tipo = tipo;
        this.entorno = entorno;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    getIdentificador(){
        return this.identificador;
    }

    setIdentificador(identificador: string){
        this.identificador = identificador;
    }

    getTipoSimbolo(){
        return this.tipoSimbolo;
    }

    setTipoSimbolo(tipoSimbolo: string){
        this.tipoSimbolo = tipoSimbolo;
    }

    getTipo(){
        return this.tipo;
    }

    setTipo(tipo: any){
        this.tipo = tipo;
    }

    getEntorno(){
        return this.entorno;
    }

    setEntorno(entorno: string){
        this.entorno = entorno;
    }

    getValor(){
        return this.valor;
    }

    setValor(valor: any){
        this.valor = valor;
    }

    getFila(){
        return this.fila;
    }

    getColumna(){
        return this.columna;
    }
}