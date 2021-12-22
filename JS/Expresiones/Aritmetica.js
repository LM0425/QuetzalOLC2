"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
const NodoAST_1 = require("../Abstract/NodoAST");
class Aritmetica {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opDerecho = opDerecho;
        this.opIzquierdo = opIzquierdo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = null;
    }
    traducir(tree, table) {
        //console.log("el izquierdo es: ",this.opIzquierdo);
        var izq = this.opIzquierdo.traducir(tree, table);
        if (izq instanceof Excepcion_1.Excepcion)
            return izq;
        if (this.opDerecho !== null) {
            var der = this.opDerecho.traducir(tree, table);
            if (der instanceof Excepcion_1.Excepcion)
                return der;
        }
        try {
            if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
                if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStack + "]+" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(der);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "+" + "stack[(int)" + posStack + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                    let posStackIzq = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                    let posStackDer = tree.getValorTablaByIdentificador(der);
                    let valueDer = tree.getValorPosStack(posStackDer).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStackIzq + "]+" + "stack[(int)" + posStackDer + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else {
                    let temporal = tree.generarTemporal();
                    let texto3d = tree.generarInstruccion(temporal + "=" + izq + "+" + der);
                    //tree.updateConsola(texto3d);
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "+" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
            }
            else if (this.operador === Tipo_1.OperadorAritmetico.MENOS) {
                if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStack + "]-" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(der);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "-" + "stack[(int)" + posStack + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                    let posStackIzq = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                    let posStackDer = tree.getValorTablaByIdentificador(der);
                    let valueDer = tree.getValorPosStack(posStackDer).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStackIzq + "]-" + "stack[(int)" + posStackDer + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else {
                    let temporal = tree.generarTemporal();
                    let texto3d = tree.generarInstruccion(temporal + "=" + izq + "-" + der);
                    //tree.updateConsola(texto3d);
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "-" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
            }
            else if (this.operador === Tipo_1.OperadorAritmetico.POR) {
                if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStack + "]*" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(der);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "*" + "stack[(int)" + posStack + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                    let posStackIzq = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                    let posStackDer = tree.getValorTablaByIdentificador(der);
                    let valueDer = tree.getValorPosStack(posStackDer).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStackIzq + "]*" + "stack[(int)" + posStackDer + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else {
                    let temporal = tree.generarTemporal();
                    let texto3d = tree.generarInstruccion(temporal + "=" + izq + "*" + der);
                    //tree.updateConsola(texto3d);
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "*" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
            }
            else if (this.operador === Tipo_1.OperadorAritmetico.DIV) {
                if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStack + "]/" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(der);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "/" + "stack[(int)" + posStack + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                    let posStackIzq = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                    let posStackDer = tree.getValorTablaByIdentificador(der);
                    let valueDer = tree.getValorPosStack(posStackDer).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "stack[(int)" + posStackIzq + "]/" + "stack[(int)" + posStackDer + "]");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else {
                    let temporal = tree.generarTemporal();
                    let texto3d = tree.generarInstruccion(temporal + "=" + izq + "/" + der);
                    //tree.updateConsola(texto3d);
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "/" + der);
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
            }
            else if (this.operador === Tipo_1.OperadorAritmetico.MOD) {
                if (this.opIzquierdo.identificador && !this.opDerecho.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + "stack[(int)" + posStack + "]" + "," + der + ")");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                    let posStack = tree.getValorTablaByIdentificador(der);
                    let temporal = tree.generarTemporal();
                    let value = tree.getValorPosStack(posStack).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + izq + "," + "stack[(int)" + posStack + "]" + ")");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                    let posStackIzq = tree.getValorTablaByIdentificador(izq);
                    let temporal = tree.generarTemporal();
                    let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                    let posStackDer = tree.getValorTablaByIdentificador(der);
                    let valueDer = tree.getValorPosStack(posStackDer).toString();
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + "stack[(int)" + posStackIzq + "]" + "," + "stack[(int)" + posStackDer + "]" + ")");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
                else {
                    let temporal = tree.generarTemporal();
                    //let texto3d= tree.generarInstruccion(temporal+"="+izq+"-"+der);
                    //tree.updateConsola(texto3d);
                    let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + izq + "," + der + ")");
                    tree.addTemporalClase(temporalAux);
                    return temporal;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
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
                this.tipo = Tipo_1.Tipo.DOUBLE;
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
            this.tipo = Tipo_1.Tipo.STRING;
            return izq + der;
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
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("ARITMETICA");
        if (this.opDerecho !== null) {
            nodo.agregarHijoNodo(this.opIzquierdo.getNodo());
            nodo.agregarHijo(this.obtenerOperador(this.operador));
            nodo.agregarHijoNodo(this.opDerecho.getNodo());
        }
        else {
            nodo.agregarHijo(this.obtenerOperador(this.operador));
            nodo.agregarHijoNodo(this.opIzquierdo.getNodo());
        }
        return nodo;
    }
    obtenerOperador(op) {
        if (op === Tipo_1.OperadorAritmetico.MAS) {
            return "+";
        }
        else if (op === Tipo_1.OperadorAritmetico.MENOS) {
            return "-";
        }
        else if (op === Tipo_1.OperadorAritmetico.POR) {
            return "*";
        }
        else if (op === Tipo_1.OperadorAritmetico.DIV) {
            return "/";
        }
        else if (op === Tipo_1.OperadorAritmetico.MOD) {
            return "%";
        }
        else if (op === Tipo_1.OperadorAritmetico.UMENOS) {
            return "-";
        }
        else if (op === Tipo_1.OperadorAritmetico.CONCATENAR) {
            return "&";
        }
        else if (op === Tipo_1.OperadorAritmetico.REPETIR) {
            return "^";
        }
    }
}
exports.Aritmetica = Aritmetica;
