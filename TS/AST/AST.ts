import { Instruccion } from "../Abstract/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Entorno } from "./Entorno";
import { Excepcion } from "./Excepcion";
import { Struct } from "../Instrucciones/struct";

export class AST {
    instrucciones: Array<Instruccion>
    public funciones: Array<Funcion>;   //Pull de Funciones
    public structs: Array<Struct>;      //Pull de Strcuts
    excepciones: Array<Excepcion>;      //Pull de Excepciones
    consola: string;
    TSGlobal: Entorno;

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.structs = []
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

    getStructs() {
        return this.structs;
    }

    getStrut(nombre: any) {
        //console.log(this.structs)
        let estructura: any;
        this.structs.forEach(element => {
            if (nombre == element.identificador) {
                //console.log('existe la estructura ', element);
                estructura = element
            }
        });

        return estructura;
    }

    mostrarStruct() {
        // console.log('las estructuras son: ')
        this.structs.forEach(element => {
            console.log(element);
        });
    }

    getFunciones() {
        return this.funciones;
    }

    getFuncion(nombre: string) {
        for (let funcion of this.funciones) {
            if (funcion.nombre === nombre) {
                return funcion;
            }
        }
        return null;
    }

    addFuncion(funcion: Funcion) {
        this.funciones.push(funcion);
    }
}