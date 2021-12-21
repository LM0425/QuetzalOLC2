import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { OperadorAritmetico, Tipo } from "../AST/Tipo";

export class Aritmetica implements Instruccion {

    operador: OperadorAritmetico;
    opIzquierdo: any;
    opDerecho: any;
    fila: number;
    columna: number;
    tipo: Tipo

    constructor(operador: OperadorAritmetico, opIzquierdo: any, opDerecho: any, fila: number, columna: number) {
        this.operador = operador;
        this.opDerecho = opDerecho;
        this.opIzquierdo = opIzquierdo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = null;
    }

    interpretar(tree: AST, table: Entorno) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion) return izq;
        if (this.opDerecho !== null) {
            var der = this.opDerecho.interpretar(tree, table);
            if (der instanceof Excepcion) return der;
        }

        if (this.operador === OperadorAritmetico.MAS) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) + Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) + parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) + Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) + Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) + parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) + parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) + Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) + parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) + der.charCodeAt(0)
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                //var aux=izq;
                //var ascii =aux.charCodeAt(0).toString();
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.BOOL && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.BOOL) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion +", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.MENOS) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) - Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) - parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) - Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) - Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) - parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) - parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) - Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) - parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) - der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion -", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.POR) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) * Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) * parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) * Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) * Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) * parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) * parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) * Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) * parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) * der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion *", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.DIV) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) / Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) / parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) / Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) / Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) / parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) / parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) / Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) / parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) / der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion /", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.MOD) {

            if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                return Number(izq) % Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return Number(izq) % parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.INT && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) % Number(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) % Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                return parseFloat(izq) % parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.DOUBLE && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) % parseFloat(ascii);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) % Number(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.DOUBLE) {
                this.tipo = Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) % parseFloat(der);
            } else if (this.opIzquierdo.tipo === Tipo.CHAR && this.opDerecho.tipo === Tipo.CHAR) {
                this.tipo = Tipo.INT;
                return izq.charCodeAt(0) % der.charCodeAt(0)
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion %", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.UMENOS) {

            if(this.opIzquierdo.tipo === Tipo.INT){
                this.tipo = Tipo.INT;
                return izq * -1;
            }else if(this.opIzquierdo.tipo === Tipo.DOUBLE){
                this.tipo = Tipo.DOUBLE;
                return izq * -1;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion (-)", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.CONCATENAR) {

            if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.STRING) {
                this.tipo = Tipo.STRING;
                return izq + der;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion de Concatenacion", this.fila, this.columna);
            }

        } else if (this.operador === OperadorAritmetico.REPETIR) {

            if (this.opIzquierdo.tipo === Tipo.STRING && this.opDerecho.tipo === Tipo.INT) {
                this.tipo = Tipo.STRING;
                var resultado = izq.repeat(Number(der));
                //console.log("iterar:", der);
                return resultado;
            } else {
                return new Excepcion("Semantico", "Tipo de dato erroneo para operacion de Repeticion", this.fila, this.columna);
            }

        } else {
            return new Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }

}