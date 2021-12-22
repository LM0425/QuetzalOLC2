(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.load = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = [];
        this.excepciones = [];
        this.consola = "";
        this.dot = "";
        this.contador = 0;
        this.TSGlobal = null;
        this.contadores = [];
        this.contadorTemporal = 0;
        this.posicionContador = 0;
        this.stack = [];
        this.heap = [];
        this.temporalesAux = [];
        this.apuntadorStack = 0;
        this.apuntadorHeap = 0;
        this.contadorEtiquetas = 0;
        this.tabla = [];
        this.casos = [];
        this.funciones3D = [];
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    getExcepciones() {
        return this.excepciones;
    }
    setExcepciones(excepciones) {
        this.excepciones = excepciones;
    }
    getConsola() {
        return this.consola;
    }
    updateConsola(cadena) {
        this.consola += cadena;
    }
    getTSglobal() {
        return this.TSGlobal;
    }
    setTSglobal(TSglobal) {
        this.TSGlobal = TSglobal;
    }
    getStructs() {
        return this.structs;
    }
    getStrut(nombre) {
        //console.log(this.structs)
        let estructura;
        this.structs.forEach(element => {
            if (nombre == element.identificador) {
                //console.log('existe la estructura ', element);
                estructura = element;
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
    getFuncion(nombre) {
        for (let funcion of this.funciones) {
            if (funcion.nombre === nombre) {
                return funcion;
            }
        }
        return null;
    }
    addFuncion(funcion) {
        this.funciones.push(funcion);
    }
    getDot(raiz) {
        this.dot = "";
        this.dot += "digraph {\n";
        this.dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
        this.contador = 1;
        this.recorrerAST("n0", raiz);
        this.dot += "}";
        return this.dot;
    }
    recorrerAST(idPadre, nodoPadre) {
        for (let hijo of nodoPadre.getHijos()) {
            let nombreHijo = "n" + String(this.contador);
            this.dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
            this.dot += idPadre + "->" + nombreHijo + ";\n";
            this.contador += 1;
            this.recorrerAST(nombreHijo, hijo);
        }
    }
    addFuncion3D(funcion) {
        this.funciones3D.push(funcion);
    }
    getListaFunciones3D() {
        let funciones = "";
        this.funciones3D.forEach(element => {
            funciones += "\n" + element + "\n";
        });
        return funciones;
    }
    generarEtiquetas() {
        let etiqueta = "L" + this.contadorEtiquetas.toString();
        this.contadorEtiquetas++;
        return etiqueta;
    }
    generarTemporal() {
        let temporal = "T" + this.contadorTemporal.toString();
        this.contadores.push(temporal);
        this.contadorTemporal++;
        return temporal;
    }
    getUltimoTemporal() {
        let temporal;
        this.contadores.forEach(element => {
            temporal = element;
        });
        return temporal;
    }
    getApuntadorStack() {
        return this.apuntadorStack;
    }
    addStack(valor) {
        this.stack.push(valor);
        this.apuntadorStack++;
    }
    addHeap(valor) {
        this.heap.push(Number(valor));
        this.apuntadorHeap++;
    }
    getHeap() {
        return this.heap;
    }
    getApuntadorHeap() {
        return this.apuntadorHeap;
    }
    getStack() {
        return this.stack;
    }
    getValorPosStack(pos) {
        return this.stack[pos];
    }
    addTabla(valor) {
        this.tabla.push(valor);
    }
    getTabla() {
        return this.tabla;
    }
    getValorTablaByIdentificador(identificador) {
        let tipo;
        this.tabla.forEach(element => {
            if (element.indentificador === identificador) {
                tipo = element.valor;
            }
        });
        return tipo;
    }
    getTipoTablaByIdentificador(identificador) {
        let tipo;
        this.tabla.forEach(element => {
            if (element.indentificador === identificador) {
                tipo = element.tipo;
            }
        });
        return tipo;
    }
    addTemporalClase(valor) {
        this.temporalesAux.push(valor);
    }
    getTemporalClase() {
        return this.temporalesAux;
    }
    getTipoTemporalClase(identificador) {
        let tipo;
        this.temporalesAux.forEach(element => {
            if (element.indentificador === identificador) {
                tipo = element.tipo;
            }
        });
        return tipo;
    }
    getValueTemporalClase(identificador) {
        let value;
        this.temporalesAux.forEach(element => {
            if (element.indentificador === identificador) {
                value = element.valor;
            }
        });
        return value;
    }
    getListaTemporalClase() {
        let value = "";
        this.temporalesAux.forEach(element => {
            value += element.indentificador + " = " + element.valor + ";\n";
        });
        return value;
    }
    limpiartemporalClase() {
        this.temporalesAux = [];
    }
    generarInstruccion(cadena) {
        return "\n" + cadena + ";";
    }
    getMain(instrucciones) {
        let main = "\n\n/*------MAIN------*/\nvoid main() {\n" + instrucciones + "return;\n}";
        let funciones = this.getListaFunciones3D();
        return funciones + main;
    }
    getFunciones3D() {
    }
    getValueByTemporal(temporal) {
        let value;
        this.temporalesAux.forEach(element => {
            if (element.indentificador === temporal) {
                value = element.valor;
            }
        });
        return value;
    }
    getListaTemporales() {
        let lista = "";
        for (let i = 0; i < this.contadores.length; i++) {
            const element = this.contadores[i];
            if (i === 0) {
                lista = element;
            }
            else {
                lista += "," + element;
            }
        }
        return lista;
    }
    getEncabezado() {
        let header = "#include <stdio.h>\n#include <math.h>  \ndouble heap[30101999];\ndouble stack[30101999];\ndouble P;\ndouble H;";
        return header;
    }
    getCasos() {
        return this.casos;
    }
    addCaso(value) {
        this.casos.push(value);
    }
    //---------------------------IF
    getIf(condicion, verdadero, falso) {
        let etiquetaTrue = this.generarEtiquetas();
        let etiquetaFalse = this.generarEtiquetas();
        let texto3d = "";
        texto3d += "if(" + condicion + ") goto " + etiquetaTrue + ";\n";
        texto3d += "goto " + etiquetaFalse + ";\n";
        texto3d += etiquetaTrue + ":" + verdadero + "\n";
        texto3d += etiquetaFalse + ":" + falso + "\n";
        return texto3d;
    }
    //---------------------------while
    getWhile(condicion, instrucciones) {
        let etiquetaRetorno = this.generarEtiquetas();
        let etiquetaEntrada = this.generarEtiquetas();
        let etiquetaSalida = this.generarEtiquetas();
        let texto3d = "";
        texto3d += "if(" + condicion + ") goto " + etiquetaEntrada + ";\n";
        texto3d += "goto " + etiquetaSalida + ";\n";
        texto3d += etiquetaEntrada + ":\n";
        texto3d += instrucciones + "\n";
        texto3d += "goto " + etiquetaRetorno + ";\n";
        texto3d += etiquetaSalida + ":";
        return texto3d;
    }
    //--------------------------------do while
    getDoWhile(condicion, instrucciones) {
        let etiquetaRetorno = this.generarEtiquetas();
        let etiquetaEntrada = this.generarEtiquetas();
        let etiquetaSalida = this.generarEtiquetas();
        let texto3d = "";
        texto3d += etiquetaRetorno + ":\n";
        texto3d += instrucciones + "\n";
        texto3d += "if(" + condicion + ") goto " + etiquetaEntrada + ";\n";
        texto3d += "goto " + etiquetaSalida + ";\n";
        texto3d += etiquetaEntrada + ":\n";
        texto3d += "  goto " + etiquetaRetorno + ";\n";
        texto3d += etiquetaSalida + ":\n";
        return texto3d;
    }
    //--------------------------FOR
    getFor() {
    }
    //-------------switch
    getSwitch() { }
    //--------------------imprimir cadena
    getPrintString(identficador) {
        let posStack = this.getValorTablaByIdentificador(identficador);
        if (posStack) {
            //let apuntador=this.getApuntadorStack()-1;
            let temporalA = this.generarTemporal();
            let texto3d = this.generarInstruccion("P = " + posStack.toString());
            texto3d += this.generarInstruccion(temporalA + " = P");
            let temporalS = this.generarTemporal();
            texto3d += this.generarInstruccion(temporalS + " = stack[(int)" + temporalA + "]");
            let etiquetaEntrada = this.generarEtiquetas();
            let etiquetaRegreso = this.generarEtiquetas();
            texto3d += "\n" + etiquetaRegreso + ":";
            let temporalH = this.generarTemporal();
            texto3d += this.generarInstruccion(temporalH + " = heap[(int)" + temporalS + "]");
            texto3d += this.generarInstruccion("if(" + temporalH + " == -1) goto " + etiquetaEntrada);
            texto3d += this.generarInstruccion("printf(\"%c\", (char)" + temporalH + ")");
            texto3d += this.generarInstruccion(temporalS + " = " + temporalS + "+1");
            texto3d += "\ngoto " + etiquetaRegreso + ";\n" + etiquetaEntrada + ":\n";
            return texto3d;
        }
        else {
        }
    }
}
exports.AST = AST;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case3d = void 0;
class Case3d {
    constructor(identificador, instrucciones) {
        this.identificador = identificador;
        this.instrucciones = instrucciones;
    }
}
exports.Case3d = Case3d;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const Excepcion_1 = require("./Excepcion");
class Entorno {
    constructor(anterior = null) {
        this.tabla = {}; // Diccionario vacio, es como una tabla hash
        this.anterior = anterior;
    }
    agregarSimbolo(simbolo) {
        let id = simbolo.indentificador.toLowerCase();
        if (this.tabla.hasOwnProperty(id)) {
            //console.log("El simbolo ya existe")
            return new Excepcion_1.Excepcion("Semantico", "Variable " + simbolo.indentificador + " ya existe", simbolo.fila, simbolo.columna);
        }
        else {
            this.tabla[id] = simbolo;
            //console.log("simbolo insertado")
            return null; // Se agrego correctamente
        }
    }
    eliminar(id) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }
    existe(id) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }
    existeEnActual(id) {
        id = id.toLowerCase();
        if (this.tabla[id] !== undefined) {
            return true;
        }
        return false;
    }
    getTabla(identificador) {
        let tablaActual = this;
        let id = identificador.toLowerCase();
        while (tablaActual !== null) {
            if (tablaActual.tabla.hasOwnProperty(id)) {
                // console.log("Simbolo encontrado");
                return tablaActual.tabla[id]; // Retorno Simbolo (variable)
            }
            else {
                // console.log("Entrando a tabla anterior");
                tablaActual = tablaActual.anterior;
            }
        }
        return null; // No existe el simbolo
    }
    getSimbolo(id) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id];
            }
        }
        return null;
    }
    reemplazar(id, nuevoValor) {
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            if (value !== undefined) {
                e.tabla[id] = nuevoValor;
            }
        }
    }
    actualizarSimbolo(simbolo) {
        let id = simbolo.indentificador.toLowerCase();
        for (let e = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            //console.log('e es igual a ', value)
            if (value !== undefined) {
                if (value.getTipo() === simbolo.getTipo()) {
                    //console.log("Modificando simbolo");
                    e.tabla[id].setValor(simbolo.getValor());
                    return null;
                }
                else {
                    //console.log("Tipo diferente en modificacion");
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de valor difente al tipo del simbolo a modificar", simbolo.getFila(), simbolo.getColumna());
                }
            }
        }
        return new Excepcion_1.Excepcion("Semantico", "Variable no encontrada en Asignacion", simbolo.getFila(), simbolo.getColumna());
    }
    actualizarTabla(simbolo) {
        let tablaActual = this;
        let id = simbolo.indentificador.toLowerCase();
        while (tablaActual !== null) {
            if (tablaActual.tabla.hasOwnProperty(id)) {
                if (tablaActual.tabla[id].getTipo() === simbolo.getTipo()) {
                    //console.log("Modificando simbolo");
                    tablaActual.tabla[id].setValor(simbolo.getValor());
                    return null;
                }
                else {
                    //console.log("Tipo diferente en modificacion");
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de valor difente al tipo del simbolo a modificar", simbolo.getFila(), simbolo.getColumna());
                }
            }
            else {
                tablaActual = tablaActual.anterior;
            }
        }
        return new Excepcion_1.Excepcion("Semantico", "Variable no encontrada en Asignacion", simbolo.getFila(), simbolo.getColumna());
    }
}
exports.Entorno = Entorno;

},{"./Excepcion":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
class Excepcion {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return this.tipo + " - " + this.descripcion + " [" + String(this.fila) + "," + String(this.columna) + "] \n";
    }
}
exports.Excepcion = Excepcion;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(identificador, tipo, fila, columna, valor) {
        this.indentificador = identificador;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.tipoArreglo = null;
        this.tSt = "";
    }
    getId() {
        return this.indentificador;
    }
    setId(identificador) {
        this.indentificador = identificador;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getTipoArreglo() {
        return this.tipoArreglo;
    }
    setTipoArreglo(tipo) {
        this.tipoArreglo = tipo;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
    setTipoStruct(tipo) {
        this.tSt = tipo;
    }
}
exports.Simbolo = Simbolo;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorLogico = exports.OperadorRelacional = exports.OperadorAritmetico = exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["INT"] = 0] = "INT";
    Tipo[Tipo["DOUBLE"] = 1] = "DOUBLE";
    Tipo[Tipo["BOOL"] = 2] = "BOOL";
    Tipo[Tipo["CHAR"] = 3] = "CHAR";
    Tipo[Tipo["STRING"] = 4] = "STRING";
    Tipo[Tipo["ARRAY"] = 5] = "ARRAY";
    Tipo[Tipo["STRUCT"] = 6] = "STRUCT";
    Tipo[Tipo["NULL"] = 7] = "NULL";
    Tipo[Tipo["VOID"] = 8] = "VOID";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico[OperadorAritmetico["MAS"] = 0] = "MAS";
    OperadorAritmetico[OperadorAritmetico["MENOS"] = 1] = "MENOS";
    OperadorAritmetico[OperadorAritmetico["POR"] = 2] = "POR";
    OperadorAritmetico[OperadorAritmetico["DIV"] = 3] = "DIV";
    OperadorAritmetico[OperadorAritmetico["MOD"] = 4] = "MOD";
    OperadorAritmetico[OperadorAritmetico["UMENOS"] = 5] = "UMENOS";
    OperadorAritmetico[OperadorAritmetico["CONCATENAR"] = 6] = "CONCATENAR";
    OperadorAritmetico[OperadorAritmetico["REPETIR"] = 7] = "REPETIR";
    OperadorAritmetico[OperadorAritmetico["MASMAS"] = 8] = "MASMAS";
    OperadorAritmetico[OperadorAritmetico["MENOSMENOS"] = 9] = "MENOSMENOS";
})(OperadorAritmetico = exports.OperadorAritmetico || (exports.OperadorAritmetico = {}));
var OperadorRelacional;
(function (OperadorRelacional) {
    OperadorRelacional[OperadorRelacional["MENORQUE"] = 0] = "MENORQUE";
    OperadorRelacional[OperadorRelacional["MAYORQUE"] = 1] = "MAYORQUE";
    OperadorRelacional[OperadorRelacional["MENORIGUAL"] = 2] = "MENORIGUAL";
    OperadorRelacional[OperadorRelacional["MAYORIGUAL"] = 3] = "MAYORIGUAL";
    OperadorRelacional[OperadorRelacional["IGUALIGUAL"] = 4] = "IGUALIGUAL";
    OperadorRelacional[OperadorRelacional["DIFERENTE"] = 5] = "DIFERENTE";
})(OperadorRelacional = exports.OperadorRelacional || (exports.OperadorRelacional = {}));
var OperadorLogico;
(function (OperadorLogico) {
    OperadorLogico[OperadorLogico["AND"] = 0] = "AND";
    OperadorLogico[OperadorLogico["OR"] = 1] = "OR";
    OperadorLogico[OperadorLogico["NOT"] = 2] = "NOT";
})(OperadorLogico = exports.OperadorLogico || (exports.OperadorLogico = {}));

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalAux = void 0;
class TemporalAux {
    constructor(identificador, tipo, fila, columna, valor) {
        this.indentificador = identificador;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    getId() {
        return this.indentificador;
    }
    setId(identificador) {
        this.indentificador = identificador;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
}
exports.TemporalAux = TemporalAux;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoAST = void 0;
class NodoAST {
    constructor(valor) {
        this.hijos = [];
        this.valor = valor;
    }
    setHijos(hijos) {
        this.hijos = hijos;
    }
    agregarHijo(valorHijo) {
        this.hijos.push(new NodoAST(valorHijo));
    }
    agregarHijos(hijos) {
        for (let hijo of hijos) {
            this.hijos.push(hijo);
        }
    }
    agregarHijoNodo(hijo) {
        this.hijos.push(hijo);
    }
    agregarPrimerHijo(valorHijo) {
        this.hijos.unshift(new NodoAST(valorHijo));
    }
    agregarPrimerHijoNodo(hijo) {
        this.hijos.unshift(hijo);
    }
    getValor() {
        return String(this.valor);
    }
    setValor(valor) {
        this.valor = valor;
    }
    getHijos() {
        return this.hijos;
    }
}
exports.NodoAST = NodoAST;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoArreglo = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class AccesoArreglo {
    constructor(identificador, expresiones, expInicial, expFinal, fila, columna) {
        this.identificador = identificador;
        this.expresiones = expresiones;
        this.expInicial = expInicial;
        this.expFinal = expFinal;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.NULL;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada.", this.fila, this.columna);
        if (simbolo.getTipo() !== Tipo_1.Tipo.ARRAY)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no es un arreglo.", this.fila, this.columna);
        this.tipo = simbolo.getTipo();
        if (this.expresiones !== null) {
            let listaPos = [];
            for (let expresion of this.expresiones) {
                let temp = expresion.interpretar(tree, table);
                if (temp instanceof Excepcion_1.Excepcion)
                    return temp;
                listaPos.push(temp);
            }
            let value = this.buscarDimensiones(tree, table, listaPos.slice(), simbolo.getValor());
            if (value instanceof Excepcion_1.Excepcion)
                return value;
            this.tipo = simbolo.getTipoArreglo();
            return value;
        }
        else {
            let longitud = simbolo.getValor().length;
            let posInicial = 0;
            let posFinal = longitud;
            if (this.expInicial !== true) {
                posInicial = this.expInicial.interpretar(tree, table);
                if (posInicial < 0)
                    return new Excepcion_1.Excepcion("Semantico", "Posicion inicial menor que cero", this.fila, this.columna);
                if (posInicial >= longitud)
                    return new Excepcion_1.Excepcion("Semantico", "Posicion inicial mayor que la longitud del arreglo", this.fila, this.columna);
            }
            if (this.expFinal !== true) {
                posFinal = this.expFinal.interpretar(tree, table);
                if (posFinal < 0)
                    return new Excepcion_1.Excepcion("Semantico", "Posicion final menor que cero", this.fila, this.columna);
                if (posInicial > longitud)
                    return new Excepcion_1.Excepcion("Semantico", "Posicion final mayor que la longitud del arreglo", this.fila, this.columna);
            }
            // Definir el tipo de dato que estoy retornando (Pense agregar tipo y tipo arreglo (?))
            return simbolo.getValor().slice(posInicial, posFinal);
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("ACCESO ARREGLO");
        nodo.agregarHijo(String(this.identificador));
        let exp = new NodoAST_1.NodoAST("EXPRESIONES DE LAS DIMENSIONES");
        for (let expresion of this.expresiones) {
            exp.agregarHijoNodo(expresion.getNodo());
        }
        nodo.agregarHijoNodo(exp);
        return nodo;
    }
    buscarDimensiones(tree, table, expresiones, arreglo) {
        var value = null;
        if (expresiones.length === 0)
            return arreglo;
        if (!(arreglo instanceof Array))
            return new Excepcion_1.Excepcion("Semantico", "Acceso de mas en el arreglo", this.fila, this.columna);
        let dimension = expresiones.shift();
        try {
            var value = this.buscarDimensiones(tree, table, expresiones.slice(), arreglo[dimension]);
        }
        catch (error) {
            return new Excepcion_1.Excepcion("Semantico", "La posicion dada es negativa o mayor que la dimension del arreglo", this.fila, this.columna);
        }
        return value;
    }
}
exports.AccesoArreglo = AccesoArreglo;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],10:[function(require,module,exports){
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
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, value + "-" + der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack = tree.getValorTablaByIdentificador(der);
                let temporal = tree.generarTemporal();
                let value = tree.getValorPosStack(posStack).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "-" + value);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                let posStackIzq = tree.getValorTablaByIdentificador(izq);
                let temporal = tree.generarTemporal();
                let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                let posStackDer = tree.getValorTablaByIdentificador(der);
                let valueDer = tree.getValorPosStack(posStackDer).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, valueIzq + "-" + valueDer);
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
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, value + "*" + der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack = tree.getValorTablaByIdentificador(der);
                let temporal = tree.generarTemporal();
                let value = tree.getValorPosStack(posStack).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "*" + value);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                let posStackIzq = tree.getValorTablaByIdentificador(izq);
                let temporal = tree.generarTemporal();
                let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                let posStackDer = tree.getValorTablaByIdentificador(der);
                let valueDer = tree.getValorPosStack(posStackDer).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, valueIzq + "*" + valueDer);
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
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, value + "/" + der);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack = tree.getValorTablaByIdentificador(der);
                let temporal = tree.generarTemporal();
                let value = tree.getValorPosStack(posStack).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, izq + "/" + value);
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                let posStackIzq = tree.getValorTablaByIdentificador(izq);
                let temporal = tree.generarTemporal();
                let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                let posStackDer = tree.getValorTablaByIdentificador(der);
                let valueDer = tree.getValorPosStack(posStackDer).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, valueIzq + "/" + valueDer);
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
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + value + "," + der + ")");
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opDerecho.identificador && !this.opIzquierdo.identificador) {
                let posStack = tree.getValorTablaByIdentificador(der);
                let temporal = tree.generarTemporal();
                let value = tree.getValorPosStack(posStack).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + izq + "," + value + ")");
                tree.addTemporalClase(temporalAux);
                return temporal;
            }
            else if (this.opIzquierdo.identificador && this.opDerecho.identificador) {
                let posStackIzq = tree.getValorTablaByIdentificador(izq);
                let temporal = tree.generarTemporal();
                let valueIzq = tree.getValorPosStack(posStackIzq).toString();
                let posStackDer = tree.getValorTablaByIdentificador(der);
                let valueDer = tree.getValorPosStack(posStackDer).toString();
                let temporalAux = new temporalAux_1.TemporalAux(temporal, Tipo_1.Tipo.INT, this.fila, this.columna, "fmod(" + valueIzq + "," + valueDer + ")");
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

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../AST/temporalAux":7,"../Abstract/NodoAST":8}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
class Identificador {
    constructor(identificador, fila, columna) {
        this.identificador = identificador;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        return this.identificador;
    }
    interpretar(tree, table) {
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);
        this.tipo = simbolo.getTipo();
        return simbolo.getValor();
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("IDENTIFICADOR");
        nodo.agregarHijo(String(this.identificador));
        return nodo;
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":4,"../Abstract/NodoAST":8}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Logica {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opIzquierdo = opIzquierdo;
        this.opDerecho = opDerecho;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.BOOL;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
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
        if (this.operador === Tipo_1.OperadorLogico.AND) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                return izq && der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para &&.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorLogico.OR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL && this.opDerecho.tipo === Tipo_1.Tipo.BOOL) {
                return izq || der;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para ||.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorLogico.NOT) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.BOOL) {
                return !izq;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo Erroneo de operando para !.", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de operacion no especificada.", this.fila, this.columna);
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("LOGICA");
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
        if (op === Tipo_1.OperadorLogico.NOT) {
            return "!";
        }
        else if (op === Tipo_1.OperadorLogico.AND) {
            return "&&";
        }
        else if (op === Tipo_1.OperadorLogico.OR) {
            return "||";
        }
    }
}
exports.Logica = Logica;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivos = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Primitivos {
    constructor(tipo, valor, fila, columna) {
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipoArreglo = null;
    }
    traducir(tree, table) {
        if (this.tipo === Tipo_1.Tipo.ARRAY) {
        }
        else {
            return this.valor;
        }
    }
    interpretar(tree, table) {
        if (this.tipo === Tipo_1.Tipo.ARRAY) {
            let valTipo = this.defTipo(this.valor);
            if (valTipo instanceof Excepcion_1.Excepcion)
                return valTipo;
            let val = this.definirArreglo(this.valor, tree, table);
            if (val instanceof Excepcion_1.Excepcion) {
                return val;
            }
            else {
                this.valor = val;
            }
        }
        return this.valor;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("PRIMITIVO");
        nodo.agregarHijo(String(this.valor));
        return nodo;
    }
    defTipo(arreglo) {
        for (let valor of arreglo) {
            if (valor instanceof Array) {
                let result = this.defTipo(valor);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                continue;
            }
            if (this.tipoArreglo === null) {
                this.tipoArreglo = valor.tipo;
            }
            else if (this.tipoArreglo !== valor.tipo) {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato diferentes en arreglo", this.fila, this.columna);
            }
        }
        return null;
    }
    definirArreglo(arreglo, tree, table) {
        let retorno = [];
        for (let valor of arreglo) {
            if (valor instanceof Array) {
                retorno.push(this.definirArreglo(valor, tree, table));
                continue;
            }
            let val = valor.interpretar(tree, table);
            if (val instanceof Excepcion_1.Excepcion)
                return val;
            retorno.push(val);
        }
        return retorno;
    }
}
exports.Primitivos = Primitivos;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],14:[function(require,module,exports){
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

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../AST/temporalAux":7,"../Abstract/NodoAST":8}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const NodoAST_1 = require("../Abstract/NodoAST");
class Asignacion {
    constructor(identificador, expresion, fila, columna) {
        this.identificador = identificador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let valor = this.expresion.traducir(tree, table);
        let texto3d = "";
        let lista = tree.getListaTemporalClase();
        let posStack = tree.getValorTablaByIdentificador(this.identificador);
        let value = tree.getValorPosStack(posStack).toString();
        if (this.expresion.valor) {
            texto3d = tree.generarInstruccion("stack[(int)" + posStack + "] = " + this.expresion.valor);
        }
        else {
            texto3d = tree.generarInstruccion("stack[(int)" + posStack + "] = " + valor);
        }
        tree.limpiartemporalClase();
        console.log(lista + texto3d);
        return "\n//-------------------Asignacion\n" + lista + texto3d;
    }
    interpretar(tree, table) {
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);
        var result;
        if ((simbolo.getTipo() === Tipo_1.Tipo.DOUBLE) && (this.expresion.tipo === Tipo_1.Tipo.INT)) {
            let simboloActualizado = new Simbolo_1.Simbolo(this.identificador, simbolo.getTipo(), this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        else {
            let simboloActualizado = new Simbolo_1.Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("ASIGNACION");
        nodo.agregarHijo(String(this.identificador));
        nodo.agregarHijoNodo(this.expresion.getNodo());
        return nodo;
    }
}
exports.Asignacion = Asignacion;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Abstract/NodoAST":8}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion_atributo = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Asignacion_atributo {
    constructor(identificador, atributo, expresion, fila, columna) {
        this.identificador = identificador;
        this.atributo = atributo;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let entorno = this.identificador.interpretar(tree, table);
        /* console.log('el atributo es:',this.atributo)
        console.log('el dato es ',this.expresion) */
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        if (entorno instanceof Excepcion_1.Excepcion)
            return entorno;
        let simbolo = new Simbolo_1.Simbolo(this.atributo.identificador, this.expresion.tipo, this.fila, this.columna, value);
        let result = entorno.actualizarSimbolo(simbolo);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("ASIGNACION ATRIBUTO STRUCT");
        return nodo;
    }
}
exports.Asignacion_atributo = Asignacion_atributo;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../Abstract/NodoAST":8}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
class Break {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("BREAK");
        return nodo;
    }
}
exports.Break = Break;

},{"../Abstract/NodoAST":8}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Case3d_1 = require("../AST/Case3d");
const NodoAST_1 = require("../Abstract/NodoAST");
class Case {
    constructor(expresion, instrucciones, fila, columna) {
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let valor = this.expresion.traducir(tree, table);
        let ins = this.instrucciones; //.traducir(tree,table);
        let caso = new Case3d_1.Case3d(valor, ins);
        //console.log("el caso a ingresar es: ",caso);
        //tree.addCaso(caso);
        return caso;
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("CASE");
        let condicion = new NodoAST_1.NodoAST("CONDICION CASE");
        condicion.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(condicion);
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES CASE");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Case = Case;

},{"../AST/Case3d":2,"../Abstract/NodoAST":8}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
class Continue {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("CONTINUE");
        return nodo;
    }
}
exports.Continue = Continue;

},{"../Abstract/NodoAST":8}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
const NodoAST_1 = require("../Abstract/NodoAST");
class Declaracion {
    constructor(tipo, identficador, fila, columna, expresion, decArreglo, porRefencia, copia) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.fila = fila;
        this.columna = columna;
        this.expresion = expresion;
        this.decArreglo = decArreglo;
        this.porReferencia = porRefencia;
        this.copia = copia;
    }
    traducir(tree, table) {
        //console.log('la expresion es: ',this.expresion);
        /* console.log('la el tipo: ',this.tipo); */
        if (this.decArreglo === true) {
        }
        else {
            if (this.expresion != null) {
                if (this.tipo === Tipo_1.Tipo.INT || this.tipo === Tipo_1.Tipo.DOUBLE) {
                    if (this.expresion.valor || this.expresion.valor === 0) {
                        //console.log("se fue para int con valor")
                        let value = this.expresion.traducir(tree, table);
                        if (value instanceof Excepcion_1.Excepcion)
                            return value;
                        //let temporal=tree.getUltimoTemporal();
                        let apuntador = tree.getApuntadorStack().toString();
                        let texto3d = tree.generarInstruccion("stack[(int)" + apuntador + "] = " + this.expresion.valor);
                        tree.addStack(this.expresion.valor);
                        let temporalAux = new temporalAux_1.TemporalAux(this.identificador[0], this.tipo, this.fila, this.columna, apuntador);
                        tree.addTabla(temporalAux);
                        let lista = tree.getListaTemporalClase();
                        console.log(texto3d + "\n");
                        return "\n//-------------------------Declaracion\n" + texto3d + "\n";
                    }
                    else {
                        //console.log("se fue para int sen valor")
                        //console.log(tree.getTemporalClase());
                        let ultimoTemporal = this.expresion.traducir(tree, table);
                        if (ultimoTemporal instanceof Excepcion_1.Excepcion)
                            return ultimoTemporal;
                        let temporal = tree.getUltimoTemporal();
                        let apuntador = tree.getApuntadorStack().toString();
                        let texto3d = "";
                        texto3d += tree.generarInstruccion("stack[(int)" + apuntador + "] = " + temporal);
                        /* tree.updateConsola(texto3d);
                        tree.updateConsola("\n"); */
                        //let valorTemporal=tree.getValueByTemporal(temporal);
                        tree.addStack(temporal);
                        let temporalAux = new temporalAux_1.TemporalAux(this.identificador[0], this.tipo, this.fila, this.columna, apuntador);
                        tree.addTabla(temporalAux);
                        //console.log(tree.getListaTemporalClase()+ texto3d);
                        texto3d = "\n//-------------------------Declaracion\n" + tree.getListaTemporalClase() + texto3d;
                        /*  console.log(tree.getTemporalClase());
                         console.log(tree.getStack()); */
                        tree.limpiartemporalClase();
                        console.log(texto3d + "\n");
                        return texto3d + "\n";
                    }
                }
                else if (this.tipo === Tipo_1.Tipo.STRING) {
                    let exp = this.expresion.traducir(tree, table);
                    let temporal = tree.generarTemporal();
                    let texto3d = "\n//-------------------------Declaracion\n" + tree.generarInstruccion(temporal + " = H");
                    let apuntadorHeap = tree.getApuntadorHeap();
                    for (let i = 0; i < exp.length; i++) {
                        const element = exp[i];
                        let value = element.charCodeAt(0);
                        tree.addHeap(value);
                        texto3d += tree.generarInstruccion("heap[(int)H] = " + value);
                        texto3d += tree.generarInstruccion('H = H + 1');
                    }
                    tree.addHeap(-1);
                    texto3d += tree.generarInstruccion("heap[(int)H] = -1");
                    texto3d += tree.generarInstruccion('H = H + 1');
                    let apuntador = tree.getApuntadorStack().toString();
                    texto3d += tree.generarInstruccion("stack[(int)" + apuntador + "] = " + temporal);
                    /* tree.updateConsola(texto3d);
                    tree.updateConsola("\n");
 */
                    tree.addStack(apuntadorHeap);
                    let temporalAux = new temporalAux_1.TemporalAux(this.identificador[0], this.tipo, this.fila, this.columna, apuntadorHeap.toString());
                    tree.addTabla(temporalAux);
                    console.log(texto3d);
                    return texto3d;
                }
            }
            else {
                if (this.tipo === Tipo_1.Tipo.INT || this.tipo === Tipo_1.Tipo.DOUBLE) {
                    let texto3d = "";
                    for (let id of this.identificador) {
                        let apuntador = tree.getApuntadorStack().toString();
                        texto3d += tree.generarInstruccion("stack[(int)" + apuntador + "] = " + 0);
                        tree.addStack(0);
                        let temporalAux = new temporalAux_1.TemporalAux(id, this.tipo, this.fila, this.columna, apuntador);
                        tree.addTabla(temporalAux);
                    }
                    console.log(texto3d + "\n");
                    return "\n//-------------------------Declaracion\n" + texto3d + "\n";
                }
            }
        }
    }
    interpretar(tree, table) {
        if (this.decArreglo === true) {
            if (this.porReferencia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null)
                    return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);
                if (this.tipo !== simbolo.getTipoArreglo())
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);
                simbolo.setId(this.identificador.pop());
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
            else if (this.copia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null)
                    return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);
                if (this.tipo !== simbolo.getTipoArreglo())
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);
                let nuevoSimbolo = new Simbolo_1.Simbolo(this.identificador.pop(), Tipo_1.Tipo.ARRAY, this.fila, this.columna, simbolo.getValor().slice());
                nuevoSimbolo.setTipoArreglo(this.tipo);
                let result = table.agregarSimbolo(nuevoSimbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
            else {
                let value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                if (this.tipo !== this.expresion.tipoArreglo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo del arreglo.", this.fila, this.columna);
                this.tipo = Tipo_1.Tipo.ARRAY;
                let simbolo = new Simbolo_1.Simbolo(this.identificador.pop(), this.tipo, this.fila, this.columna, value);
                simbolo.setTipoArreglo(this.expresion.tipoArreglo);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        else {
            let value = null;
            if (this.expresion !== null) {
                value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (this.tipo === Tipo_1.Tipo.DOUBLE && this.expresion.tipo === Tipo_1.Tipo.INT) {
                }
                else if (this.tipo !== this.expresion.tipo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
            }
            else {
                if ((this.tipo === Tipo_1.Tipo.INT) || (this.tipo === Tipo_1.Tipo.DOUBLE) || (this.tipo === Tipo_1.Tipo.CHAR))
                    value = 0;
                if (this.tipo === Tipo_1.Tipo.BOOL)
                    value = false;
            }
            for (let id of this.identificador) {
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                let simbolo = new Simbolo_1.Simbolo(id, this.tipo, this.fila, this.columna, value);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("DECLARACION");
        for (let id of this.identificador) {
            nodo.agregarHijo(String(id));
        }
        return nodo;
    }
}
exports.Declaracion = Declaracion;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../AST/temporalAux":7,"../Abstract/NodoAST":8}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion_atributo = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Declaracion_atributo {
    constructor(tipo, identficador, fila, columna, expresion) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let value = null;
        if (this.expresion !== null) {
            value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
            if (this.tipo !== this.expresion.tipo)
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
        }
        //for (let id of this.identificador) {
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = new Simbolo_1.Simbolo(this.identificador, this.tipo, this.fila, this.columna, value);
        //console.log('el simbolo a insertar es: ', simbolo);
        let result = table.agregarSimbolo(simbolo);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        //}
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("DECLARACION ATRIBUTO STRUCT");
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijoNodo(this.expresion.getNodo());
        return nodo;
    }
}
exports.Declaracion_atributo = Declaracion_atributo;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../Abstract/NodoAST":8}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Case3d_1 = require("../AST/Case3d");
const NodoAST_1 = require("../Abstract/NodoAST");
class Default {
    constructor(instrucciones, fila, columna) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        //let valor=this.expresion.traducir(tree,table);
        let ins = this.instrucciones; //.traducir(tree,table);
        let caso = new Case3d_1.Case3d('default', ins);
        //console.log("el caso a ingresar es: ",caso);
        //tree.addCaso(caso);
        return caso;
    }
    interpretar(tree, table) {
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("DEFAULT");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES DEFAULT");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Default = Default;

},{"../AST/Case3d":2,"../Abstract/NodoAST":8}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoW = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
class DoW {
    constructor(condicion, instruccionesIf, fila, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let nuevaTabla = new Entorno_1.Entorno(table);
        let texto3dVerdadero = "";
        let instrucion = "";
        //console.log("la condicion es:",this.condicion);
        let cond = this.condicion.traducir(tree, nuevaTabla); //.split("$");
        //let condicion=cond[0];
        let lista = tree.getListaTemporalClase();
        tree.limpiartemporalClase();
        for (let instruccion of this.instruccionesIf) {
            let result = instruccion.traducir(tree, nuevaTabla);
            if (result instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(result);
                tree.updateConsola(result.toString());
            }
            //console.log('la instruccion es: ', result);
            texto3dVerdadero += result;
        }
        instrucion = tree.getDoWhile(cond, texto3dVerdadero);
        console.log(lista + "\n" + instrucion);
        return lista + "\n" + instrucion;
    }
    interpretar(tree, table) {
        do {
            let condicion = this.condicion.interpretar(tree, table);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (this.condicion.tipo === Tipo_1.Tipo.BOOL) {
                if (condicion === true) {
                    let nuevaTabla = new Entorno_1.Entorno(table);
                    for (let instruccion of this.instruccionesIf) {
                        let result = instruccion.interpretar(tree, nuevaTabla);
                        if (result instanceof Break_1.Break) {
                            break;
                        }
                        if (result instanceof Excepcion_1.Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no booleano en condicion While.", this.fila, this.columna);
            }
        } while (true);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("DO WHILE");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES FOR");
        for (let instr of this.instruccionesIf) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.DoW = DoW;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8,"./Break":17}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class For {
    constructor(decAsig, condicion, actualizacion, instrucciones, fila, columna) {
        this.decAsig = decAsig;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let variable = this.decAsig.traducir(tree, table);
        let condicion = this.condicion.traducir(tree, table);
        let lista = tree.getListaTemporalClase();
        let expre = this.actualizacion.traducir(tree, table);
        console.log("la variable es \n", variable);
        console.log("la lista es  \n", lista);
        console.log("la consicion es  \n", condicion);
        console.log("la expresion  es \n", expre);
        let instrucciones = "";
        this.instrucciones.forEach(element => {
            instrucciones += element.traducir(tree, table);
        });
        let temporalRetorno = tree.generarTemporal();
        let temporalEntrada = tree.generarTemporal();
        let temporalSalida = tree.generarTemporal();
        let texto3d = "\n//-------------------FOR\n";
        texto3d += variable;
        texto3d += temporalRetorno + ":\n";
        texto3d += lista;
        texto3d += tree.generarInstruccion("if(" + condicion + ") goto " + temporalEntrada);
        texto3d += tree.generarInstruccion("goto " + temporalSalida);
        texto3d += "\n" + temporalEntrada + ":\n";
        texto3d += instrucciones + "\n";
        texto3d += expre;
        texto3d += tree.generarInstruccion("goto " + temporalRetorno);
        texto3d += "\n" + temporalSalida + ":\n";
        console.log(texto3d);
        return texto3d;
    }
    interpretar(tree, table) {
        let entornoFor = new Entorno_1.Entorno(table);
        let decAsig = this.decAsig.interpretar(tree, entornoFor);
        if (decAsig instanceof Excepcion_1.Excepcion)
            return decAsig;
        while (true) {
            let condicion = this.condicion.interpretar(tree, entornoFor);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (this.condicion.tipo === Tipo_1.Tipo.BOOL) {
                if (condicion === true) {
                    let entornoPasadaFor = new Entorno_1.Entorno(entornoFor);
                    for (let instruccion of this.instrucciones) {
                        let result = instruccion.interpretar(tree, entornoPasadaFor);
                        if (result instanceof Excepcion_1.Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                        if (result instanceof Break_1.Break)
                            return null;
                        if (result instanceof Continue_1.Continue)
                            break;
                        if (result instanceof Return_1.Return)
                            return result;
                    }
                    let actualizacion = this.actualizacion.interpretar(tree, entornoFor);
                    if (actualizacion instanceof Excepcion_1.Excepcion)
                        return actualizacion;
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no booleano en condicion de For", this.fila, this.columna);
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("FOR");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES FOR");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.For = For;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8,"./Break":17,"./Continue":19,"./Return":32}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Return_1 = require("./Return");
class ForIn {
    constructor(variable, expresion, instrucciones, fila, columna) {
        this.variable = variable;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let entornoFor = new Entorno_1.Entorno(table);
        let expresion = this.expresion.interpretar(tree, entornoFor);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let tipo;
        if (this.expresion.tipo === Tipo_1.Tipo.ARRAY) {
            tipo = this.expresion.tipoArreglo;
        }
        else {
            tipo = this.expresion.tipo;
        }
        for (let caracter of expresion) {
            let entornoPasadFor = new Entorno_1.Entorno(entornoFor);
            let simbolo = new Simbolo_1.Simbolo(this.variable, tipo, this.fila, this.columna, caracter);
            let result = entornoPasadFor.agregarSimbolo(simbolo);
            if (result instanceof Excepcion_1.Excepcion)
                return result;
            for (let instruccion of this.instrucciones) {
                let result = instruccion.interpretar(tree, entornoPasadFor);
                if (result instanceof Excepcion_1.Excepcion) {
                    tree.getExcepciones().push(result);
                    tree.updateConsola(result.toString());
                }
                if (result instanceof Break_1.Break)
                    return null;
                if (result instanceof Continue_1.Continue)
                    break;
                if (result instanceof Return_1.Return)
                    return result;
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("FOR IN");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES FOR");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ForIn = ForIn;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Abstract/NodoAST":8,"./Break":17,"./Continue":19,"./Return":32}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
const temporalAux_1 = require("../AST/temporalAux");
const NodoAST_1 = require("../Abstract/NodoAST");
class Funcion {
    constructor(tipo, nombre, parametros, instrucciones, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let texto3d = "\n//-----------------Funcion " + this.nombre + "\n";
        let instrucciones = "";
        let cantidadParametros = this.parametros.length;
        let id = this.nombre;
        let apuntador = tree.getApuntadorStack().toString();
        tree.addStack(0);
        let temporalAux = new temporalAux_1.TemporalAux(id, Tipo_1.Tipo.VOID, this.fila, this.columna, apuntador);
        tree.addTabla(temporalAux);
        this.parametros.forEach(element => {
            if (element["arreglo"] === false) {
                console.log("no es un array");
                //validacion de tipo
                let apuntador = tree.getApuntadorStack().toString();
                //texto3d+=tree.generarInstruccion("stack[(int)"+apuntador+"] = "+0);
                tree.addStack(0);
                let temporalAux = new temporalAux_1.TemporalAux(element["identificador"], this.tipo, this.fila, this.columna, apuntador);
                tree.addTabla(temporalAux);
            }
            else {
                console.log("SI es un array");
            }
        });
        for (let instruccion of this.instrucciones) {
            let value = instruccion.traducir(tree, table);
            instrucciones += value;
        }
        texto3d += "\nvoid " + id + "(){\n" + instrucciones + "\n}\n";
        console.log(texto3d);
        tree.addFuncion3D(texto3d);
    }
    interpretar(tree, table) {
        let entornoFuncion = new Entorno_1.Entorno(table);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoFuncion);
            if (value instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
            if (value instanceof Return_1.Return) {
                return value.result;
            }
        }
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("FUNCION");
        nodo.agregarHijo(this.valorTipo(this.tipo));
        nodo.agregarHijo(this.nombre);
        let parametros = new NodoAST_1.NodoAST("PARAMETROS");
        for (let param of this.parametros) {
            let parametro = new NodoAST_1.NodoAST("PARAMETRO");
            parametro.agregarHijo(this.valorTipo(param['tipo']));
            parametro.agregarHijo(param['identificador']);
            parametros.agregarHijoNodo(parametro);
        }
        nodo.agregarHijoNodo(parametros);
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
    valorTipo(valor) {
        if (valor === Tipo_1.Tipo.INT) {
            return "int";
        }
        else if (valor === Tipo_1.Tipo.DOUBLE) {
            return "double";
        }
        else if (valor === Tipo_1.Tipo.BOOL) {
            return "boolean";
        }
        else if (valor === Tipo_1.Tipo.CHAR) {
            return "char";
        }
        else if (valor === Tipo_1.Tipo.STRING) {
            return "String";
        }
        else if (valor === Tipo_1.Tipo.ARRAY) {
            return "array";
        }
        else if (valor === Tipo_1.Tipo.VOID) {
            return "void";
        }
    }
}
exports.Funcion = Funcion;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"../AST/temporalAux":7,"../Abstract/NodoAST":8,"./Return":32}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
class If {
    constructor(condicion, instruccionesIf, instruccionesElse, elseIf, fila, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
        this.elseIf = elseIf;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        //sconsole.log('el true es',this.instruccionesIf.traducir(tree,table));
        let nuevaTabla = new Entorno_1.Entorno(table);
        let texto3dVerdadero = "";
        let textoFalso = "";
        let instrucion = "";
        //console.log("la condicion es:",this.condicion);
        let cond = this.condicion.traducir(tree, nuevaTabla); //.split("$");
        //let condicion=cond[0];
        let lista = tree.getListaTemporalClase();
        tree.limpiartemporalClase();
        for (let instruccion of this.instruccionesIf) {
            let result = instruccion.traducir(tree, nuevaTabla);
            if (result instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(result);
                //tree.updateConsola(result.toString());
            }
            if (result instanceof Return_1.Return) {
                return result;
            }
            //console.log('la instruccion es: ', result);
            texto3dVerdadero += result;
        }
        if (this.instruccionesElse) {
            for (let instruccion of this.instruccionesElse) {
                let result = instruccion.traducir(tree, nuevaTabla);
                if (result instanceof Excepcion_1.Excepcion) {
                    tree.getExcepciones().push(result);
                    //tree.updateConsola(result.toString());
                }
                if (result instanceof Return_1.Return) {
                    return result;
                }
                //console.log('la instruccion es: ', result);
                textoFalso += result;
            }
        }
        instrucion = tree.getIf(cond, texto3dVerdadero, textoFalso);
        if (this.elseIf) {
            instrucion += this.elseIf.traducir(tree, table);
        }
        /* if (this.elseIf==null) {
            instrucion=tree.getIf(cond,texto3dVerdadero,textoFalso);
        }else{
            console.log('el else if es: ',this.elseIf);
            console.log('la traducion es: ',this.elseIf.traducir(tree,table))

        } */
        console.log(lista + "\n" + instrucion);
        return lista + "\n" + instrucion;
        //console.log('la lista de instrucciones es: ',texto3dVerdadero);
    }
    interpretar(tree, table) {
        let condicionIf = this.condicion.interpretar(tree, table);
        if (condicionIf instanceof Excepcion_1.Excepcion)
            return condicionIf;
        if (this.condicion.tipo === Tipo_1.Tipo.BOOL) {
            // console.log("Condicion - " + condicionIf)
            if (condicionIf === true) {
                //console.log("Entrando a if")
                let nuevaTabla = new Entorno_1.Entorno(table);
                for (let instruccion of this.instruccionesIf) {
                    let result = instruccion.interpretar(tree, nuevaTabla);
                    if (result instanceof Excepcion_1.Excepcion) {
                        tree.getExcepciones().push(result);
                        tree.updateConsola(result.toString());
                    }
                    if (result instanceof Return_1.Return) {
                        return result;
                    }
                }
            }
            else {
                if (this.instruccionesElse !== null) {
                    //console.log("Entrando a Else")
                    let nuevaTabla = new Entorno_1.Entorno(table);
                    for (let instruccion of this.instruccionesElse) {
                        let result = instruccion.interpretar(tree, nuevaTabla);
                        if (result instanceof Excepcion_1.Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                        if (result instanceof Return_1.Return) {
                            return result;
                        }
                    }
                }
                else if (this.elseIf !== null) {
                    //console.log("Entrando a else if")
                    let result = this.elseIf.interpretar(tree, table);
                    if (result instanceof Excepcion_1.Excepcion)
                        return result;
                    if (result instanceof Return_1.Return)
                        return result;
                }
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no booleano en condicion If.", this.fila, this.columna);
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("IF");
        let instruccionesIf = new NodoAST_1.NodoAST("INSTRUCCIONES IF");
        for (let instr of this.instruccionesIf) {
            instruccionesIf.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instruccionesIf);
        if (this.instruccionesElse !== null) {
            let instruccionesElse = new NodoAST_1.NodoAST("INSTRUCCIONES ELSE");
            for (let instr of this.instruccionesElse) {
                instruccionesElse.agregarHijoNodo(instr.getNodo());
            }
            nodo.agregarHijoNodo(instruccionesElse);
        }
        else if (this.elseIf !== null) {
            nodo.agregarHijoNodo(this.elseIf.getNodo());
        }
        return nodo;
    }
}
exports.If = If;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8,"./Return":32}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imprimir = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Imprimir {
    constructor(salto, expresion, fila, columna) {
        this.salto = salto;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.atributo = null;
    }
    traducir(tree, table) {
        //console.log('la tabla tiene: ', tree.getTemporalClase());
        let textoFinal = "";
        for (let imprimir of this.expresion) {
            if (imprimir['acceso'] === null) {
                //console.log('imprimir lleva: ',imprimir['expresion'].identificador);
                //console.log("la tabal tiene:",tree.getTabla());
                console.log("la impresion lleva: ", imprimir['expresion']);
                let tipo = tree.getTipoTablaByIdentificador(imprimir['expresion'].identificador);
                if (tipo === Tipo_1.Tipo.INT || tipo === Tipo_1.Tipo.DOUBLE) {
                    let value = tree.getValorTablaByIdentificador(imprimir['expresion'].identificador);
                    //console.log('el valor es: ',value);
                    let nuevoTemporal = tree.generarTemporal();
                    let texto3d = tree.generarInstruccion(nuevoTemporal + " = stack[(int)" + value + "]");
                    texto3d += tree.generarInstruccion("printf(\"%f\", (double)" + nuevoTemporal + ")");
                    texto3d += tree.generarInstruccion("printf(\"%c\", (char)10)");
                    textoFinal = "\n" + texto3d + "\n";
                    /* tree.updateConsola(texto3d);
                    tree.updateConsola("\n"); */
                    //console.log(texto3d+"\n");
                    //return texto3d+"\n"
                }
                else if (tipo === Tipo_1.Tipo.STRING) {
                    console.log("Stack", tree.getStack());
                    console.log("heap", tree.getHeap());
                    let texto3d = tree.getPrintString(imprimir['expresion'].identificador);
                    //console.log(texto3d+"\n");
                    textoFinal = texto3d + "\n";
                }
                else {
                    /* let izq=imprimir['expresion'].opIzquierdo.traducir(tree,table);
                    let der=imprimir['expresion'].opDerecho.traducir(tree,table);
                    console.log(lista+"\n"+izq+"\n"+der) */
                    let expre = imprimir['expresion'].traducir(tree, table);
                    let lista = tree.getListaTemporalClase();
                    let texto3d = "printf(\"%f\", (double)" + expre + ");\nprintf(\"%c\", (char)10);\n";
                    //console.log(lista+"\n"+texto3d);
                    textoFinal = lista + "\n" + texto3d;
                }
            }
            else {
            }
        }
        console.log(textoFinal);
        return textoFinal;
    }
    interpretar(tree, table) {
        let cadena = "";
        for (let imprimir of this.expresion) {
            if (imprimir['acceso'] === null) {
                let value = imprimir['expresion'].interpretar(tree, table);
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                // Agregar ciclo interpretar
                if (imprimir['expresion'].tipo === Tipo_1.Tipo.ARRAY) {
                    cadena += "[" + value + "]";
                }
                else if (imprimir['expresion'].tipo === Tipo_1.Tipo.STRUCT) {
                    let consolidado = "";
                    let tipo = "";
                    let contador = 0;
                    //console.log('el valor es --->',value);
                    /*console.log('la tabla  es ',value.tabla); */
                    const propertyValues = Object.values(value.tabla);
                    //console.log('el array es ',propertyValues);
                    let aux = propertyValues[0];
                    tipo = aux.tSt;
                    propertyValues.forEach(element => {
                        //console.log('el elemeno es: ', element)
                        const propertyValues2 = Object.values(element);
                        //console.log('el p2 es ',propertyValues2);
                        if (contador == 0) {
                            consolidado += propertyValues2[4];
                        }
                        else {
                            consolidado += "," + propertyValues2[4];
                        }
                        contador++;
                    });
                    //console.log('el consolidado es: '+tipo+consolidado);
                    cadena += tipo + "(" + consolidado + ")";
                    //let result = new VerStruct(this.expresion.identificador,null,this.fila,this.columna)
                }
                else {
                    cadena += value;
                }
                //console.log('el valor es:',value);
            }
            else {
                let value = imprimir['expresion'].interpretar(tree, table);
                if (imprimir['expresion'].tipo === Tipo_1.Tipo.STRUCT) {
                    let consolidado = "";
                    //console.log('el valor es --->',value);
                    //console.log('la tabla  es ',value.tabla); 
                    const propertyValues = Object.values(value.tabla);
                    //console.log('el array es ',propertyValues);
                    propertyValues.forEach(element => {
                        //console.log('el elemeno es: ', element)
                        const propertyValues2 = Object.values(element);
                        //console.log('el p2 es ',propertyValues2);
                        if (propertyValues2[0] == imprimir['acceso'].identificador) {
                            value = propertyValues2[4];
                        }
                        else {
                        }
                    });
                    cadena += value;
                    //console.log('el consolidado es: '+tipo+consolidado);
                    //value=tipo+"("+consolidado+")"
                    //let result = new VerStruct(this.expresion.identificador,null,this.fila,this.columna)
                }
            }
        }
        tree.updateConsola(cadena);
        if (this.salto === true)
            tree.updateConsola('\n');
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("IMPIRMIR");
        let instrucciones = new NodoAST_1.NodoAST("EXPRESIONES ");
        // for(let instr of this.expresion){
        //     instrucciones.agregarHijoNodo(instr.getNodo());
        // }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Imprimir = Imprimir;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Llamada {
    constructor(nombre, parametros, fila, columna) {
        this.tipo = Tipo_1.Tipo.NULL;
        this.nombre = nombre;
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        console.log("la tabla es: ", tree.getTabla());
        console.log("el stak es ", tree.getStack());
        let posApuntador = tree.getValorTablaByIdentificador(this.nombre);
        console.log("la pos es: ", posApuntador);
        let texto3d = "";
        texto3d += tree.generarInstruccion("P = 1 +" + posApuntador);
        this.parametros.forEach(element => {
            let variable = element.traducir(tree, table);
            let posAux = tree.getValorTablaByIdentificador(variable);
            let valorStack = tree.getValorPosStack(posAux);
            let temporal = tree.generarTemporal();
            texto3d += tree.generarInstruccion(temporal + " = P");
            texto3d += tree.generarInstruccion("P = P + 1");
            texto3d += tree.generarInstruccion("stack[(int)" + temporal + "] = " + valorStack);
        });
        texto3d += tree.generarInstruccion(this.nombre + "()") + "\n";
        let lista = tree.getListaFunciones3D();
        console.log(lista + "\n" + texto3d);
        return "\n//------------llamado de funion " + this.nombre + "\n" + texto3d;
    }
    interpretar(tree, table) {
        let result = tree.getFuncion(this.nombre);
        if (result === null)
            return new Excepcion_1.Excepcion("Semantico", "No se encontro la funcion: " + this.nombre, this.fila, this.columna);
        let nuevaTabla = new Entorno_1.Entorno(tree.getTSglobal());
        if (result.parametros.length === this.parametros.length) {
            let contador = 0;
            for (let parametro of this.parametros) {
                let resultParametro = parametro.interpretar(tree, table);
                if (resultParametro instanceof Excepcion_1.Excepcion)
                    return resultParametro;
                if (result.parametros[contador]['arreglo'] === true) {
                    let simbolo = new Simbolo_1.Simbolo(result.parametros[contador]['identificador'], Tipo_1.Tipo.ARRAY, this.fila, this.columna, resultParametro);
                    simbolo.setTipoArreglo(result.parametros[contador]['tipo']);
                    let resultTabla = nuevaTabla.agregarSimbolo(simbolo);
                    if (resultTabla instanceof Excepcion_1.Excepcion)
                        return resultTabla;
                }
                else if (result.parametros[contador]['tipo'] === parametro.tipo) {
                    let simbolo = new Simbolo_1.Simbolo(result.parametros[contador]['identificador'], result.parametros[contador]['tipo'], this.fila, this.columna, resultParametro);
                    let resultTabla = nuevaTabla.agregarSimbolo(simbolo);
                    if (resultTabla instanceof Excepcion_1.Excepcion)
                        return resultTabla;
                }
                else {
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato diferente en Parametros", this.fila, this.columna);
                }
                contador += 1;
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Cantidad de parametros incorrecta", this.fila, this.columna);
        }
        let value = result.interpretar(tree, nuevaTabla);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        this.tipo = result.tipo;
        return value;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("LLAMADA A FUNCION");
        nodo.agregarHijo(this.nombre);
        let instrucciones = new NodoAST_1.NodoAST("PARAMETROS");
        for (let param of this.parametros) {
            instrucciones.agregarHijoNodo(param.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Llamada = Llamada;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Abstract/NodoAST":8}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
class Main {
    constructor(instrucciones, fila, columna) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let entornoMain = new Entorno_1.Entorno(table);
        for (let instruccion of this.instrucciones) {
            let value = instruccion.interpretar(tree, entornoMain);
            if (value instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(value);
                tree.updateConsola(value.toString());
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("MAIN");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES ");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Main = Main;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../Abstract/NodoAST":8}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarArreglo = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ModificarArreglo {
    constructor(identificador, expresiones, valor, fila, columna) {
        this.identificador = identificador;
        this.expresiones = expresiones;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let value = this.valor.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada.", this.fila, this.columna);
        if (simbolo.getTipo() !== Tipo_1.Tipo.ARRAY)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no es un arreglo.", this.fila, this.columna);
        if (simbolo.getTipoArreglo() !== this.valor.tipo)
            return new Excepcion_1.Excepcion("Semantico", "Tipo de dato a asignar difente al tipo del arreglo", this.fila, this.columna);
        let listaPos = [];
        for (let expresion of this.expresiones) {
            let temp = expresion.interpretar(tree, table);
            if (temp instanceof Excepcion_1.Excepcion)
                return temp;
            listaPos.push(temp);
        }
        let interpretar = !(String(typeof value) === "number") && !(String(typeof value) === "string") && !(String(typeof value) === "boolean") && !(value instanceof Array);
        while (interpretar) {
            value = value.interpretar(tree, table);
            if (value instanceof Excepcion_1.Excepcion)
                return value;
            interpretar = !(String(typeof value) === "number") && !(String(typeof value) === "string") && !(String(typeof value) === "boolean") && !(value instanceof Array);
        }
        let val = this.modificarDimensiones(tree, table, listaPos.slice(), simbolo.getValor(), value);
        if (val instanceof Excepcion_1.Excepcion)
            return val;
        return val;
    }
    modificarDimensiones(tree, table, expresiones, arreglo, valor) {
        if (expresiones.length === 0) {
            if (arreglo instanceof Array)
                return new Excepcion_1.Excepcion("Semantico", "Modificacion a Arreglo incompleta", this.fila, this.columna);
            return valor;
        }
        if (!(arreglo instanceof Array))
            return new Excepcion_1.Excepcion("Semantico", "Acceso de mas al Arreglo", this.fila, this.columna);
        let dimension = expresiones.shift();
        try {
            var value = this.modificarDimensiones(tree, table, expresiones.slice(), arreglo[dimension], valor);
        }
        catch (error) {
            return new Excepcion_1.Excepcion("Semantico", "La posicion dada es negativa o mayor que la dimension del arreglo", this.fila, this.columna);
        }
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        if (value !== null)
            arreglo[dimension] = value;
        return null;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("MODIFICAR ARREGLO");
        nodo.agregarHijo(String(this.identificador));
        let exp = new NodoAST_1.NodoAST("EXPRESIONES DE LAS DIMENSIONES");
        for (let expresion of this.expresiones) {
            exp.agregarHijoNodo(expresion.getNodo());
        }
        nodo.agregarHijoNodo(exp);
        let val = new NodoAST_1.NodoAST("VALOR A ASIGNAR");
        val.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(val);
        return nodo;
    }
}
exports.ModificarArreglo = ModificarArreglo;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Return {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        if (this.expresion !== null) {
            let result = this.expresion.interpretar(tree, table);
            if (result instanceof Excepcion_1.Excepcion)
                return result;
            this.tipo = this.expresion.tipo;
            this.result = result;
            return this;
        }
        else {
            this.tipo = Tipo_1.Tipo.VOID;
            this.result = null;
            return this;
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("RETURN");
        if (this.expresion !== null) {
            nodo.agregarHijoNodo(this.expresion.getNodo());
        }
        return nodo;
    }
}
exports.Return = Return;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Break_1 = require("./Break");
const Return_1 = require("./Return");
class Switch {
    constructor(expresion, cases, porDefecto, fila, columna) {
        this.expresion = expresion;
        this.cases = cases;
        this.porDefecto = porDefecto;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        let variable = this.expresion.traducir(tree, table);
        console.log("la tabla tiene: ", tree.getTabla());
        let posStack = tree.getValorTablaByIdentificador(variable);
        let temporal = tree.generarTemporal();
        let etiquetaSalida = tree.generarEtiquetas();
        let texto3d = "\n//-----------------switch\n";
        texto3d += tree.generarInstruccion(temporal + " = stack[(int)" + posStack + "]");
        let etiquetaDefault;
        for (let k = 0; k < this.cases.length; k++) {
            const caso = this.cases[k];
            let expresionCaso = caso.traducir(tree, table);
            let etiquetainstruccion = tree.generarEtiquetas();
            let etiquetaSalidaAux = tree.generarEtiquetas();
            etiquetaDefault = etiquetaSalidaAux;
            //console.log("el caso es: ",expresionCaso)
            //console.log("el id es ",expresionCaso.identificador);            
            texto3d += tree.generarInstruccion("if(" + temporal + "==" + expresionCaso.identificador + ") goto " + etiquetainstruccion);
            texto3d += tree.generarInstruccion("goto " + etiquetaSalidaAux);
            texto3d += "\n" + etiquetainstruccion + ":\n";
            for (let i = 0; i < expresionCaso.instrucciones.length; i++) {
                const element = expresionCaso.instrucciones[i];
                //console.log('las intrucciones del caso son: ',element.traducir(tree,table));
                texto3d += element.traducir(tree, table);
            }
            texto3d += tree.generarInstruccion("goto " + etiquetaSalida);
            if (this.cases[k + 1]) {
                //let temporalSiguiente=tree.generarEtiquetas();
                texto3d += "\n" + etiquetaSalidaAux + ":";
            }
        }
        texto3d += "\n" + etiquetaDefault + ":\n";
        for (let i = 0; i < this.porDefecto.instrucciones.length; i++) {
            const element = this.porDefecto.instrucciones[i];
            texto3d += element.traducir(tree, table);
        }
        texto3d += "\n" + etiquetaSalida + ":\n";
        console.log(texto3d);
        return texto3d;
    }
    interpretar(tree, table) {
        let condicion = this.expresion.interpretar(tree, table);
        if (condicion instanceof Excepcion_1.Excepcion)
            return condicion;
        let cumple = false;
        if (this.cases !== null) {
            for (let caso of this.cases) {
                let expresionCaso = caso.expresion.interpretar(tree, table);
                if (expresionCaso instanceof Excepcion_1.Excepcion) {
                    tree.getExcepciones().push(expresionCaso);
                    tree.updateConsola(expresionCaso.toString());
                    continue;
                }
                if (this.expresion.tipo === caso.expresion.tipo) {
                    if (condicion === expresionCaso) {
                        let nuevaTabla = new Entorno_1.Entorno(table);
                        for (let instruccion of caso.instrucciones) {
                            let result = instruccion.interpretar(tree, nuevaTabla);
                            if (result instanceof Excepcion_1.Excepcion) {
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }
                            cumple = true;
                            if (result instanceof Break_1.Break) {
                                return null;
                            }
                            if (result instanceof Return_1.Return) {
                                return result;
                            }
                        }
                    }
                    else if (cumple) {
                        let nuevaTabla = new Entorno_1.Entorno(table);
                        for (let instruccion of caso.instrucciones) {
                            let result = instruccion.interpretar(tree, nuevaTabla);
                            if (result instanceof Excepcion_1.Excepcion) {
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }
                            if (result instanceof Break_1.Break) {
                                return null;
                            }
                            if (result instanceof Return_1.Return) {
                                return result;
                            }
                        }
                    }
                }
            }
        }
        if (this.porDefecto !== null) {
            let nuevaTabla = new Entorno_1.Entorno(table);
            for (let instruccion of this.porDefecto.instrucciones) {
                let result = instruccion.interpretar(tree, nuevaTabla);
                if (result instanceof Excepcion_1.Excepcion) {
                    tree.getExcepciones().push(result);
                    tree.updateConsola(result.toString());
                }
                if (result instanceof Break_1.Break)
                    return null;
                if (result instanceof Return_1.Return) {
                    return result;
                }
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("SWITCH");
        if (this.cases !== null) {
            for (let instr of this.cases) {
                nodo.agregarHijoNodo(instr.getNodo());
            }
        }
        if (this.porDefecto !== null) {
            nodo.agregarHijoNodo(this.porDefecto.getNodo());
        }
        return nodo;
    }
}
exports.Switch = Switch;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../Abstract/NodoAST":8,"./Break":17,"./Return":32}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inc_dec = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Simbolo_1 = require("../AST/Simbolo");
const NodoAST_1 = require("../Abstract/NodoAST");
class inc_dec {
    constructor(operador, expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.operador = operador;
        this.tipo = null;
    }
    traducir(tree, table) {
        console.log(tree.getTabla());
        if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
            let valor = this.expresion.traducir(tree, table);
            let texto3d = "";
            let posStack = tree.getValorTablaByIdentificador(valor);
            let temporal = tree.generarTemporal();
            texto3d += tree.generarInstruccion(temporal + " = stack[(int)" + posStack + "]");
            let temporalMas = tree.generarTemporal();
            texto3d += tree.generarInstruccion(temporalMas + " = " + temporal + " + 1");
            texto3d += tree.generarInstruccion("stack[(int)" + posStack + "] = " + temporalMas);
            console.log(texto3d);
            return texto3d;
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.MENOS) {
            let valor = this.expresion.traducir(tree, table);
            let texto3d = "";
            let posStack = tree.getValorTablaByIdentificador(valor);
            let temporal = tree.generarTemporal();
            texto3d += tree.generarInstruccion(temporal + " = stack[(int)" + posStack + "]");
            let temporalMas = tree.generarTemporal();
            texto3d += tree.generarInstruccion(temporalMas + " = " + temporal + " - 1");
            texto3d += tree.generarInstruccion("stack[(int)" + posStack + "] = " + temporalMas);
            console.log(texto3d);
            return texto3d;
        }
    }
    interpretar(tree, table) {
        let id = this.expresion.interpretar(tree, table);
        if (id instanceof Excepcion_1.Excepcion)
            return id;
        if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
            if (this.expresion.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = Number(id) + 1;
                let simbolo = new Simbolo_1.Simbolo(this.expresion.identificador, this.expresion.tipo, this.fila, this.columna, aux);
                let result = table.actualizarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                return aux;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no INT en Incremento.", this.fila, this.columna);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.MENOS) {
            if (this.expresion.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.INT;
                var aux = Number(id) - 1;
                let simbolo = new Simbolo_1.Simbolo(this.expresion.identificador, this.expresion.tipo, this.fila, this.columna, aux);
                let result = table.actualizarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
                return aux;
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no INT en Decremento.", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo erroneo de operador en Incremento/Decremento.", this.fila, this.columna);
        }
    }
    getNodo() {
        let nodo;
        if (this.operador === Tipo_1.OperadorAritmetico.MAS) {
            nodo = new NodoAST_1.NodoAST("INCREMENTO");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo("++");
        }
        else {
            nodo = new NodoAST_1.NodoAST("Decremento");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo("--");
        }
        return nodo;
    }
}
exports.inc_dec = inc_dec;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Abstract/NodoAST":8}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada_struct = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
class Llamada_struct {
    constructor(tipo1, identficador, tipo2, expresion, fila, columna) {
        this.tipo1 = tipo1;
        this.identificador = identficador;
        this.tipo2 = tipo2;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        //console.log('el identificador es ', this.identificador)
        //let id = this.identificador.interpretar(tree, table);
        //if (id instanceof Excepcion) return id;
        //console.log('el ide es. ', id);
        //tree.mostrarStruct();
        //console.log('el tipo es ', this.tipo1)
        let nuevaTabla = new Entorno_1.Entorno(table);
        if (this.tipo1 == this.tipo2) {
            //let structAux:any;
            let structAux = tree.getStrut(this.tipo1);
            //console.log('struc: ',structAux);
            if (structAux.identificador == this.tipo1) {
                /* console.log('las expresiones del struct son: ',structAux.expresion[0]); */
                //console.log('las entradas son: ',this.expresion[0]) 
                if (this.expresion[0].length == structAux.expresion[0].length) {
                    for (let i = 0; i < this.expresion[0].length; i++) {
                        const element = this.expresion[0][i];
                        //console.log('el elemento a ingresar es: ',element);
                        /* console.log('el atributo es: ',element.tipo);
                        console.log('la entrada es: ',structAux.expresion[0][i].tipo) */
                        if (element.tipo === Tipo_1.Tipo.NULL) {
                            let result = element.interpretar(tree, nuevaTabla);
                            // console.log('el elemento extraido es ', result);
                            if (result instanceof Excepcion_1.Excepcion) {
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }
                            let simbolo = new Simbolo_1.Simbolo(structAux.expresion[0][i].identificador, structAux.expresion[0][i].tipo, this.fila, this.columna, result);
                            simbolo.setTipoStruct(this.tipo1);
                            //console.log('el simbolo a insertar es: ', simbolo);
                            let resultAux = nuevaTabla.agregarSimbolo(simbolo);
                            // if (resultAux instanceof Excepcion) return result;
                        }
                        else if (element.tipo == structAux.expresion[0][i].tipo) {
                            let result = element.interpretar(tree, nuevaTabla);
                            // console.log('el elemento extraido es ', result);
                            if (result instanceof Excepcion_1.Excepcion) {
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }
                            let simbolo = new Simbolo_1.Simbolo(structAux.expresion[0][i].identificador, element.tipo, this.fila, this.columna, result);
                            simbolo.setTipoStruct(this.tipo1);
                            //console.log('el simbolo a insertar es: ', simbolo);
                            let resultAux = nuevaTabla.agregarSimbolo(simbolo);
                            // if (resultAux instanceof Excepcion) return result;
                        }
                        else {
                            return new Excepcion_1.Excepcion("Semantico", "Incompatibilidad de tipos en struct +", this.fila, this.columna);
                        }
                    }
                    let simbolo = new Simbolo_1.Simbolo(this.identificador, Tipo_1.Tipo.STRUCT, this.fila, this.columna, nuevaTabla);
                    let result = table.agregarSimbolo(simbolo);
                    return result;
                    //if (result instanceof Excepcion) return result;
                }
                else {
                    return new Excepcion_1.Excepcion("Semantico", "Cantidad erronea de parametros en struct +", this.fila, this.columna);
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "No existe struct +", this.fila, this.columna);
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipos de datos no coinciden  en struct +", this.fila, this.columna);
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("LLAMADA STRUCT");
        let instrucciones = new NodoAST_1.NodoAST("STRUCT ");
        instrucciones.agregarHijo(this.identificador);
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Llamada_struct = Llamada_struct;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../Abstract/NodoAST":8}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
class Struct {
    constructor(tipo, identficador, fila, columna, expresion, tipoStruct) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipoStruct = tipoStruct;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let value = null;
        /*if (this.expresion !== null) {
            value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
            if (this.tipo !== this.expresion.tipo) return new Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
        }*/
        //console.log('la expresion es: ',this.expresion[0]);
        let nuevaTabla = new Entorno_1.Entorno(table);
        for (let id of this.expresion[0]) {
            //if (value instanceof Excepcion) return value;
            /* console.log('el id es',id);
            let arr:any = Array.from(id); */
            //let aux:any=[id];
            let result = id.interpretar(tree, nuevaTabla);
            //console.log('el valor es:', result)
            if (result instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(result);
                tree.updateConsola(result.toString());
            }
        }
        tree.getStructs().push(this);
        //tree.mostrarStruct();
        //ast.getStrut('test');et
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("STRUCT");
        return nodo;
    }
}
exports.Struct = Struct;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../Abstract/NodoAST":8}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Break_1 = require("./Break");
class While {
    constructor(condicion, instruccionesIf, fila, columna) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        //sconsole.log('el true es',this.instruccionesIf.traducir(tree,table));
        let nuevaTabla = new Entorno_1.Entorno(table);
        let texto3dVerdadero = "";
        let textoFalso = "";
        let instrucion = "";
        //console.log("la condicion es:",this.condicion);
        let cond = this.condicion.traducir(tree, nuevaTabla); //.split("$");
        //let condicion=cond[0];
        let lista = tree.getListaTemporalClase();
        tree.limpiartemporalClase();
        for (let instruccion of this.instruccionesIf) {
            let result = instruccion.traducir(tree, nuevaTabla);
            if (result instanceof Excepcion_1.Excepcion) {
                tree.getExcepciones().push(result);
                tree.updateConsola(result.toString());
            }
            //console.log('la instruccion es: ', result);
            texto3dVerdadero += result;
        }
        instrucion = tree.getWhile(cond, texto3dVerdadero);
        console.log(lista + "\n" + instrucion);
        return lista + "\n" + instrucion;
    }
    interpretar(tree, table) {
        while (true) {
            let condicion = this.condicion.interpretar(tree, table);
            if (condicion instanceof Excepcion_1.Excepcion)
                return condicion;
            if (this.condicion.tipo === Tipo_1.Tipo.BOOL) {
                if (condicion === true) {
                    let nuevaTabla = new Entorno_1.Entorno(table);
                    for (let instruccion of this.instruccionesIf) {
                        let result = instruccion.interpretar(tree, nuevaTabla);
                        if (result instanceof Break_1.Break) {
                            break;
                        }
                        if (result instanceof Excepcion_1.Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                    }
                }
                else {
                    break;
                }
            }
            else {
                return new Excepcion_1.Excepcion("Semantico", "Tipo de dato no booleano en condicion While.", this.fila, this.columna);
            }
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("WHILE");
        let instrucciones = new NodoAST_1.NodoAST("INSTRUCCIONES ");
        for (let instr of this.instruccionesIf) {
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.While = While;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8,"./Break":17}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caracter = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Caracter {
    constructor(expresion, posicion, fila, columna) {
        this.expresion = expresion;
        this.posicion = posicion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.CHAR;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let posicion = this.posicion.interpretar(tree, table);
        if (posicion instanceof Excepcion_1.Excepcion)
            return posicion;
        return expresion[posicion];
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("CARACTER OF POSITION");
        let exp = new NodoAST_1.NodoAST("EXPRESION");
        exp.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(exp);
        let pos = new NodoAST_1.NodoAST("POSICION");
        pos.agregarHijoNodo(this.posicion.getNodo());
        nodo.agregarHijo(pos);
        return nodo;
    }
}
exports.Caracter = Caracter;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coseno = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Coseno {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return Math.cos(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("COSENO");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Coseno = Coseno;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Length {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        return expresion.length;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("LENGTH");
        let instrucciones = new NodoAST_1.NodoAST("EXPRESION");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Length = Length;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Log {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return Math.log10(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("LOG10");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Log = Log;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Parse {
    constructor(tipo, expresion, fila, columna) {
        this.tipo = tipo;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        if (this.tipo === Tipo_1.Tipo.DOUBLE) {
            return parseFloat(expresion);
        }
        else if (this.tipo === Tipo_1.Tipo.INT) {
            return Number(expresion);
        }
        else if (this.tipo === Tipo_1.Tipo.BOOL) {
            return expresion === '1';
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de dato en Parse no es int, double o boolean", this.fila, this.columna);
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("PARSE");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Parse = Parse;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
class Pop {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.identificador;
        let simbolo = table.getTabla(expresion);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + expresion + " no encontrada", this.fila, this.columna);
        let val = simbolo.getValor();
        if (!(val instanceof Array))
            return new Excepcion_1.Excepcion("Semantico", "Variable " + expresion + " no es un arreglo", this.fila, this.columna);
        this.tipo = simbolo.getTipoArreglo();
        return val.pop();
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("POP");
        let instrucciones = new NodoAST_1.NodoAST("ARREGLO");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Pop = Pop;

},{"../AST/Excepcion":4,"../Abstract/NodoAST":8}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pow = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Pow {
    constructor(base, exponente, fila, columna) {
        this.base = base;
        this.exponente = exponente;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let base = this.base.interpretar(tree, table);
        if (base instanceof Excepcion_1.Excepcion)
            return base;
        let exponente = this.exponente.interpretar(tree, table);
        if (exponente instanceof Excepcion_1.Excepcion)
            return exponente;
        if (this.base.tipo !== Tipo_1.Tipo.INT)
            return new Excepcion_1.Excepcion("Semantico", "La base de la potencia debe ser entero o decimal.", this.fila, this.columna);
        if (this.exponente.tipo !== Tipo_1.Tipo.INT)
            return new Excepcion_1.Excepcion("Semantico", "El exponente debe ser entero.", this.fila, this.columna);
        return Math.pow(base, exponente);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("POW");
        let instrucciones = new NodoAST_1.NodoAST("BASE");
        instrucciones.agregarHijoNodo(this.base.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        let expo = new NodoAST_1.NodoAST("EXPONENTE");
        expo.agregarHijoNodo(this.exponente.getNodo());
        nodo.agregarHijoNodo(expo);
        return nodo;
    }
}
exports.Pow = Pow;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
class Push {
    constructor(expresion, valor, fila, columna) {
        this.expresion = expresion;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.identificador;
        let simbolo = table.getTabla(expresion);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + expresion + " no encontrada", this.fila, this.columna);
        let val = simbolo.getValor();
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        val.push(valor);
        return this;
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("PUSH");
        let arreglo = new NodoAST_1.NodoAST("ARREGLO");
        arreglo.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(arreglo);
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Push = Push;

},{"../AST/Excepcion":4,"../Abstract/NodoAST":8}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raiz = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Raiz {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return Math.sqrt(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("RAIZ");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Raiz = Raiz;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SString = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class SString {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo === Tipo_1.Tipo.NULL)
            return new Excepcion_1.Excepcion("Semantico", "El parametro no puede ser NULL", this.fila, this.columna);
        return String(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("STRING");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.SString = SString;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seno = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Seno {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return Math.sin(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("SENO");
        let instrucciones = new NodoAST_1.NodoAST("VALOR ");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Seno = Seno;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubString = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class SubString {
    constructor(expresion, posInicial, posFinal, fila, columna) {
        this.expresion = expresion;
        this.posInicial = posInicial;
        this.posFinal = posFinal;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let posInicial = this.posInicial.interpretar(tree, table);
        if (posInicial instanceof Excepcion_1.Excepcion)
            return posInicial;
        let posFinal = this.posFinal.interpretar(tree, table);
        if (posFinal instanceof Excepcion_1.Excepcion)
            return posFinal;
        return expresion.slice(posInicial, posFinal);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("SUBSTRING");
        let instrucciones = new NodoAST_1.NodoAST("EXPRESION");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        let posi = new NodoAST_1.NodoAST("POSICION INICIAL");
        posi.agregarHijoNodo(this.posInicial.getNodo());
        nodo.agregarHijoNodo(posi);
        let posf = new NodoAST_1.NodoAST("POSICION FINAL");
        posf.agregarHijoNodo(this.posFinal.getNodo());
        nodo.agregarHijoNodo(posf);
        return nodo;
    }
}
exports.SubString = SubString;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tangente = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Tangente {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return Math.tan(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TANGENTE");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.Tangente = Tangente;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDouble = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToDouble {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.DOUBLE;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo !== Tipo_1.Tipo.INT)
            return new Excepcion_1.Excepcion("Semantico", "El parametro debe ser de tipo Int", this.fila, this.columna);
        return parseFloat(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TO DOUBLE");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ToDouble = ToDouble;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToInt {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.INT;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo !== Tipo_1.Tipo.DOUBLE)
            return new Excepcion_1.Excepcion("Semantico", "El parametro debe ser de tipo Double", this.fila, this.columna);
        return Math.trunc(valor);
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TO INT");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ToInt = ToInt;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCase = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToLowerCase {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        if (this.expresion.tipo !== Tipo_1.Tipo.STRING)
            return new Excepcion_1.Excepcion("Semantico", "El parametro de ToLower no es cadena", this.fila, this.columna);
        return expresion.toLowerCase();
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TO LOWER CASE");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ToLowerCase = ToLowerCase;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpperCase = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class ToUpperCase {
    constructor(expresion, fila, columna) {
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        if (this.expresion.tipo !== Tipo_1.Tipo.STRING)
            return new Excepcion_1.Excepcion("Semantico", "El parametro de ToUpper no es cadena", this.fila, this.columna);
        return expresion.toUpperCase();
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TO UPPER CASE");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.expresion.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.ToUpperCase = ToUpperCase;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class TypeOf {
    constructor(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.STRING;
    }
    traducir(tree, table) {
        throw new Error("Method not implemented.");
    }
    interpretar(tree, table) {
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        if (this.valor.tipo === Tipo_1.Tipo.INT) {
            return "int";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.DOUBLE) {
            return "double";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.STRING) {
            return "string";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.CHAR) {
            return "char";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.ARRAY) {
            return "array";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.STRUCT) {
            return "struct";
        }
        else if (this.valor.tipo === Tipo_1.Tipo.BOOL) {
            return "boolean";
        }
    }
    getNodo() {
        let nodo = new NodoAST_1.NodoAST("TYPE OF");
        let instrucciones = new NodoAST_1.NodoAST("VALOR");
        instrucciones.agregarHijoNodo(this.valor.getNodo());
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
    }
}
exports.TypeOf = TypeOf;

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../Abstract/NodoAST":8}],56:[function(require,module,exports){
(function (process){(function (){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,25],$V2=[1,64],$V3=[1,39],$V4=[1,40],$V5=[1,41],$V6=[1,42],$V7=[1,43],$V8=[1,38],$V9=[1,44],$Va=[1,45],$Vb=[1,46],$Vc=[1,47],$Vd=[1,48],$Ve=[1,49],$Vf=[1,50],$Vg=[1,51],$Vh=[1,52],$Vi=[1,53],$Vj=[1,55],$Vk=[1,56],$Vl=[1,57],$Vm=[1,58],$Vn=[1,59],$Vo=[1,60],$Vp=[1,61],$Vq=[1,62],$Vr=[1,63],$Vs=[1,29],$Vt=[1,30],$Vu=[1,31],$Vv=[1,36],$Vw=[1,37],$Vx=[1,27],$Vy=[1,28],$Vz=[1,32],$VA=[1,33],$VB=[1,34],$VC=[1,35],$VD=[5,29,33,38,39,40,41,42,43,44,59,60,61,62,63,64,65,66,67,73,74,75,76,77,78,84,85,86,94,96,98,102,103,104,105,106,111,113,115,116,117,120],$VE=[36,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58],$VF=[2,72],$VG=[5,29,33,38,39,40,41,42,43,59,60,61,62,63,64,65,66,67,73,74,75,76,77,78,84,85,86,94,96,98,102,103,104,105,106,111,113,115,116,117,120],$VH=[2,25],$VI=[1,77],$VJ=[2,71],$VK=[2,88],$VL=[1,82],$VM=[1,83],$VN=[2,66],$VO=[1,84],$VP=[1,88],$VQ=[1,87],$VR=[1,91],$VS=[1,90],$VT=[1,92],$VU=[1,93],$VV=[1,94],$VW=[1,95],$VX=[1,96],$VY=[1,97],$VZ=[1,98],$V_=[1,99],$V$=[1,100],$V01=[1,101],$V11=[1,102],$V21=[1,103],$V31=[1,104],$V41=[1,115],$V51=[1,120],$V61=[29,33,36],$V71=[2,41],$V81=[2,37],$V91=[8,30,34,36,37,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,68,72,95],$Va1=[8,37],$Vb1=[2,35],$Vc1=[1,139],$Vd1=[2,69],$Ve1=[1,149],$Vf1=[1,155],$Vg1=[1,156],$Vh1=[1,160],$Vi1=[1,161],$Vj1=[1,162],$Vk1=[1,163],$Vl1=[1,164],$Vm1=[1,158],$Vn1=[37,68],$Vo1=[2,132],$Vp1=[1,195],$Vq1=[8,30,34,37,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,68,72,95],$Vr1=[8,30,34,37,57,58,68,72,95],$Vs1=[34,37],$Vt1=[1,216],$Vu1=[5,8,29,30,33,34,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,76,77,78,84,85,86,94,95,96,98,102,103,104,105,106,111,113,115,116,117,120],$Vv1=[2,90],$Vw1=[34,72],$Vx1=[8,30,34,37,44,45,49,50,51,52,53,54,55,56,57,58,68,72,95],$Vy1=[8,30,34,37,51,52,53,54,55,56,57,58,68,72,95],$Vz1=[1,238],$VA1=[2,134],$VB1=[1,240],$VC1=[1,249],$VD1=[1,267],$VE1=[8,30,33,34,36,37,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,68,72,95],$VF1=[37,96],$VG1=[1,322],$VH1=[102,103];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"instrucciones":4,"EOF":5,"instruccion":6,"variables":7,"PTCOMA":8,"imprimir":9,"if":10,"switch":11,"break":12,"incr_decr":13,"while_instruccion":14,"do_instruccion":15,"struct_crear":16,"for":17,"llamada_struct":18,"continue":19,"return":20,"modificarArreglo":21,"main":22,"funcion":23,"llamada":24,"ptc":25,"pop":26,"push":27,"tipo":28,"ID":29,"IGUAL":30,"expresion":31,"listaid":32,"CORIZQ":33,"CORDER":34,"NUMERAL":35,"PUNTO":36,"COMA":37,"RINT":38,"RDOUBLE":39,"RSTRING":40,"RCHAR":41,"RBOOLEAN":42,"RVOID":43,"MENOS":44,"MAS":45,"POR":46,"DIVIDIDO":47,"MODULO":48,"CONCATENAR":49,"REPETICION":50,"MENOR":51,"MAYOR":52,"MENORIGUAL":53,"MAYORIGUAL":54,"IGUALIGUAL":55,"DIFERENTE":56,"AND":57,"OR":58,"NOT":59,"ENTERO":60,"DECIMAL":61,"CADENA":62,"CARACTER":63,"RTRUE":64,"RNULL":65,"RFALSE":66,"PARIZQ":67,"PARDER":68,"declaracionArregloT1":69,"listaExpresiones":70,"posicion":71,"DOSPT":72,"RPOW":73,"RRAIZ":74,"RSIN":75,"RCOS":76,"RTAN":77,"RLOG":78,"RCARACTEROFPOSITION":79,"RSUBSTRING":80,"RTOUPPERCASE":81,"RTOLOWERCASE":82,"RPARSE":83,"RTOINT":84,"RSSTRING":85,"RTYPEOF":86,"RLENGTH":87,"RBEGIN":88,"REND":89,"listaValores":90,"valores":91,"RPOP":92,"RPUSH":93,"RIF":94,"LLAVEIZQ":95,"LLAVEDER":96,"RELSE":97,"RSWITCH":98,"caselist":99,"default":100,"case":101,"RCASE":102,"RDEFAULT":103,"RBREAK":104,"RCONTINUE":105,"RRETURN":106,"parametros":107,"parametro":108,"parametrosLlamada":109,"RMAIN":110,"RPRINT":111,"listaImprimir":112,"RPRINTLN":113,"accesoStruct":114,"RWHILE":115,"RDO":116,"RSTRUCT":117,"l_atributos":118,"atributo":119,"RFOR":120,"RIN":121,"l_expresiones":122,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"PTCOMA",29:"ID",30:"IGUAL",33:"CORIZQ",34:"CORDER",35:"NUMERAL",36:"PUNTO",37:"COMA",38:"RINT",39:"RDOUBLE",40:"RSTRING",41:"RCHAR",42:"RBOOLEAN",43:"RVOID",44:"MENOS",45:"MAS",46:"POR",47:"DIVIDIDO",48:"MODULO",49:"CONCATENAR",50:"REPETICION",51:"MENOR",52:"MAYOR",53:"MENORIGUAL",54:"MAYORIGUAL",55:"IGUALIGUAL",56:"DIFERENTE",57:"AND",58:"OR",59:"NOT",60:"ENTERO",61:"DECIMAL",62:"CADENA",63:"CARACTER",64:"RTRUE",65:"RNULL",66:"RFALSE",67:"PARIZQ",68:"PARDER",72:"DOSPT",73:"RPOW",74:"RRAIZ",75:"RSIN",76:"RCOS",77:"RTAN",78:"RLOG",79:"RCARACTEROFPOSITION",80:"RSUBSTRING",81:"RTOUPPERCASE",82:"RTOLOWERCASE",83:"RPARSE",84:"RTOINT",85:"RSSTRING",86:"RTYPEOF",87:"RLENGTH",88:"RBEGIN",89:"REND",92:"RPOP",93:"RPUSH",94:"RIF",95:"LLAVEIZQ",96:"LLAVEDER",97:"RELSE",98:"RSWITCH",102:"RCASE",103:"RDEFAULT",104:"RBREAK",105:"RCONTINUE",106:"RRETURN",110:"RMAIN",111:"RPRINT",113:"RPRINTLN",115:"RWHILE",116:"RDO",117:"RSTRUCT",120:"RFOR",121:"RIN"},
productions_: [0,[3,2],[4,2],[4,1],[4,1],[6,2],[6,2],[6,1],[6,1],[6,2],[6,2],[6,1],[6,2],[6,2],[6,1],[6,2],[6,2],[6,2],[6,1],[6,1],[6,1],[6,2],[6,2],[6,2],[25,1],[25,0],[7,4],[7,2],[7,3],[7,4],[7,6],[7,7],[7,6],[7,5],[32,3],[32,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,1],[31,2],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,2],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[31,1],[31,2],[31,6],[31,1],[31,1],[31,6],[31,4],[31,4],[31,4],[31,4],[31,4],[31,6],[31,8],[31,5],[31,5],[31,6],[31,4],[31,4],[31,4],[31,4],[31,1],[31,5],[71,1],[71,1],[71,1],[69,3],[90,3],[90,1],[91,1],[91,1],[21,5],[26,5],[27,6],[70,4],[70,3],[10,7],[10,11],[10,9],[10,5],[11,8],[99,2],[99,1],[101,4],[100,3],[12,1],[19,1],[20,2],[20,1],[23,8],[23,8],[23,7],[107,3],[107,1],[108,4],[108,2],[24,4],[24,3],[109,3],[109,1],[22,7],[9,4],[9,4],[112,4],[112,2],[112,0],[114,2],[114,0],[13,3],[13,3],[14,7],[15,8],[16,5],[118,3],[118,1],[119,2],[119,2],[17,11],[17,7],[122,3],[122,1],[18,7]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = {'instrucciones':$$[$0-1], 'errores':errores.slice()}; return this.$;
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 95: case 109: case 120: case 126: case 141: case 147:
 this.$ = [$$[$0]]; 
break;
case 4:

									errores.push(new Excepcion("Sintactico", "Error sintactico - " + yytext, yylloc.first_line, yylloc.first_column)) 
									//console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
								
break;
case 5: case 6: case 9: case 10: case 12: case 13: case 15: case 16: case 17: case 21: case 22: case 23: case 67: case 93:
 this.$ = $$[$0-1]; 
break;
case 7: case 8: case 11: case 14: case 18: case 19: case 20: case 71: case 72: case 88: case 90: case 96: case 97:
 this.$ = $$[$0]; 
break;
case 26:
 this.$ = new Declaracion($$[$0-3], [$$[$0-2]], _$[$0-3].first_line, _$[$0-3].first_column, $$[$0], false, false, false); 
break;
case 27:
 this.$ = new Declaracion($$[$0-1], $$[$0], _$[$0-1].first_line, _$[$0-1].first_column, null, false, false, false); 
break;
case 28:
 this.$ = new Asignacion($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 29:
	let temp = new Primitivos(Tipo.ARRAY, [], _$[$0-3].first_line, _$[$0-3].first_column);
													this.$ = new Asignacion($$[$0-3], temp, _$[$0-3].first_line, _$[$0-3].first_column);
												
break;
case 30:
 this.$ = new Declaracion($$[$0-5], [$$[$0-2]], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0], true, true, false); 
break;
case 31:
 this.$ = new Declaracion($$[$0-6], [$$[$0-3]], _$[$0-6].first_line, _$[$0-6].first_column, $$[$0], true, false, true); 
break;
case 32:
 this.$ = new Declaracion($$[$0-5], [$$[$0-2]], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0], true, false, false); 
break;
case 33:
 this.$ = new Asignacion_atributo($$[$0-4], $$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 34:
this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 35:
 this.$ = new Array(); this.$.push($$[$0]); 
break;
case 36:
 this.$ = Tipo.INT; 
break;
case 37:
 this.$ = Tipo.DOUBLE; 
break;
case 38:
 this.$ = Tipo.STRING; 
break;
case 39:
 this.$ = Tipo.CHAR; 
break;
case 40:
 this.$ = Tipo.BOOL; 
break;
case 41:
 this.$ = Tipo.VOID; 
break;
case 42:
 this.$ = new Aritmetica(OperadorAritmetico.UMENOS, $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 43:
 this.$ = new Aritmetica(OperadorAritmetico.MAS, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 44:
 this.$ = new Aritmetica(OperadorAritmetico.MENOS, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 45:
 this.$ = new Aritmetica(OperadorAritmetico.POR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 46:
 this.$ = new Aritmetica(OperadorAritmetico.DIV, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 47:
 this.$ = new Aritmetica(OperadorAritmetico.MOD, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 48:
 this.$ = new Aritmetica(OperadorAritmetico.CONCATENAR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 49:
 this.$ = new Aritmetica(OperadorAritmetico.REPETIR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 50:
 this.$ = new Relacional(OperadorRelacional.MENORQUE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 51:
 this.$ = new Relacional(OperadorRelacional.MAYORQUE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 52:
 this.$ = new Relacional(OperadorRelacional.MENORIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 53:
 this.$ = new Relacional(OperadorRelacional.MAYORIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 54:
 this.$ = new Relacional(OperadorRelacional.IGUALIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 55:
 this.$ = new Relacional(OperadorRelacional.DIFERENTE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 56:
 this.$ = new Logica(OperadorLogico.AND, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 57:
 this.$ = new Logica(OperadorLogico.OR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 58:
 this.$ = new Logica(OperadorLogico.NOT, $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 59:
 this.$ = new Primitivos(Tipo.INT, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 60:
 this.$ = new Primitivos(Tipo.DOUBLE, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 61:
 this.$ = new Primitivos(Tipo.STRING, String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 62:
 this.$ = new Primitivos(Tipo.CHAR, String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 63:
 this.$ = new Primitivos(Tipo.BOOL, true, _$[$0].first_line, _$[$0].first_column); 
break;
case 64:
 this.$ = new Primitivos(Tipo.NULL, null, _$[$0].first_line, _$[$0].first_column); 
break;
case 65:
 this.$ = new Primitivos(Tipo.BOOL, false, _$[$0].first_line, _$[$0].first_column); 
break;
case 66:
 this.$ = new Identificador(String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 68:
 this.$ = new Primitivos(Tipo.ARRAY, $$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 69:
 this.$ = new AccesoArreglo($$[$0-1], $$[$0], null, null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 70:
 this.$ = new AccesoArreglo($$[$0-5], null, $$[$0-3], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 73:
 this.$ = new Pow($$[$0-3], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 74:
 this.$ = new Raiz($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 75:
 this.$ = new Seno($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 76:
 this.$ = new Coseno($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 77:
 this.$ = new Tangente($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 78:
 this.$ = new Log($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 79:
 this.$ = new Caracter($$[$0-5], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 80:
 this.$ = new SubString($$[$0-7], $$[$0-3], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 81:
 this.$ = new ToUpperCase($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 82:
 this.$ = new ToLowerCase($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 83:
 this.$ = new Parse($$[$0-5], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 84:
 this.$ = new ToInt($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 85:
 this.$ = new ToDouble($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 86:
 this.$ = new SString($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 87:
 this.$ = new TypeOf($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 89:
 this.$ = new Length($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 91: case 92:
 this.$ = true; 
break;
case 94:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 98:
 this.$ = new ModificarArreglo($$[$0-4], $$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 99:
 this.$ = new Pop($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 100:
 this.$ = new Push($$[$0-5], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 101:
 $$[$0-3].push($$[$0-1]); this.$ = $$[$0-3]; 
break;
case 102:
 this.$ = [$$[$0-1]] 
break;
case 103:
 this.$ = new If($$[$0-4], $$[$0-1], null, null, _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 104:
 this.$ = new If($$[$0-8], $$[$0-5], $$[$0-1], null, _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 105:
 this.$ = new If($$[$0-6], $$[$0-3], null, $$[$0], _$[$0-8].first_line, _$[$0-8].first_column); 
break;
case 106:
 this.$ = new If($$[$0-2], [$$[$0]], null, null, _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 107:
 this.$ = new Switch($$[$0-5], $$[$0-2], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 108:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 110:
 this.$ = new Case($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 111:
 this.$ = new Default($$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 112:
 this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 113:
 this.$ = new Continue(_$[$0].first_line, _$[$0].first_column); 
break;
case 114:
 this.$ = new Return($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 115:
 this.$ = new Return(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 116:
 this.$ = new Funcion($$[$0-7], $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 117:
 this.$ = new Funcion(Tipo.STRUCT, $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 118:
 this.$ = new Funcion($$[$0-6], $$[$0-5], [], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 119: case 125: case 140: case 146:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 121:
 this.$ = {'tipo': $$[$0-3], 'identificador': $$[$0], 'arreglo':true}; 
break;
case 122:
 this.$ = {'tipo': $$[$0-1], 'identificador': $$[$0], 'arreglo':false}; 
break;
case 123:
 this.$ = new Llamada($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 124:
 this.$ = new Llamada($$[$0-2], [], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 127:
 this.$ = new Main($$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 128:
 this.$ = new Imprimir(false, $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 129:
 this.$ = new Imprimir(true, $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 130:
 $$[$0-3].push({'expresion':$$[$0-1], 'acceso': $$[$0]['acceso']}); this.$ = $$[$0-3]; 
break;
case 131:
 this.$ = [{'expresion':$$[$0-1], 'acceso': $$[$0]['acceso']}]; 
break;
case 132:
 this.$ = []; 
break;
case 133:
 this.$ = {'acceso': $$[$0]}; 
break;
case 134:
 this.$ = {'acceso': null}; 
break;
case 135:
this.$ = new inc_dec(OperadorAritmetico.MAS,$$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column);
break;
case 136:
this.$ = new inc_dec(OperadorAritmetico.MENOS,$$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column);
break;
case 137:
 this.$ = new While($$[$0-4],$$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column);
break;
case 138:
 this.$ = new DoW($$[$0-1],$$[$0-5], _$[$0-7].first_line, _$[$0-7].first_column);
break;
case 139:
 this.$ = new Struct(Tipo.STRUCT, $$[$0-3], _$[$0-4].first_line, _$[$0-4].first_column, [$$[$0-1]]); 
break;
case 142:
 this.$ = new Declaracion_atributo($$[$0-1], $$[$0], _$[$0-1].first_line, _$[$0-1].first_column, null); 
break;
case 143:
 this.$ = new Declaracion_atributo(Tipo.STRUCT, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column, null); 
break;
case 144:
 this.$ = new For($$[$0-8], $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 145:
 this.$ = new ForIn($$[$0-5], $$[$0-3], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 148:
 this.$ = new Llamada_struct($$[$0-6],$$[$0-5],$$[$0-3],[$$[$0-1]], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{1:[3]},{5:[1,65],6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($VD,[2,3]),o($VD,[2,4]),{8:[1,67]},{8:[1,68]},o($VD,[2,7]),o($VD,[2,8]),{8:[1,69]},o($VE,$VF,{8:[1,70]}),o($VD,[2,11]),{8:[1,71]},{8:[1,72]},o($VD,[2,14]),{8:[1,73]},{8:[1,74]},{8:[1,75]},o($VD,[2,18]),o($VD,[2,19]),o($VD,[2,20]),o($VG,$VH,{25:76,8:$VI,36:$VJ,44:$VJ,45:$VJ,46:$VJ,47:$VJ,48:$VJ,49:$VJ,50:$VJ,51:$VJ,52:$VJ,53:$VJ,54:$VJ,55:$VJ,56:$VJ,57:$VJ,58:$VJ}),o($VG,$VH,{25:78,8:$VI,36:$VK,44:$VK,45:$VK,46:$VK,47:$VK,48:$VK,49:$VK,50:$VK,51:$VK,52:$VK,53:$VK,54:$VK,55:$VK,56:$VK,57:$VK,58:$VK}),o($VD,$VH,{25:79,8:$VI}),{29:[1,80],32:81,33:$VL,36:$VM},o($VE,$VN,{70:86,29:[1,85],30:$VO,33:$VP,67:$VQ}),{36:[1,89],44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{67:[1,105]},{67:[1,106]},{67:[1,107]},{67:[1,108]},{8:[2,112]},{67:[1,109]},{95:[1,110]},{29:[1,111]},{29:[1,113],67:[1,112]},{8:[2,113]},{8:[2,115],13:117,24:116,26:119,28:118,29:$V41,31:114,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($V61,$V71,{110:[1,121]}),o($V61,[2,36]),o($V61,$V81,{67:[1,122]}),o($V61,[2,38]),o($V61,[2,39]),o($V61,[2,40]),{13:117,24:116,26:119,28:118,29:$V41,31:123,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:124,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($V91,[2,59]),o($V91,[2,60]),o($V91,[2,61]),o($V91,[2,62]),o($V91,[2,63]),o($V91,[2,64]),o($V91,[2,65]),{13:117,24:116,26:119,28:118,29:$V41,31:125,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($V91,[2,68]),{67:[1,126]},{67:[1,127]},{67:[1,128]},{67:[1,129]},{67:[1,130]},{67:[1,131]},{67:[1,132]},{67:[1,133]},{67:[1,134]},{13:117,24:116,26:119,28:118,29:$V41,31:138,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:137,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,90:135,91:136},{1:[2,1]},o($VD,[2,2]),o($VD,[2,5]),o($VD,[2,6]),o($VD,[2,9]),o($VD,[2,10]),o($VD,[2,12]),o($VD,[2,13]),o($VD,[2,15]),o($VD,[2,16]),o($VD,[2,17]),o($VD,[2,21]),o($VD,[2,24]),o($VD,[2,22]),o($VD,[2,23]),o($Va1,$Vb1,{30:$Vc1,67:[1,140]}),{8:[2,27],37:[1,141]},{34:[1,142]},{83:[1,143]},{13:117,24:116,26:119,28:118,29:$V41,31:144,33:[1,145],38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{30:[1,146],67:[1,147]},o($VE,$Vd1,{30:[1,148],33:$Ve1}),{13:117,24:116,26:119,28:118,29:$V41,31:152,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,68:[1,151],69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,109:150},{13:117,24:116,26:119,28:118,29:$V41,31:154,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,71:153,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,88:$Vf1,89:$Vg1},{13:117,24:116,26:119,28:118,29:$V41,31:157,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,79:$Vh1,80:$Vi1,81:$Vj1,82:$Vk1,84:$Vp,85:$Vq,86:$Vr,87:$Vl1,92:$Vm1,93:[1,159]},{13:117,24:116,26:119,28:118,29:$V41,31:166,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,45:[1,165],59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:168,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:[1,167],59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:169,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:170,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:171,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:172,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:173,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:174,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:175,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:176,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:177,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:178,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:179,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:180,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:181,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($Vn1,$Vo1,{69:54,24:116,13:117,28:118,26:119,112:182,31:183,29:$V41,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr}),o($Vn1,$Vo1,{69:54,24:116,13:117,28:118,26:119,31:183,112:184,29:$V41,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr}),{13:117,24:116,26:119,28:118,29:$V41,31:185,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:186,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:187,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{2:$V0,4:188,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{95:[1,189]},{7:190,13:117,24:116,26:119,28:191,29:[1,192],31:193,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{121:[1,194]},{8:[2,114],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},o($V91,$VN,{70:196,33:$VP,67:$VQ}),o($V91,$VJ),o($V91,$VF),{36:$VM},o($V91,$VK),o($V61,$V71),{67:[1,197]},{13:117,24:116,26:119,28:118,29:$V41,31:198,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($Vq1,[2,42],{36:$Vp1}),o($Vr1,[2,58],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11}),{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,199]},{13:117,24:116,26:119,28:118,29:$V41,31:200,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:201,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:202,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:203,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:204,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:205,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:206,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:207,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:208,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{34:[1,209],37:[1,210]},o($Vs1,[2,95]),o([34,36,37,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58],[2,96]),o($Vs1,[2,97],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),{13:117,24:116,26:119,28:118,29:$V41,31:211,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{28:215,38:$V3,39:$Vt1,40:$V5,41:$V6,42:$V7,43:$V51,68:[1,213],107:212,108:214},{29:[1,217]},{29:[1,218]},{67:[1,219]},{8:[2,28],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{13:117,24:116,26:119,28:118,29:$V41,31:138,33:$V2,34:[1,220],38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:137,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,90:135,91:136},{29:[1,221]},{28:215,38:$V3,39:$Vt1,40:$V5,41:$V6,42:$V7,43:$V51,107:222,108:214},{13:117,24:116,26:119,28:118,29:$V41,31:223,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:224,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{37:[1,226],68:[1,225]},o($Vu1,[2,124]),o($Vn1,[2,126],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),{72:[1,227]},{34:[1,228],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,72:$Vv1},o($Vw1,[2,91]),o($Vw1,[2,92]),{30:[1,229],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{67:[1,230]},{67:[1,231]},{67:[1,232]},{67:[1,233]},{67:[1,234]},{67:[1,235]},{67:[1,236]},o($V91,[2,135]),o($Vx1,[2,43],{36:$Vp1,46:$VT,47:$VU,48:$VV}),o($V91,[2,136],{69:54,24:116,13:117,28:118,26:119,31:123,29:$V41,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr}),o($Vx1,[2,44],{36:$Vp1,46:$VT,47:$VU,48:$VV}),o($Vq1,[2,45],{36:$Vp1}),o($Vq1,[2,46],{36:$Vp1}),o($Vq1,[2,47],{36:$Vp1}),o($Vx1,[2,48],{36:$Vp1,46:$VT,47:$VU,48:$VV}),o($Vx1,[2,49],{36:$Vp1,46:$VT,47:$VU,48:$VV}),o($Vy1,[2,50],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX}),o($Vy1,[2,51],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX}),o($Vy1,[2,52],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX}),o($Vy1,[2,53],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX}),o($Vy1,[2,54],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX}),o($Vy1,[2,55],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX}),o($Vr1,[2,56],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11}),o([8,30,34,37,58,68,72,95],[2,57],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21}),{37:$Vz1,68:[1,237]},o($Vn1,$VA1,{114:239,36:$VB1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),{37:$Vz1,68:[1,241]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,242]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,243]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,244]},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,245],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{28:248,29:$VC1,38:$V3,39:$Vt1,40:$V5,41:$V6,42:$V7,43:$V51,118:246,119:247},{8:[1,250]},{29:[1,251],32:81,33:$VL,36:$VM},o($VE,$VN,{70:196,30:$VO,33:$VP,67:$VQ}),{36:[1,252],44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{13:117,24:116,26:119,28:118,29:$V41,31:253,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{79:$Vh1,80:$Vi1,81:$Vj1,82:$Vk1,87:$Vl1,92:$Vm1},o($V91,$Vd1,{33:$Ve1}),{68:[1,254]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,255]},o($V91,[2,67]),{36:$Vp1,37:[1,256],44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,257]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,258]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,259]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,260]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,261]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,262]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,263]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,264]},o($V91,[2,93]),{13:117,24:116,26:119,28:118,29:$V41,31:138,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:137,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,91:265},{8:[2,26],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{37:$VD1,68:[1,266]},{95:[1,268]},o($Vn1,[2,120]),{29:[1,270],33:[1,269]},o([29,33],$V81),o($Va1,[2,34]),{30:[1,271]},{13:117,24:116,26:119,28:118,29:$V41,31:272,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{8:[2,29]},{67:[1,273]},{37:$VD1,68:[1,274]},{8:[1,275],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{34:[1,276],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},o($Vu1,[2,123]),{13:117,24:116,26:119,28:118,29:$V41,31:277,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:279,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,71:278,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,88:$Vf1,89:$Vg1},o($VE1,[2,102]),{13:117,24:116,26:119,28:118,29:$V41,31:280,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{68:[1,281]},{13:117,24:116,26:119,28:118,29:$V41,31:282,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:283,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{13:117,24:116,26:119,28:118,29:$V41,31:284,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{68:[1,285]},{68:[1,286]},{68:[1,287]},{8:[2,128]},{13:117,24:116,26:119,28:118,29:$V41,31:288,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($Vn1,[2,131]),{13:117,24:116,26:119,28:118,29:$V41,31:289,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,79:$Vh1,80:$Vi1,81:$Vj1,82:$Vk1,84:$Vp,85:$Vq,86:$Vr,87:$Vl1,92:$Vm1},{8:[2,129]},{6:291,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,95:[1,290],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{95:[1,292]},{95:[1,293]},{115:[1,294]},{37:[1,296],96:[1,295]},o($VF1,[2,141]),{29:[1,297]},{29:[1,298]},{13:117,24:116,26:119,28:118,29:$V41,31:299,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($Va1,$Vb1,{30:$Vc1}),{13:117,24:116,26:119,28:118,29:$V41,31:157,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,79:$Vh1,80:$Vi1,81:$Vj1,82:$Vk1,84:$Vp,85:$Vq,86:$Vr,87:$Vl1,92:$Vm1},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,95:[1,300]},{95:[1,301]},o($V91,[2,85]),{13:117,24:116,26:119,28:118,29:$V41,31:302,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($V91,[2,74]),o($V91,[2,75]),o($V91,[2,76]),o($V91,[2,77]),o($V91,[2,78]),o($V91,[2,84]),o($V91,[2,86]),o($V91,[2,87]),o($Vs1,[2,94]),{95:[1,303]},{28:215,38:$V3,39:$Vt1,40:$V5,41:$V6,42:$V7,43:$V51,108:304},{2:$V0,4:305,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{34:[1,306]},o($Vn1,[2,122]),{13:117,24:116,26:119,28:118,29:[1,307],31:309,33:$V2,35:[1,308],38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,310]},{13:117,24:116,26:119,28:118,29:$V41,31:312,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,122:311},{95:[1,313]},o($VD,[2,98]),o($VE1,[2,101]),o($Vn1,[2,125],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),{34:[1,314]},{34:$Vv1,36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{8:[2,33],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},o($Vu1,[2,99]),{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,315]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,316]},{36:$Vp1,37:[1,317],44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},o($V91,[2,81]),o($V91,[2,82]),o($V91,[2,89]),o($Vn1,$VA1,{114:318,36:$VB1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),o($Vn1,[2,133],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),{2:$V0,4:319,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($VD,[2,106]),{99:320,101:321,102:$VG1},{2:$V0,4:323,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{67:[1,324]},{8:[2,139]},{28:248,29:$VC1,38:$V3,39:$Vt1,40:$V5,41:$V6,42:$V7,43:$V51,119:325},o($VF1,[2,142]),o($VF1,[2,143]),{8:[1,326],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},{2:$V0,4:327,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{2:$V0,4:328,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,329]},{2:$V0,4:330,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($Vn1,[2,119]),{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,331],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{29:[1,332]},o($VE,$VN,{70:196,8:[2,30],33:$VP,67:$VQ}),{29:[1,333]},{8:[2,32],36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31},o($V91,[2,83]),{37:[1,335],68:[1,334]},o($Vn1,[2,147],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),{2:$V0,4:336,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($V91,[2,70]),o([5,8,29,33,38,39,40,41,42,43,44,59,60,61,62,63,64,65,66,67,73,74,75,76,77,78,84,85,86,94,96,98,102,103,104,105,106,111,113,115,116,117,120],[2,100]),o($V91,[2,79]),{13:117,24:116,26:119,28:118,29:$V41,31:337,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($Vn1,[2,130]),{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,338],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{100:339,101:340,102:$VG1,103:[1,341]},o($VH1,[2,109]),{13:117,24:116,26:119,28:118,29:$V41,31:342,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,343],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{13:117,24:116,26:119,28:118,29:$V41,31:344,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},o($VF1,[2,140]),{13:117,24:116,26:119,28:118,29:$V41,31:345,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,346],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,347],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($V91,[2,73]),{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,348],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($VD,[2,118]),o($Vn1,[2,121]),{8:[2,31]},{8:[2,148]},{13:117,24:116,26:119,28:118,29:$V41,31:349,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V51,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,350],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,351]},o($VD,[2,103],{97:[1,352]}),{96:[1,353]},o($VH1,[2,108]),{72:[1,354]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,72:[1,355]},o($VD,[2,137]),{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,356]},{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31,68:[1,357]},o($VD,[2,145]),o($VD,[2,127]),o($VD,[2,116]),o($Vn1,[2,146],{36:$Vp1,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,51:$VY,52:$VZ,53:$V_,54:$V$,55:$V01,56:$V11,57:$V21,58:$V31}),o($VD,[2,117]),o($V91,[2,80]),{10:359,94:$Vs,95:[1,358]},o($VD,[2,107]),{2:$V0,4:360,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{2:$V0,4:361,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{8:[2,138]},{95:[1,362]},{2:$V0,4:363,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($VD,[2,105]),{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[2,111],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($VH1,[2,110],{7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,31:26,69:54,6:66,29:$V1,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC}),{2:$V0,4:364,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,365],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},{6:66,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:20,24:21,26:22,27:23,28:24,29:$V1,31:26,33:$V2,38:$V3,39:$V4,40:$V5,41:$V6,42:$V7,43:$V8,44:$V9,59:$Va,60:$Vb,61:$Vc,62:$Vd,63:$Ve,64:$Vf,65:$Vg,66:$Vh,67:$Vi,69:54,73:$Vj,74:$Vk,75:$Vl,76:$Vm,77:$Vn,78:$Vo,84:$Vp,85:$Vq,86:$Vr,94:$Vs,96:[1,366],98:$Vt,104:$Vu,105:$Vv,106:$Vw,111:$Vx,113:$Vy,115:$Vz,116:$VA,117:$VB,120:$VC},o($VD,[2,104]),o($VD,[2,144])],
defaultActions: {31:[2,112],36:[2,113],65:[2,1],220:[2,29],237:[2,128],241:[2,129],295:[2,139],333:[2,31],334:[2,148],356:[2,138]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

	errores = []

	const { Excepcion } = require("./AST/Excepcion");
	const { Tipo, OperadorAritmetico, OperadorRelacional, OperadorLogico } = require("./AST/Tipo");
	const { Primitivos } = require("./Expresiones/Primitivos");
	const { Aritmetica } = require("./Expresiones/Aritmetica");
	const { Relacional } = require("./Expresiones/Relacional");
	const { Logica } = require("./Expresiones/Logica");
	const { Declaracion } = require("./Instrucciones/Declaracion");
	const { Asignacion } = require("./Instrucciones/Asignacion");
	const { Identificador } = require("./Expresiones/Identificador");
	const { Imprimir } = require("./Instrucciones/Imprimir");
	const { If } = require("./Instrucciones/If");
	const { Switch } = require("./Instrucciones/Switch");
	const { Case } = require("./Instrucciones/Case");
	const { Default } = require("./Instrucciones/Default");
	const { Break } = require("./Instrucciones/Break");
	const { While } = require("./Instrucciones/while");
	const { DoW } = require("./Instrucciones/DoW");
	const { inc_dec } = require("./Instrucciones/inc_dec");
	const { Struct } = require("./Instrucciones/struct");
	const { For } = require("./Instrucciones/For");
	const { ForIn } = require("./Instrucciones/ForIn");
	const { Llamada_struct } = require("./Instrucciones/llamada_struct");
	const { Declaracion_atributo } = require("./Instrucciones/Declaracion_atributo");
	const { Asignacion_atributo } = require("./Instrucciones/Asignacion_atributo");
	const { Continue } = require("./Instrucciones/Continue");
	const { Return } = require("./Instrucciones/Return");
	const { ModificarArreglo } = require("./Instrucciones/ModificarArreglo");
	const { AccesoArreglo } = require("./Expresiones/AccesoArreglo");
	const { Main } = require("./Instrucciones/Main");
	const { Funcion } = require("./Instrucciones/Funcion");
	const { Llamada } = require("./Instrucciones/Llamada");
	const { Caracter } = require("./Nativas/Caracter");
	const { Length } = require("./Nativas/Length");
	const { Parse } = require("./Nativas/Parse");
	const { SubString } = require("./Nativas/SubString");
	const { ToLowerCase } = require("./Nativas/ToLowerCase");
	const { ToUpperCase } = require("./Nativas/ToUpperCase");
	const { Pow } = require("./Nativas/Pow");
	const { Raiz } = require("./Nativas/Raiz");
	const { Seno } = require("./Nativas/Seno");
	const { Coseno } = require("./Nativas/Coseno");
	const { Tangente } = require("./Nativas/Tangente");
	const { Log } = require("./Nativas/Log");
	const { ToInt } = require("./Nativas/ToInt");
	const { ToDouble } = require("./Nativas/ToDouble");
	const { SString } = require("./Nativas/SString");
	const { TypeOf } = require("./Nativas/TypeOf");
	const { Push } = require("./Nativas/Push");
	const { Pop } = require("./Nativas/Pop");
	
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip comments */
break;
case 1:this.begin('comment');
break;
case 2:this.popState();
break;
case 3:/* skip comment content*/
break;
case 4:/* skip whitespace */
break;
case 5:return 8;
break;
case 6:return 37;
break;
case 7:return 36;
break;
case 8:return 72;
break;
case 9:return 'TERNARIO';
break;
case 10:return 35;
break;
case 11:return 67;
break;
case 12:return 68;
break;
case 13:return 33;
break;
case 14:return 34;
break;
case 15:return 95;
break;
case 16:return 96;
break;
case 17:return 45;
break;
case 18:return 44;
break;
case 19:return 46;
break;
case 20:return 47;
break;
case 21:return 48;
break;
case 22:return 55;
break;
case 23:return 56;
break;
case 24:return 54;
break;
case 25:return 53;
break;
case 26:return 52;
break;
case 27:return 51;
break;
case 28:return 30;
break;
case 29:return 57;
break;
case 30:return 58;
break;
case 31:return 59;
break;
case 32:return 49;
break;
case 33:return 50;
break;
case 34:return 38;
break;
case 35:return 39;
break;
case 36:return 'RFLOAT';
break;
case 37:return 40;
break;
case 38:return 41
break;
case 39:return 42;
break;
case 40:return 64;
break;
case 41:return 66;
break;
case 42:return 43;
break;
case 43:return 65;
break;
case 44:return 113;
break;
case 45:return 111;
break;
case 46:return 110;
break;
case 47:return 94;
break;
case 48:return 97;
break;
case 49:return 98;
break;
case 50:return 102;
break;
case 51:return 88;
break;
case 52:return 89;
break;
case 53:return 103;
break;
case 54:return 104;
break;
case 55:return 115;
break;
case 56:return 116;
break;
case 57:return 117;
break;
case 58:return	'RFOR';
break;
case 59:return 121;
break;
case 60:return 105;
break;
case 61:return 106;
break;
case 62:return 73;
break;
case 63:return 74;
break;
case 64:return 75;
break;
case 65:return 76;
break;
case 66:return 77;
break;
case 67:return 78;
break;
case 68:return 79;
break;
case 69:return 80;
break;
case 70:return 81;
break;
case 71:return 82;
break;
case 72:return 83;
break;
case 73:return 84;
break;
case 74:return 'RTODOUBLE';
break;
case 75:return 85;
break;
case 76:return 86;
break;
case 77:return 93;
break;
case 78:return 92;
break;
case 79:return 87;
break;
case 80:
break;
case 81:
break;
case 82:
break;
case 83:
break;
case 84:return 61;
break;
case 85:return 60;
break;
case 86:return 29;
break;
case 87:
                            yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2)
                            return 62
                        
break;
case 88:
                            yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2)
                            return 63
                        
break;
case 89:return 5;
break;
case 90: 
							errores.push(new Excepcion("Lexico", "Error lexico - " + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column))
							//console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
						
break;
}
},
rules: [/^(?:\/\/.*)/,/^(?:\/\*)/,/^(?:\*\/)/,/^(?:.)/,/^(?:\s+)/,/^(?:;)/,/^(?:,)/,/^(?:\.)/,/^(?::)/,/^(?:\?)/,/^(?:#)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:=)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:&)/,/^(?:\^)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:float\b)/,/^(?:String\b)/,/^(?:char\b)/,/^(?:boolean\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:void\b)/,/^(?:null\b)/,/^(?:println\b)/,/^(?:print\b)/,/^(?:main\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:begin\b)/,/^(?:end\b)/,/^(?:default\b)/,/^(?:break\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:struct\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:log10\b)/,/^(?:caracterOfPosition\b)/,/^(?:subString\b)/,/^(?:toUppercase\b)/,/^(?:toLowercase\b)/,/^(?:parse\b)/,/^(?:toInt\b)/,/^(?:toDouble\b)/,/^(?:string\b)/,/^(?:typeof\b)/,/^(?:push\b)/,/^(?:pop\b)/,/^(?:length\b)/,/^(?:[ \r\t]+)/,/^(?:\n)/,/^(?:[//.*[^\n])/,/^(?:[/\*(.|\n)*?\*/])/,/^(?:[0-9]+\.[0-9]+\b)/,/^(?:[0-9]+\b)/,/^(?:[a-zA-Z][a-zA-Z_0-9]*)/,/^(?:[\"]((\\")|(\\')|(\\\n)|[^\"])*[\"])/,/^(?:[\']((\\\n)|(\\")|(\\')|[^\'])[\'])/,/^(?:$)/,/^(?:.)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],"inclusive":true},"INITIAL":{"rules":[0,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this)}).call(this,require('_process'))
},{"./AST/Excepcion":4,"./AST/Tipo":6,"./Expresiones/AccesoArreglo":9,"./Expresiones/Aritmetica":10,"./Expresiones/Identificador":11,"./Expresiones/Logica":12,"./Expresiones/Primitivos":13,"./Expresiones/Relacional":14,"./Instrucciones/Asignacion":15,"./Instrucciones/Asignacion_atributo":16,"./Instrucciones/Break":17,"./Instrucciones/Case":18,"./Instrucciones/Continue":19,"./Instrucciones/Declaracion":20,"./Instrucciones/Declaracion_atributo":21,"./Instrucciones/Default":22,"./Instrucciones/DoW":23,"./Instrucciones/For":24,"./Instrucciones/ForIn":25,"./Instrucciones/Funcion":26,"./Instrucciones/If":27,"./Instrucciones/Imprimir":28,"./Instrucciones/Llamada":29,"./Instrucciones/Main":30,"./Instrucciones/ModificarArreglo":31,"./Instrucciones/Return":32,"./Instrucciones/Switch":33,"./Instrucciones/inc_dec":34,"./Instrucciones/llamada_struct":35,"./Instrucciones/struct":36,"./Instrucciones/while":37,"./Nativas/Caracter":38,"./Nativas/Coseno":39,"./Nativas/Length":40,"./Nativas/Log":41,"./Nativas/Parse":42,"./Nativas/Pop":43,"./Nativas/Pow":44,"./Nativas/Push":45,"./Nativas/Raiz":46,"./Nativas/SString":47,"./Nativas/Seno":48,"./Nativas/SubString":49,"./Nativas/Tangente":50,"./Nativas/ToDouble":51,"./Nativas/ToInt":52,"./Nativas/ToLowerCase":53,"./Nativas/ToUpperCase":54,"./Nativas/TypeOf":55,"_process":60,"fs":58,"path":59}],57:[function(require,module,exports){
const { AST } = require("./JS/AST/AST");
const { Entorno } = require("./JS/AST/Entorno");
const { Excepcion } = require("./JS/AST/Excepcion");
const { Funcion } = require("./JS/Instrucciones/Funcion");
const { parse } = require('./JS/gramatica');
const { Declaracion } = require("./JS/Instrucciones/Declaracion");
const { Asignacion } = require("./JS/Instrucciones/Asignacion");
const { ModificarArreglo } = require("./JS/Instrucciones/ModificarArreglo");
const { Main } = require("./JS/Instrucciones/Main");
const { Imprimir } = require("./JS/Instrucciones/Imprimir");
const { Struct } = require("./JS/Instrucciones/struct");
const { Llamada_struct } = require("./JS/Instrucciones/llamada_struct");
const { NodoAST } = require("./JS/Abstract/NodoAST");

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);
document.getElementById("eventoTraducir").addEventListener("click", traducirCodigo);


function traducirCodigo() {
    console.log("Traduciendo");
    var instrucciones3D = "";
    var textoIngresado = document.getElementById('txCodigo').value;

    const instrucciones = parse(textoIngresado);
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);
    ast.getInstrucciones().forEach((element) => {
        let value = element.traducir(ast, entornoGlobal);
        if (value instanceof Excepcion) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
        //console.log("el valor es ",value);
        instrucciones3D += value;
        //ast.getStructs().push(value);
        //ast.getStrut('test');
        /*if (value instanceof Struct) {
            ast.getStructs().push(value)
        }*/
    });
    //console.log(ast.getEncabezado());

    //console.log(ast.getConsola());
    //console.log(ast.getListaTemporales());
   /*  console.log('el encabezado es: \n',ast.getEncabezado());
    console.log('la lista de temporales es:\n' ,ast.getListaTemporales())
    console.log("las instrucciones son \n", instrucciones3D); */
    document.getElementById("editorSalida").value  = ast.getEncabezado()+"\ndouble "+ast.getListaTemporales()+";\n\n"+ast.getMain(instrucciones3D);
}

function displayDate() {
    console.log("Analizando");
    var textoIngresado = document.getElementById('txCodigo').value;

    const result = parse(textoIngresado);
    const instrucciones = result['instrucciones'];
    const errores = result['errores'];
    //console.log(instrucciones)
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);
    
    for(let error of errores){
        ast.getExcepciones().push(error);
        ast.updateConsola(error.toString());
    }

    for (let instruccion of ast.getInstrucciones()) { // Primera Pasada
        if (instruccion instanceof Funcion) {
            ast.addFuncion(instruccion);
            continue;
        }

        if ((instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct) || (instruccion instanceof Llamada_struct)) {
            let value = instruccion.interpretar(ast, entornoGlobal);

            if (value instanceof Excepcion) {
                ast.getExcepciones().push(value);
                ast.updateConsola(value.toString());
            }
        }

    }

    let contador = 0;

    for (let instruccion of ast.getInstrucciones()) { // Segunda Pasada
        if (instruccion instanceof Main) {
            contador += 1;

            if (contador == 2) {
                let err = new Excepcion("Semantico", "Existe mas de una funcion Main", instruccion.fila, instruccion.columna);
                ast.getExcepciones().push(err);
                ast.updateConsola(err.toString());
            }

            let value = instruccion.interpretar(ast, entornoGlobal);
            if (value instanceof Excepcion) {
                ast.getExcepciones().push(value);
                ast.updateConsola(value.toString());
            }
            if (value instanceof Imprimir) {
                let err = new Excepcion("Semantico", "Instruccion Imprimir en entorno global", instruccion.fila, instruccion.columna);
                ast.getExcepciones().push(err);
                ast.updateConsola(err.toString());
            }
        }

    }

    for (let instruccion of ast.getInstrucciones()) { // Tercera Pasada
        if (!((instruccion instanceof Funcion) || (instruccion instanceof Main) || (instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct) || (instruccion instanceof Llamada_struct))) {
            let err = new Excepcion("Semantico", "Sentencia fuera de Main", instruccion.fila, instruccion.columna);
            ast.getExcepciones().push(err);
            ast.updateConsola(err.toString());
        }
    }

    //console.log(ast.getConsola());
    document.getElementById("editorSalida").value  =ast.getConsola();

    let init = new NodoAST("RAIZ");
    let instr = new NodoAST("INSTRUCCIONES");

    for(let instruccion of ast.getInstrucciones()){
        instr.agregarHijoNodo(instruccion.getNodo());
    }

    init.agregarHijoNodo(instr);
    let grafo = ast.getDot(init);

    //console.log(grafo)
    var divAST = document.getElementById("ast")
    //divAST.innerHTML = "<h5> probando </h5>"
    var viz = new Viz();

    viz.renderSVGElement(grafo).then(function (element){
        divAST.appendChild(element);
    })
    .catch((error) => {
        console.log(error)
    })

    let tableError = document.getElementById("tableE")
    let contadorError = 1;
    for(let error of ast.getExcepciones()){
        let row = document.createElement("tr")
        var err = document.createElement("td")
        err.innerHTML = contadorError
        row.appendChild(err)
        var cell1 = document.createElement("td")
        cell1.innerHTML = error.tipo
        row.appendChild(cell1)
        var cell2 = document.createElement("td")
        cell2.innerHTML = error.descripcion
        row.appendChild(cell2)
        var cell3 = document.createElement("td")
        cell3.innerHTML = error.fila
        row.appendChild(cell3)
        var cell4 = document.createElement("td")
        cell4.innerHTML = error.columna
        row.appendChild(cell4)
        tableError.appendChild(row)
        contadorError++;
    }
}

/* function numeracion(e) {
    let eArea = document.getElementById('areaNumeracion');
     let eArea2 = document.getElementById('txCodigo');
     let numeros = eArea2.value.split("\n").length;
     let msj="";
     for (let i = 0; i < numeros; i++) {
         msj += i + "\n";
     }
     eArea.value=msj;
 } 

 function numeracion2(e) {
    let eArea = document.getElementById('areaNumeracion2');
     let eArea2 = document.getElementById('editorSalida');
     let numeros = eArea2.value.split("\n").length;
     let msj="";
     for (let i = 1; i < numeros; i++) {
         msj += i + "\n";
     }
     eArea.value=msj;
 }*/
},{"./JS/AST/AST":1,"./JS/AST/Entorno":3,"./JS/AST/Excepcion":4,"./JS/Abstract/NodoAST":8,"./JS/Instrucciones/Asignacion":15,"./JS/Instrucciones/Declaracion":20,"./JS/Instrucciones/Funcion":26,"./JS/Instrucciones/Imprimir":28,"./JS/Instrucciones/Main":30,"./JS/Instrucciones/ModificarArreglo":31,"./JS/Instrucciones/llamada_struct":35,"./JS/Instrucciones/struct":36,"./JS/gramatica":56}],58:[function(require,module,exports){

},{}],59:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":60}],60:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[57])(57)
});
