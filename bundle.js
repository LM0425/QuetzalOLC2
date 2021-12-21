function numeracion(e) {
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
 }
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
exports.AccesoArreglo = void 0;
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

},{"../AST/Excepcion":4,"../AST/Tipo":6}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
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

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../AST/temporalAux":7}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
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
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":4}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logica = void 0;
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
}
exports.Logica = Logica;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivos = void 0;
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

},{"../AST/Excepcion":4,"../AST/Tipo":6}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
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

},{"../AST/Excepcion":4,"../AST/Tipo":6,"../AST/temporalAux":7}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
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
}
exports.Asignacion = Asignacion;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion_atributo = void 0;
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
}
exports.Asignacion_atributo = Asignacion_atributo;

},{"../AST/Excepcion":4,"../AST/Simbolo":5}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
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
}
exports.Break = Break;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Case3d_1 = require("../AST/Case3d");
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
}
exports.Case = Case;

},{"../AST/Case3d":2}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
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
}
exports.Continue = Continue;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
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
}
exports.Declaracion = Declaracion;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"../AST/temporalAux":7}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion_atributo = void 0;
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
}
exports.Declaracion_atributo = Declaracion_atributo;

},{"../AST/Excepcion":4,"../AST/Simbolo":5}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Case3d_1 = require("../AST/Case3d");
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
}
exports.Default = Default;

},{"../AST/Case3d":2}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoW = void 0;
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
}
exports.DoW = DoW;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"./Break":16}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
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
}
exports.For = For;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"./Break":16,"./Continue":18,"./Return":31}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForIn = void 0;
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
}
exports.ForIn = ForIn;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6,"./Break":16,"./Continue":18,"./Return":31}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Return_1 = require("./Return");
const temporalAux_1 = require("../AST/temporalAux");
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
}
exports.Funcion = Funcion;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"../AST/temporalAux":7,"./Return":31}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
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
}
exports.If = If;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"./Return":31}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imprimir = void 0;
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
}
exports.Imprimir = Imprimir;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
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
                if (result.parametros[contador]['tipo'] === parametro.tipo) {
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
}
exports.Llamada = Llamada;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
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
}
exports.Main = Main;

},{"../AST/Entorno":3,"../AST/Excepcion":4}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarArreglo = void 0;
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
}
exports.ModificarArreglo = ModificarArreglo;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Excepcion_1 = require("../AST/Excepcion");
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
        let result = this.expresion.interpretar(tree, table);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        this.tipo = this.expresion.tipo;
        this.result = result;
        return this;
    }
}
exports.Return = Return;

},{"../AST/Excepcion":4}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
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
                let expresionCaso = caso.interpretar(tree, table);
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
                            if (result instanceof Break_1.Break) {
                                cumple = true;
                                return null;
                            }
                            if (result instanceof Return_1.Return) {
                                cumple = true;
                                return result;
                            }
                        }
                    }
                }
            }
        }
        if (!cumple) {
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
    }
}
exports.Switch = Switch;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"./Break":16,"./Return":31}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inc_dec = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
const Simbolo_1 = require("../AST/Simbolo");
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
}
exports.inc_dec = inc_dec;

},{"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada_struct = void 0;
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
                        if (element.tipo == structAux.expresion[0][i].tipo) {
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
}
exports.Llamada_struct = Llamada_struct;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Simbolo":5,"../AST/Tipo":6}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
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
}
exports.Struct = Struct;

},{"../AST/Entorno":3,"../AST/Excepcion":4}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
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
}
exports.While = While;

},{"../AST/Entorno":3,"../AST/Excepcion":4,"../AST/Tipo":6,"./Break":16}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caracter = void 0;
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
}
exports.Caracter = Caracter;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coseno = void 0;
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
}
exports.Coseno = Coseno;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
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
}
exports.Length = Length;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
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
}
exports.Log = Log;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
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
}
exports.Parse = Parse;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
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
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        return expresion.pop();
    }
}
exports.Pop = Pop;

},{"../AST/Excepcion":4}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pow = void 0;
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
}
exports.Pow = Pow;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
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
        let expresion = this.expresion.interpretar(tree, table);
        if (expresion instanceof Excepcion_1.Excepcion)
            return expresion;
        let valor = this.valor.interpretar(tree, table);
        if (valor instanceof Excepcion_1.Excepcion)
            return valor;
        return expresion.push(valor);
    }
}
exports.Push = Push;

},{"../AST/Excepcion":4}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Raiz = void 0;
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
}
exports.Raiz = Raiz;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SString = void 0;
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
}
exports.SString = SString;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seno = void 0;
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
}
exports.Seno = Seno;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubString = void 0;
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
}
exports.SubString = SubString;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tangente = void 0;
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
}
exports.Tangente = Tangente;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDouble = void 0;
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
}
exports.ToDouble = ToDouble;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
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
}
exports.ToInt = ToInt;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCase = void 0;
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
}
exports.ToLowerCase = ToLowerCase;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpperCase = void 0;
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
}
exports.ToUpperCase = ToUpperCase;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
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
}
exports.TypeOf = TypeOf;

},{"../AST/Excepcion":4,"../AST/Tipo":6}],55:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,16],$V2=[1,23],$V3=[1,60],$V4=[1,36],$V5=[1,37],$V6=[1,38],$V7=[1,39],$V8=[1,40],$V9=[1,35],$Va=[1,41],$Vb=[1,42],$Vc=[1,43],$Vd=[1,44],$Ve=[1,45],$Vf=[1,46],$Vg=[1,47],$Vh=[1,48],$Vi=[1,49],$Vj=[1,51],$Vk=[1,52],$Vl=[1,53],$Vm=[1,54],$Vn=[1,55],$Vo=[1,56],$Vp=[1,57],$Vq=[1,58],$Vr=[1,59],$Vs=[1,27],$Vt=[1,28],$Vu=[1,29],$Vv=[1,34],$Vw=[1,25],$Vx=[1,26],$Vy=[1,30],$Vz=[1,31],$VA=[1,32],$VB=[1,33],$VC=[5,19,27,31,36,37,38,39,40,41,42,57,58,59,60,61,62,63,64,70,71,72,73,74,75,81,82,83,90,92,94,98,99,100,101,106,108,110,111,112,115],$VD=[34,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],$VE=[2,68],$VF=[2,67],$VG=[1,76],$VH=[1,77],$VI=[2,62],$VJ=[1,78],$VK=[1,82],$VL=[1,81],$VM=[1,85],$VN=[1,84],$VO=[1,86],$VP=[1,87],$VQ=[1,88],$VR=[1,89],$VS=[1,90],$VT=[1,91],$VU=[1,92],$VV=[1,93],$VW=[1,94],$VX=[1,95],$VY=[1,96],$VZ=[1,97],$V_=[1,98],$V$=[1,109],$V01=[1,113],$V11=[27,31,34],$V21=[2,38],$V31=[2,34],$V41=[8,28,32,34,35,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,65,69,91],$V51=[8,35],$V61=[2,32],$V71=[1,132],$V81=[2,65],$V91=[1,140],$Va1=[1,146],$Vb1=[1,147],$Vc1=[1,149],$Vd1=[1,150],$Ve1=[1,151],$Vf1=[1,152],$Vg1=[1,153],$Vh1=[1,154],$Vi1=[35,65],$Vj1=[2,123],$Vk1=[1,184],$Vl1=[8,28,32,35,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,65,69,91],$Vm1=[8,28,32,35,55,56,65,69,91],$Vn1=[32,35],$Vo1=[1,205],$Vp1=[5,8,19,27,28,31,32,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,69,70,71,72,73,74,75,81,82,83,90,91,92,94,98,99,100,101,106,108,110,111,112,115],$Vq1=[2,86],$Vr1=[32,69],$Vs1=[8,28,32,35,42,43,47,48,49,50,51,52,53,54,55,56,65,69,91],$Vt1=[8,28,32,35,49,50,51,52,53,54,55,56,65,69,91],$Vu1=[1,224],$Vv1=[2,125],$Vw1=[1,226],$Vx1=[8,28,31,32,34,35,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,65,69,91],$Vy1=[35,92],$Vz1=[1,301],$VA1=[98,99];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"instrucciones":4,"EOF":5,"instruccion":6,"variables":7,"PTCOMA":8,"imprimir":9,"if":10,"switch":11,"break":12,"incr_decr":13,"while_instruccion":14,"do_instruccion":15,"struct_crear":16,"for":17,"llamada_struct":18,"continue":19,"return":20,"modificarArreglo":21,"main":22,"funcion":23,"llamada":24,"ptc":25,"tipo":26,"ID":27,"IGUAL":28,"expresion":29,"listaid":30,"CORIZQ":31,"CORDER":32,"NUMERAL":33,"PUNTO":34,"COMA":35,"RINT":36,"RDOUBLE":37,"RSTRING":38,"RCHAR":39,"RBOOLEAN":40,"RVOID":41,"MENOS":42,"MAS":43,"POR":44,"DIVIDIDO":45,"MODULO":46,"CONCATENAR":47,"REPETICION":48,"MENOR":49,"MAYOR":50,"MENORIGUAL":51,"MAYORIGUAL":52,"IGUALIGUAL":53,"DIFERENTE":54,"AND":55,"OR":56,"NOT":57,"ENTERO":58,"DECIMAL":59,"CADENA":60,"CARACTER":61,"RTRUE":62,"RFALSE":63,"PARIZQ":64,"PARDER":65,"declaracionArregloT1":66,"listaExpresiones":67,"posicion":68,"DOSPT":69,"RPOW":70,"RRAIZ":71,"RSIN":72,"RCOS":73,"RTAN":74,"RLOG":75,"RCARACTEROFPOSITION":76,"RSUBSTRING":77,"RTOUPPERCASE":78,"RTOLOWERCASE":79,"RPARSE":80,"RTOINT":81,"RSSTRING":82,"RTYPEOF":83,"RPOP":84,"RLENGTH":85,"RBEGIN":86,"REND":87,"listaValores":88,"valores":89,"RIF":90,"LLAVEIZQ":91,"LLAVEDER":92,"RELSE":93,"RSWITCH":94,"caselist":95,"default":96,"case":97,"RCASE":98,"RDEFAULT":99,"RBREAK":100,"RRETURN":101,"parametros":102,"parametro":103,"parametrosLlamada":104,"RMAIN":105,"RPRINT":106,"listaImprimir":107,"RPRINTLN":108,"accesoStruct":109,"RWHILE":110,"RDO":111,"RSTRUCT":112,"l_atributos":113,"atributo":114,"RFOR":115,"RIN":116,"l_expresiones":117,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"PTCOMA",19:"continue",27:"ID",28:"IGUAL",31:"CORIZQ",32:"CORDER",33:"NUMERAL",34:"PUNTO",35:"COMA",36:"RINT",37:"RDOUBLE",38:"RSTRING",39:"RCHAR",40:"RBOOLEAN",41:"RVOID",42:"MENOS",43:"MAS",44:"POR",45:"DIVIDIDO",46:"MODULO",47:"CONCATENAR",48:"REPETICION",49:"MENOR",50:"MAYOR",51:"MENORIGUAL",52:"MAYORIGUAL",53:"IGUALIGUAL",54:"DIFERENTE",55:"AND",56:"OR",57:"NOT",58:"ENTERO",59:"DECIMAL",60:"CADENA",61:"CARACTER",62:"RTRUE",63:"RFALSE",64:"PARIZQ",65:"PARDER",69:"DOSPT",70:"RPOW",71:"RRAIZ",72:"RSIN",73:"RCOS",74:"RTAN",75:"RLOG",76:"RCARACTEROFPOSITION",77:"RSUBSTRING",78:"RTOUPPERCASE",79:"RTOLOWERCASE",80:"RPARSE",81:"RTOINT",82:"RSSTRING",83:"RTYPEOF",84:"RPOP",85:"RLENGTH",86:"RBEGIN",87:"REND",90:"RIF",91:"LLAVEIZQ",92:"LLAVEDER",93:"RELSE",94:"RSWITCH",98:"RCASE",99:"RDEFAULT",100:"RBREAK",101:"RRETURN",105:"RMAIN",106:"RPRINT",108:"RPRINTLN",110:"RWHILE",111:"RDO",112:"RSTRUCT",115:"RFOR",116:"RIN"},
productions_: [0,[3,2],[4,2],[4,1],[4,1],[6,2],[6,2],[6,1],[6,1],[6,2],[6,2],[6,1],[6,2],[6,2],[6,1],[6,2],[6,2],[6,2],[6,1],[6,1],[6,1],[6,2],[25,1],[25,0],[7,4],[7,2],[7,3],[7,6],[7,7],[7,6],[7,5],[30,3],[30,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[29,2],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,2],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,3],[29,1],[29,2],[29,6],[29,1],[29,1],[29,6],[29,4],[29,4],[29,4],[29,4],[29,4],[29,6],[29,8],[29,5],[29,5],[29,6],[29,4],[29,4],[29,4],[29,4],[29,5],[29,5],[68,1],[68,1],[68,1],[66,3],[88,3],[88,1],[89,1],[89,1],[21,5],[67,4],[67,3],[10,7],[10,11],[10,9],[10,5],[11,8],[95,2],[95,1],[97,4],[96,3],[12,1],[20,2],[23,8],[23,7],[102,3],[102,1],[103,4],[103,2],[24,4],[24,3],[104,3],[104,1],[22,7],[9,4],[9,4],[107,4],[107,2],[107,0],[109,2],[109,0],[13,3],[13,3],[14,7],[15,8],[16,5],[113,3],[113,1],[114,2],[17,11],[17,7],[117,3],[117,1],[18,7]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$;
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 91: case 103: case 111: case 117: case 132: case 137:
 this.$ = [$$[$0]]; 
