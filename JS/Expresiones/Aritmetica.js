"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Aritmetica {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opDerecho = opDerecho;
        this.opIzquierdo = opIzquierdo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = null;
    }
    interpretar(tree, table) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion_1.Excepcion)
            return izq;
        if (this.opDerecho !== null) {
            var der = this.opDerecho.interpretar(tree, table);
            if (der instanceof Excepcion_1.Excepcion)
                return der;
        }
        if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return Number(izq) + Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return Number(izq) + parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) + Number(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) + Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) + parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) + parseFloat(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) + Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) + parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq.charCodeAt(0) + der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                //var aux=izq;
                //var ascii =aux.charCodeAt(0).toString();
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion +", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.MENOS) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return Number(izq) - Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return Number(izq) - parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) - Number(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) - Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) - parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) - parseFloat(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) - Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) - parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq.charCodeAt(0) - der.charCodeAt(0);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion -", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.POR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return Number(izq) * Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return Number(izq) * parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) * Number(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) * Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) * parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) * parseFloat(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) * Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) * parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq.charCodeAt(0) * der.charCodeAt(0);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion *", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.DIV) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return Number(izq) / Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return Number(izq) / parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) / Number(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) / Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) / parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) / parseFloat(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) / Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) / parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq.charCodeAt(0) / der.charCodeAt(0);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion /", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.MOD) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return Number(izq) % Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return Number(izq) % parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return Number(izq) % Number(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) % Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return parseFloat(izq) % parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = der;
                var ascii = aux.charCodeAt(0);
                return parseFloat(izq) % parseFloat(ascii);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) % Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                var aux = izq;
                var ascii = aux.charCodeAt(0);
                return Number(ascii) % parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq.charCodeAt(0) % der.charCodeAt(0);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion %", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.UMENOS) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                return izq * -1;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE) {
                this.tipo = Tipo_1.Tipo.DOUBLE;
                return izq * -1;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion (-)", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.CONCATENAR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion de Concatenacion", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.REPETIR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.STRING;
                var resultado = izq.repeat(Number(der));
                //console.log("iterar:", der);
                return resultado;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion de Repeticion", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }
}
exports.Aritmetica = Aritmetica;
