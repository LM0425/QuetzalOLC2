import { Instruccion } from "../Abstract/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Entorno } from "./Entorno";
import { Excepcion } from "./Excepcion";

export class AST {
    instrucciones: Array<Instruccion>
    // public structs:Array<Struct>;           //Pull de Strcuts
    public funciones:Array<Funcion>;        //Pull de Funciones
    excepciones: Array<Excepcion>;    //Pull de Excepciones
    consola: string;
    TSGlobal: Entorno

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        // this.structs = []
        this.funciones = []
        this.excepciones = []
        this.consola = "";
        this.TSGlobal = null;
    }

    getInstrucciones() {
        return this.instrucciones;
    }

    getExcepciones() {
        return this.excepciones;
    }

    setExcepciones(excepciones: Array<Excepcion>) {
        this.excepciones = excepciones
    }

    getConsola() {
        return this.consola;
    }

    updateConsola(cadena: string) {
        this.consola += cadena;
    }

    getTSglobal() {
        return this.TSGlobal;
    }

    setTSglobal(TSglobal: Entorno) {
        this.TSGlobal = TSglobal;
    }

    getFunciones(){
        return this.funciones;
    }

    getFuncion(nombre:string){
        for(let funcion of this.funciones){
            if(funcion.nombre === nombre){
                return funcion;
            }
        }
        return null;
    }

    addFuncion(funcion:Funcion){
        this.funciones.push(funcion);
    }
}