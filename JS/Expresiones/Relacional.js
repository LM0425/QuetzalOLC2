"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
const NodoAST_1 = require("../Abstract/NodoAST");
class Relacional {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opIzquierdo = opIzquierdo;
        this.opDerecho = opDerecho;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.BOOL;
    }
    traducir(tree, table) {
        var izq = this.opIzquierdo.traducir(tree, table);
        if (izq instanceof Excepcion_1.Excepcion)
            return izq;
        var der = this.opDerecho.traducir(tree, table);
        if (der instanceof Excepcion_1.Excepcion)
            return der;
        /* console.log(tree.getTabla());
        console.log(tree.getStack()); */
        if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
            let posStack = tree.getValorTablaByIdentificador(izq);
            //let value=tree.getValorPosStack(Number(posStack)).toString()
            let temporal = tree.generarTemporal();
            let texto3d = tree.generarInstruccion(temporal + " = stack[(int)" + posStack + "]");
            let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStack + "]");
            tree.addTemporalClase(temporalAux);
            return temporal + this.getSigno(this.operador) + der.toString();
            ;
        }
        else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
            let posStack = tree.getValorTablaByIdentificador(der);
            let temporal = tree.generarTemporal();
            let value = tree.getValorPosStack(posStack).toString();
            let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + this.getSigno(this.operador) + value);
            tree.addTemporalClase(temporalAux);
            return temporal;
        }
        else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
            let posStackIzq = tree.getValorTablaByIdentificador(izq);
            let temporal = tree.generarTemporal();
            let valueIzq = tree.getValorPosStack(posStackIzq).toString();
            let posStackDer = tree.getValorTablaByIdentificador(der);
            let valueDer = tree.getValorPosStack(posStackDer).toString();
            let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, valueIzq + this.getSigno(this.operador) + valueDer);
            tree.addTemporalClase(temporalAux);
            return temporal;
        }
        else {
            let temporal = tree.generarTemporal();
            //let texto3d= tree.generarInstruccion(temporal+"="+izq+"+"+der);
            //tree.updateConsola(texto3d);
            let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + this.getSigno(this.operador) + der);
            tree.addTemporalClase(temporalAux);
            return temporal;
        }
        //return izq.toString() +this.getSigno(this.operador)+der.toString();
    }
    interpretar(tree, table) {
        var izq = this.opIzquierdo.interpretar(tree, table);
        if (izq instanceof Excepcion_1.Excepcion)
            return izq;
        var der = this.opDerecho.interpretar(tree, table);
        if (der instanceof Excepcion_1.Excepcion)
            return der;
        if (this.operador === Tipo_1.OperadorRelacional.IGUALIGUAL) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return Number(izq) === Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return Number(izq) === parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                return Number(izq) === der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return parseFloat(izq) === Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return parseFloat(izq) === parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                return parseFloat(izq) === der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                return izq === der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return izq.charCodeAt(0) === Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return izq.charCodeAt(0) === parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                return izq.charCodeAt(0) === der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                return izq === der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para ==.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorRelacional.DIFERENTE) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return Number(izq) !== Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return Number(izq) !== parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                return Number(izq) !== der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return parseFloat(izq) !== Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return parseFloat(izq) !== parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                return parseFloat(izq) !== der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                return izq !== der;
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return izq.charCodeAt(0) !== Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return izq.charCodeAt(0) !== parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.CHAR && this.opDerecho.tipo === Tipo_1.Tipo.CHAR) {
                return izq.charCodeAt(0) !== der.charCodeAt(0);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                return izq !== der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para !=.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorRelacional.MENORQUE) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return Number(izq) < Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return Number(izq) < parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return parseFloat(izq) < Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return parseFloat(izq) < parseFloat(der);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para <.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorRelacional.MAYORQUE) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return Number(izq) > Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return Number(izq) > parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return parseFloat(izq) > Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return parseFloat(izq) > parseFloat(der);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para >.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorRelacional.MENORIGUAL) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return Number(izq) <= Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return Number(izq) <= parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return parseFloat(izq) <= Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return parseFloat(izq) <= parseFloat(der);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para <=.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorRelacional.MAYORIGUAL) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return Number(izq) >= Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.INT && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return Number(izq) >= parseFloat(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                return parseFloat(izq) >= Number(der);
            }
            else if (this.opIzquierdo.tipo === Tipo_1.Tipo.DOUBLE && this.opDerecho.tipo === Tipo_1.Tipo.DOUBLE) {
                return parseFloat(izq) >= parseFloat(der);
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para >=.", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("RELACIONAL");
        nodo.agregarHijoNodo(this.opIzquierdo.getNodo());
        nodo.agregarHijo(this.getSigno(this.operador));
        nodo.agregarHijoNodo(this.opDerecho.getNodo());
        return nodo;
    }
    getSigno(operador) {
        if (operador === Tipo_1.OperadorRelacional.DIFERENTE) {
            return "!=";
        }
        else if (operador === Tipo_1.OperadorRelacional.MENORQUE) {
            return "<";
        }
        else if (operador === Tipo_1.OperadorRelacional.MAYORQUE) {
            return ">";
        }
        else if (operador === Tipo_1.OperadorRelacional.MENORIGUAL) {
            return "<=";
        }
        else if (operador === Tipo_1.OperadorRelacional.MAYORIGUAL) {
            return ">=";
        }
        else if (operador === Tipo_1.OperadorRelacional.IGUALIGUAL) {
            return "==";
        }
    }
}
exports.Relacional = Relacional;