break;
case 4:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
break;
case 5: case 6: case 9: case 10: case 12: case 13: case 15: case 16: case 17: case 21: case 63: case 89:
 this.$ = $$[$0-1]; 
break;
case 7: case 8: case 11: case 14: case 18: case 19: case 20: case 67: case 68: case 86: case 92: case 93:
 this.$ = $$[$0]; 
break;
case 24:
 this.$ = new Declaracion($$[$0-3], [$$[$0-2]], _$[$0-3].first_line, _$[$0-3].first_column, $$[$0], false, false, false); 
break;
case 25:
 this.$ = new Declaracion($$[$0-1], $$[$0], _$[$0-1].first_line, _$[$0-1].first_column, null, false, false, false); 
break;
case 26:
 this.$ = new Asignacion($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 27:
 this.$ = new Declaracion($$[$0-5], [$$[$0-2]], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0], true, true, false); 
break;
case 28:
 this.$ = new Declaracion($$[$0-6], [$$[$0-3]], _$[$0-6].first_line, _$[$0-6].first_column, $$[$0], true, false, true); 
break;
case 29:
 this.$ = new Declaracion($$[$0-5], [$$[$0-2]], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0], true, false, false); 
break;
case 30:
 this.$ = new Asignacion_atributo($$[$0-4], $$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 31:
this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 32:
 this.$ = new Array(); this.$.push($$[$0]); 
break;
case 33:
 this.$ = Tipo.INT; 
break;
case 34:
 this.$ = Tipo.DOUBLE; 
break;
case 35:
 this.$ = Tipo.STRING; 
break;
case 36:
 this.$ = Tipo.CHAR; 
break;
case 37:
 this.$ = Tipo.BOOL; 
break;
case 38:
 this.$ = Tipo.VOID; 
break;
case 39:
 this.$ = new Aritmetica(OperadorAritmetico.UMENOS, $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 40:
 this.$ = new Aritmetica(OperadorAritmetico.MAS, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 41:
 this.$ = new Aritmetica(OperadorAritmetico.MENOS, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 42:
 this.$ = new Aritmetica(OperadorAritmetico.POR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 43:
 this.$ = new Aritmetica(OperadorAritmetico.DIV, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 44:
 this.$ = new Aritmetica(OperadorAritmetico.MOD, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 45:
 this.$ = new Aritmetica(OperadorAritmetico.CONCATENAR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 46:
 this.$ = new Aritmetica(OperadorAritmetico.REPETIR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 47:
 this.$ = new Relacional(OperadorRelacional.MENORQUE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 48:
 this.$ = new Relacional(OperadorRelacional.MAYORQUE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 49:
 this.$ = new Relacional(OperadorRelacional.MENORIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 50:
 this.$ = new Relacional(OperadorRelacional.MAYORIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 51:
 this.$ = new Relacional(OperadorRelacional.IGUALIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 52:
 this.$ = new Relacional(OperadorRelacional.DIFERENTE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 53:
 this.$ = new Logica(OperadorLogico.AND, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 54:
 this.$ = new Logica(OperadorLogico.OR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 55:
 this.$ = new Logica(OperadorLogico.NOT, $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 56:
 this.$ = new Primitivos(Tipo.INT, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 57:
 this.$ = new Primitivos(Tipo.DOUBLE, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 58:
 this.$ = new Primitivos(Tipo.STRING, String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 59:
 this.$ = new Primitivos(Tipo.CHAR, String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 60:
 this.$ = new Primitivos(Tipo.BOOL, true, _$[$0].first_line, _$[$0].first_column); 
break;
case 61:
 this.$ = new Primitivos(Tipo.BOOL, false, _$[$0].first_line, _$[$0].first_column); 
break;
case 62:
 this.$ = new Identificador(String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 64:
 this.$ = new Primitivos(Tipo.ARRAY, $$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 65:
 this.$ = new AccesoArreglo($$[$0-1], $$[$0], null, null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 66:
 this.$ = new AccesoArreglo($$[$0-5], null, $$[$0-3], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 69:
 this.$ = new Pow($$[$0-3], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 70:
 this.$ = new Raiz($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 71:
 this.$ = new Seno($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 72:
 this.$ = new Coseno($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 73:
 this.$ = new Tangente($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 74:
 this.$ = new Log($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 75:
 this.$ = new Caracter($$[$0-5], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 76:
 this.$ = new SubString($$[$0-7], $$[$0-3], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 77:
 this.$ = new ToUpperCase($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 78:
 this.$ = new ToLowerCase($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 79:
 this.$ = new Parse($$[$0-5], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 80:
 this.$ = new ToInt($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 81:
 this.$ = new ToDouble($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 82:
 this.$ = new SString($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 83:
 this.$ = new TypeOf($$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 84:
 this.$ = new Pop($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 85:
 this.$ = new Length($$[$0-4], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 87: case 88:
 this.$ = true; 
break;
case 90:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 94:
 this.$ = new ModificarArreglo($$[$0-4], $$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 95:
 $$[$0-3].push($$[$0-1]); this.$ = $$[$0-3]; 
break;
case 96:
 this.$ = [$$[$0-1]] 
break;
case 97:
 this.$ = new If($$[$0-4], $$[$0-1], null, null, _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 98:
 this.$ = new If($$[$0-8], $$[$0-5], $$[$0-1], null, _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 99:
 this.$ = new If($$[$0-6], $$[$0-3], null, $$[$0], _$[$0-8].first_line, _$[$0-8].first_column); 
break;
case 100:
 this.$ = new If($$[$0-2], [$$[$0]], null, null, _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 101:
 this.$ = new Switch($$[$0-5], $$[$0-2], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 102:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 104:
 this.$ = new Case($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 105:
 this.$ = new Default($$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 106:
 this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 107:
 this.$ = new Return($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 108:
 this.$ = new Funcion($$[$0-7], $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 109:
 this.$ = new Funcion($$[$0-6], $$[$0-5], [], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 110: case 116: case 131: case 136:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 112:
 this.$ = {'tipo': $$[$0-3], 'identificador': $$[$0-1], 'arreglo':true}; 
break;
case 113:
 this.$ = {'tipo': $$[$0-1], 'identificador': $$[$0], 'arreglo':false}; 
break;
case 114:
 this.$ = new Llamada($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 115:
 this.$ = new Llamada($$[$0-2], [], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 118:
 this.$ = new Main($$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 119:
 this.$ = new Imprimir(false, $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 120:
 this.$ = new Imprimir(true, $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 121:
 $$[$0-3].push({'expresion':$$[$0-1], 'acceso': $$[$0]['acceso']}); this.$ = $$[$0-3]; 
break;
case 122:
 this.$ = [{'expresion':$$[$0-1], 'acceso': $$[$0]['acceso']}]; 
break;
case 123:
 this.$ = []; 
break;
case 124:
 this.$ = {'acceso': $$[$0]}; 
break;
case 125:
 this.$ = {'acceso': null}; 
break;
case 126:
this.$ = new inc_dec(OperadorAritmetico.MAS,$$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column);
break;
case 127:
this.$ = new inc_dec(OperadorAritmetico.MENOS,$$[$0-2],_$[$0-2].first_line, _$[$0-2].first_column);
break;
case 128:
 this.$ = new While($$[$0-4],$$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column);
break;
case 129:
 this.$ = new DoW($$[$0-1],$$[$0-5], _$[$0-7].first_line, _$[$0-7].first_column);
break;
case 130:
 this.$ = new Struct(Tipo.STRUCT, $$[$0-3], _$[$0-4].first_line, _$[$0-4].first_column, [$$[$0-1]]); 
break;
case 133:
 this.$ = new Declaracion_atributo($$[$0-1], $$[$0], _$[$0-1].first_line, _$[$0-1].first_column, null); 
break;
case 134:
 this.$ = new For($$[$0-8], $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 135:
 this.$ = new ForIn($$[$0-5], $$[$0-3], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 138:
 this.$ = new Llamada_struct($$[$0-6],$$[$0-5],$$[$0-3],[$$[$0-1]], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{1:[3]},{5:[1,61],6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($VC,[2,3]),o($VC,[2,4]),{8:[1,63]},{8:[1,64]},o($VC,[2,7]),o($VC,[2,8]),{8:[1,65]},o($VD,$VE,{8:[1,66]}),o($VC,[2,11]),{8:[1,67]},{8:[1,68]},o($VC,[2,14]),{8:[1,69]},{8:[1,70]},{8:[1,71]},o($VC,[2,18]),o($VC,[2,19]),o($VC,[2,20]),o([5,19,27,31,36,37,38,39,40,41,57,58,59,60,61,62,63,64,70,71,72,73,74,75,81,82,83,90,92,94,98,99,100,101,106,108,110,111,112,115],[2,23],{25:72,8:[1,73],34:$VF,42:$VF,43:$VF,44:$VF,45:$VF,46:$VF,47:$VF,48:$VF,49:$VF,50:$VF,51:$VF,52:$VF,53:$VF,54:$VF,55:$VF,56:$VF}),{27:[1,74],30:75,31:$VG,34:$VH},o($VD,$VI,{67:80,27:[1,79],28:$VJ,31:$VK,64:$VL}),{34:[1,83],42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{64:[1,99]},{64:[1,100]},{64:[1,101]},{64:[1,102]},{8:[2,106]},{64:[1,103]},{91:[1,104]},{27:[1,105]},{27:[1,107],64:[1,106]},{13:111,24:110,26:112,27:$V$,29:108,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($V11,$V21,{105:[1,114]}),o($V11,[2,33]),o($V11,$V31,{64:[1,115]}),o($V11,[2,35]),o($V11,[2,36]),o($V11,[2,37]),{13:111,24:110,26:112,27:$V$,29:116,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:117,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($V41,[2,56]),o($V41,[2,57]),o($V41,[2,58]),o($V41,[2,59]),o($V41,[2,60]),o($V41,[2,61]),{13:111,24:110,26:112,27:$V$,29:118,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($V41,[2,64]),{64:[1,119]},{64:[1,120]},{64:[1,121]},{64:[1,122]},{64:[1,123]},{64:[1,124]},{64:[1,125]},{64:[1,126]},{64:[1,127]},{13:111,24:110,26:112,27:$V$,29:131,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:130,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,88:128,89:129},{1:[2,1]},o($VC,[2,2]),o($VC,[2,5]),o($VC,[2,6]),o($VC,[2,9]),o($VC,[2,10]),o($VC,[2,12]),o($VC,[2,13]),o($VC,[2,15]),o($VC,[2,16]),o($VC,[2,17]),o($VC,[2,21]),o($VC,[2,22]),o($V51,$V61,{28:$V71,64:[1,133]}),{8:[2,25],35:[1,134]},{32:[1,135]},{80:[1,136]},{13:111,24:110,26:112,27:$V$,29:137,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{28:[1,138]},o($VD,$V81,{28:[1,139],31:$V91}),{13:111,24:110,26:112,27:$V$,29:143,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,65:[1,142],66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,104:141},{13:111,24:110,26:112,27:$V$,29:145,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,68:144,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,86:$Va1,87:$Vb1},{13:111,24:110,26:112,27:$V$,29:148,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,76:$Vc1,77:$Vd1,78:$Ve1,79:$Vf1,81:$Vp,82:$Vq,83:$Vr,84:$Vg1,85:$Vh1},{13:111,24:110,26:112,27:$V$,29:156,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,43:[1,155],57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:158,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:[1,157],57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:159,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:160,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:161,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:162,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:163,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:164,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:165,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:166,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:167,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:168,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:169,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:170,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:171,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($Vi1,$Vj1,{66:50,24:110,13:111,26:112,107:172,29:173,27:$V$,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr}),o($Vi1,$Vj1,{66:50,24:110,13:111,26:112,29:173,107:174,27:$V$,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr}),{13:111,24:110,26:112,27:$V$,29:175,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:176,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:177,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{2:$V0,4:178,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{91:[1,179]},{7:180,13:111,24:110,26:181,27:[1,182],29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{116:[1,183]},{8:[2,107],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},o($V41,$VI,{67:185,31:$VK,64:$VL}),o($V41,$VF),o($V41,$VE),{34:$VH},o($V11,$V21),{64:[1,186]},{13:111,24:110,26:112,27:$V$,29:187,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($Vl1,[2,39],{34:$Vk1}),o($Vm1,[2,55],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY}),{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,188]},{13:111,24:110,26:112,27:$V$,29:189,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:190,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:191,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:192,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:193,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:194,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:195,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:196,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:197,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{32:[1,198],35:[1,199]},o($Vn1,[2,91]),o([32,34,35,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],[2,92]),o($Vn1,[2,93],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),{13:111,24:110,26:112,27:$V$,29:200,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{26:204,36:$V4,37:$Vo1,38:$V6,39:$V7,40:$V8,41:$V01,65:[1,202],102:201,103:203},{27:[1,206]},{27:[1,207]},{64:[1,208]},{8:[2,26],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{27:[1,209]},{13:111,24:110,26:112,27:$V$,29:210,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:211,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{35:[1,213],65:[1,212]},o($Vp1,[2,115]),o($Vi1,[2,117],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),{69:[1,214]},{32:[1,215],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,69:$Vq1},o($Vr1,[2,87]),o($Vr1,[2,88]),{28:[1,216],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{64:[1,217]},{64:[1,218]},{64:[1,219]},{64:[1,220]},{64:[1,221]},{64:[1,222]},o($V41,[2,126]),o($Vs1,[2,40],{34:$Vk1,44:$VO,45:$VP,46:$VQ}),o($V41,[2,127],{66:50,24:110,13:111,26:112,29:116,27:$V$,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr}),o($Vs1,[2,41],{34:$Vk1,44:$VO,45:$VP,46:$VQ}),o($Vl1,[2,42],{34:$Vk1}),o($Vl1,[2,43],{34:$Vk1}),o($Vl1,[2,44],{34:$Vk1}),o($Vs1,[2,45],{34:$Vk1,44:$VO,45:$VP,46:$VQ}),o($Vs1,[2,46],{34:$Vk1,44:$VO,45:$VP,46:$VQ}),o($Vt1,[2,47],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS}),o($Vt1,[2,48],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS}),o($Vt1,[2,49],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS}),o($Vt1,[2,50],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS}),o($Vt1,[2,51],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS}),o($Vt1,[2,52],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS}),o($Vm1,[2,53],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY}),o([8,28,32,35,56,65,69,91],[2,54],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ}),{35:$Vu1,65:[1,223]},o($Vi1,$Vv1,{109:225,34:$Vw1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),{35:$Vu1,65:[1,227]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,228]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,229]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,230]},{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,231],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{26:234,36:$V4,37:$Vo1,38:$V6,39:$V7,40:$V8,41:$V01,113:232,114:233},{8:[1,235]},{27:[1,236],30:75,31:$VG,34:$VH},o($VD,$VI,{67:185,28:$VJ,31:$VK,64:$VL}),{13:111,24:110,26:112,27:$V$,29:237,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{76:$Vc1,77:$Vd1,78:$Ve1,79:$Vf1,84:$Vg1,85:$Vh1},o($V41,$V81,{31:$V91}),{65:[1,238]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,239]},o($V41,[2,63]),{34:$Vk1,35:[1,240],42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,241]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,242]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,243]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,244]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,245]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,246]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,247]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,248]},o($V41,[2,89]),{13:111,24:110,26:112,27:$V$,29:131,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:130,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,89:249},{8:[2,24],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{35:[1,251],65:[1,250]},{91:[1,252]},o($Vi1,[2,111]),{27:[1,254],31:[1,253]},o([27,31],$V31),o($V51,[2,31]),{28:[1,255]},{13:111,24:110,26:112,27:$V$,29:256,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{64:[1,257]},{8:[1,258],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{32:[1,259],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},o($Vp1,[2,114]),{13:111,24:110,26:112,27:$V$,29:260,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:262,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,68:261,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,86:$Va1,87:$Vb1},o($Vx1,[2,96]),{13:111,24:110,26:112,27:$V$,29:263,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:264,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{13:111,24:110,26:112,27:$V$,29:265,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{65:[1,266]},{65:[1,267]},{65:[1,268]},{65:[1,269]},{8:[2,119]},{13:111,24:110,26:112,27:$V$,29:270,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($Vi1,[2,122]),{13:111,24:110,26:112,27:$V$,29:271,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,76:$Vc1,77:$Vd1,78:$Ve1,79:$Vf1,81:$Vp,82:$Vq,83:$Vr,84:$Vg1,85:$Vh1},{8:[2,120]},{6:273,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,91:[1,272],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{91:[1,274]},{91:[1,275]},{110:[1,276]},{35:[1,278],92:[1,277]},o($Vy1,[2,132]),{27:[1,279]},{13:111,24:110,26:112,27:$V$,29:280,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($V51,$V61,{28:$V71}),{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,91:[1,281]},{91:[1,282]},o($V41,[2,81]),{13:111,24:110,26:112,27:$V$,29:283,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($V41,[2,70]),o($V41,[2,71]),o($V41,[2,72]),o($V41,[2,73]),o($V41,[2,74]),o($V41,[2,80]),o($V41,[2,82]),o($V41,[2,83]),o($Vn1,[2,90]),{91:[1,284]},{26:204,36:$V4,37:$Vo1,38:$V6,39:$V7,40:$V8,41:$V01,103:285},{2:$V0,4:286,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{32:[1,287]},o($Vi1,[2,113]),{13:111,24:110,26:112,27:[1,288],29:290,31:$V3,33:[1,289],36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,291]},{13:111,24:110,26:112,27:$V$,29:293,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,117:292},o($VC,[2,94]),o($Vx1,[2,95]),o($Vi1,[2,116],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),{32:[1,294]},{32:$Vq1,34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{8:[2,30],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,295]},{34:$Vk1,35:[1,296],42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},o($V41,[2,77]),o($V41,[2,78]),o($V41,[2,84]),o($V41,[2,85]),o($Vi1,$Vv1,{109:297,34:$Vw1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),o($Vi1,[2,124],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),{2:$V0,4:298,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($VC,[2,100]),{95:299,97:300,98:$Vz1},{2:$V0,4:302,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{64:[1,303]},{8:[2,130]},{26:234,36:$V4,37:$Vo1,38:$V6,39:$V7,40:$V8,41:$V01,114:304},o($Vy1,[2,133]),{8:[1,305],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},{2:$V0,4:306,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{2:$V0,4:307,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,308]},{2:$V0,4:309,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($Vi1,[2,110]),{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,310],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{27:[1,311]},o($VD,$VI,{67:185,8:[2,27],31:$VK,64:$VL}),{27:[1,312]},{8:[2,29],34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_},o($V41,[2,79]),{35:[1,314],65:[1,313]},o($Vi1,[2,137],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),o($V41,[2,66]),o($V41,[2,75]),{13:111,24:110,26:112,27:$V$,29:315,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($Vi1,[2,121]),{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,316],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{96:317,97:318,98:$Vz1,99:[1,319]},o($VA1,[2,103]),{13:111,24:110,26:112,27:$V$,29:320,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,321],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{13:111,24:110,26:112,27:$V$,29:322,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},o($Vy1,[2,131]),{13:111,24:110,26:112,27:$V$,29:323,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,324],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,325],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($V41,[2,69]),{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,326],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($VC,[2,109]),o($Vi1,[2,112]),{8:[2,28]},{8:[2,138]},{13:111,24:110,26:112,27:$V$,29:327,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V01,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,328]},o($VC,[2,97],{93:[1,329]}),{92:[1,330]},o($VA1,[2,102]),{69:[1,331]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,69:[1,332]},o($VC,[2,128]),{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,333]},{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_,65:[1,334]},o($VC,[2,135]),o($VC,[2,118]),o($VC,[2,108]),o($Vi1,[2,136],{34:$Vk1,42:$VM,43:$VN,44:$VO,45:$VP,46:$VQ,47:$VR,48:$VS,49:$VT,50:$VU,51:$VV,52:$VW,53:$VX,54:$VY,55:$VZ,56:$V_}),o($V41,[2,76]),{10:336,90:$Vs,91:[1,335]},o($VC,[2,101]),{2:$V0,4:337,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{2:$V0,4:338,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{8:[2,129]},{91:[1,339]},{2:$V0,4:340,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($VC,[2,99]),{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[2,105],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($VA1,[2,104],{7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,20:17,21:18,22:19,23:20,24:21,26:22,29:24,66:50,6:62,19:$V1,27:$V2,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB}),{2:$V0,4:341,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,342],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},{6:62,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:$V1,20:17,21:18,22:19,23:20,24:21,26:22,27:$V2,29:24,31:$V3,36:$V4,37:$V5,38:$V6,39:$V7,40:$V8,41:$V9,42:$Va,57:$Vb,58:$Vc,59:$Vd,60:$Ve,61:$Vf,62:$Vg,63:$Vh,64:$Vi,66:50,70:$Vj,71:$Vk,72:$Vl,73:$Vm,74:$Vn,75:$Vo,81:$Vp,82:$Vq,83:$Vr,90:$Vs,92:[1,343],94:$Vt,100:$Vu,101:$Vv,106:$Vw,108:$Vx,110:$Vy,111:$Vz,112:$VA,115:$VB},o($VC,[2,98]),o($VC,[2,134])],
defaultActions: {29:[2,106],61:[2,1],223:[2,119],227:[2,120],277:[2,130],312:[2,28],313:[2,138],333:[2,129]},
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
case 6:return 35;
break;
case 7:return 34;
break;
case 8:return 69;
break;
case 9:return 'TERNARIO';
break;
case 10:return 33;
break;
case 11:return 64;
break;
case 12:return 65;
break;
case 13:return 31;
break;
case 14:return 32;
break;
case 15:return 91;
break;
case 16:return 92;
break;
case 17:return 43;
break;
case 18:return 42;
break;
case 19:return 44;
break;
case 20:return 45;
break;
case 21:return 46;
break;
case 22:return 53;
break;
case 23:return 54;
break;
case 24:return 52;
break;
case 25:return 51;
break;
case 26:return 50;
break;
case 27:return 49;
break;
case 28:return 28;
break;
case 29:return 55;
break;
case 30:return 56;
break;
case 31:return 57;
break;
case 32:return 47;
break;
case 33:return 48;
break;
case 34:return 36;
break;
case 35:return 37;
break;
case 36:return 'RFLOAT';
break;
case 37:return 38;
break;
case 38:return 39
break;
case 39:return 40;
break;
case 40:return 62;
break;
case 41:return 63;
break;
case 42:return 41;
break;
case 43:return 'RNULL';
break;
case 44:return 108;
break;
case 45:return 106;
break;
case 46:return 105;
break;
case 47:return 90;
break;
case 48:return 93;
break;
case 49:return 94;
break;
case 50:return 98;
break;
case 51:return 86;
break;
case 52:return 87;
break;
case 53:return 99;
break;
case 54:return 100;
break;
case 55:return 110;
break;
case 56:return 111;
break;
case 57:return 112;
break;
case 58:return	'RFOR';
break;
case 59:return 116;
break;
case 60:return 'RCONTINUE';
break;
case 61:return 101;
break;
case 62:return 70;
break;
case 63:return 71;
break;
case 64:return 72;
break;
case 65:return 73;
break;
case 66:return 74;
break;
case 67:return 75;
break;
case 68:return 76;
break;
case 69:return 77;
break;
case 70:return 78;
break;
case 71:return 79;
break;
case 72:return 80;
break;
case 73:return 81;
break;
case 74:return 'RTODOUBLE';
break;
case 75:return 82;
break;
case 76:return 83;
break;
case 77:return 'RPUSH';
break;
case 78:return 84;
break;
case 79:return 85;
break;
case 80:
break;
case 81:
break;
case 82:
break;
case 83:
break;
case 84:return 59;
break;
case 85:return 58;
break;
case 86:return 27;
break;
case 87:
                            yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2)
                            return 60
                        
break;
case 88:
                            yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2)
                            return 61
                        
break;
case 89:return 5;
break;
case 90: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
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
},{"./AST/Tipo":6,"./Expresiones/AccesoArreglo":8,"./Expresiones/Aritmetica":9,"./Expresiones/Identificador":10,"./Expresiones/Logica":11,"./Expresiones/Primitivos":12,"./Expresiones/Relacional":13,"./Instrucciones/Asignacion":14,"./Instrucciones/Asignacion_atributo":15,"./Instrucciones/Break":16,"./Instrucciones/Case":17,"./Instrucciones/Continue":18,"./Instrucciones/Declaracion":19,"./Instrucciones/Declaracion_atributo":20,"./Instrucciones/Default":21,"./Instrucciones/DoW":22,"./Instrucciones/For":23,"./Instrucciones/ForIn":24,"./Instrucciones/Funcion":25,"./Instrucciones/If":26,"./Instrucciones/Imprimir":27,"./Instrucciones/Llamada":28,"./Instrucciones/Main":29,"./Instrucciones/ModificarArreglo":30,"./Instrucciones/Return":31,"./Instrucciones/Switch":32,"./Instrucciones/inc_dec":33,"./Instrucciones/llamada_struct":34,"./Instrucciones/struct":35,"./Instrucciones/while":36,"./Nativas/Caracter":37,"./Nativas/Coseno":38,"./Nativas/Length":39,"./Nativas/Log":40,"./Nativas/Parse":41,"./Nativas/Pop":42,"./Nativas/Pow":43,"./Nativas/Push":44,"./Nativas/Raiz":45,"./Nativas/SString":46,"./Nativas/Seno":47,"./Nativas/SubString":48,"./Nativas/Tangente":49,"./Nativas/ToDouble":50,"./Nativas/ToInt":51,"./Nativas/ToLowerCase":52,"./Nativas/ToUpperCase":53,"./Nativas/TypeOf":54,"_process":59,"fs":57,"path":58}],56:[function(require,module,exports){
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

    const instrucciones = parse(textoIngresado);
    console.log(instrucciones)
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);

    for (let instruccion of ast.getInstrucciones()) { // Primera Pasada
        if (instruccion instanceof Funcion) {
            ast.addFuncion(instruccion);
            continue;
        }

        if ((instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct)) {
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
        if (!((instruccion instanceof Funcion) || (instruccion instanceof Main) || (instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct))) {
            let err = new Excepcion("Semantico", "Sentencia fuera de Main", instruccion.fila, instruccion.columna);
            ast.getExcepciones().push(err);
            ast.updateConsola(err.toString());
        }
    }

    //console.log(ast.getConsola());
    document.getElementById("editorSalida").value  =ast.getConsola();
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
},{"./JS/AST/AST":1,"./JS/AST/Entorno":3,"./JS/AST/Excepcion":4,"./JS/Instrucciones/Asignacion":14,"./JS/Instrucciones/Declaracion":19,"./JS/Instrucciones/Funcion":25,"./JS/Instrucciones/Imprimir":27,"./JS/Instrucciones/Main":29,"./JS/Instrucciones/ModificarArreglo":30,"./JS/Instrucciones/struct":35,"./JS/gramatica":55}],57:[function(require,module,exports){

},{}],58:[function(require,module,exports){
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
},{"_process":59}],59:[function(require,module,exports){
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

},{}]},{},[56])(56)
});
