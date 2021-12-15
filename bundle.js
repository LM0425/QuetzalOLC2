(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.load = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        // this.structs = []
        this.funciones = [];
        this.excepciones = [];
        this.consola = "";
        this.TSGlobal = null;
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
}
exports.AST = AST;

},{}],2:[function(require,module,exports){
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
                    console.log("Modificando simbolo");
                    tablaActual.tabla[id].setValor(simbolo.getValor());
                    return null;
                }
                else {
                    console.log("Tipo diferente en modificacion");
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

},{"./Excepcion":3}],3:[function(require,module,exports){
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
        return this.tipo + " - " + this.descripcion + " [" + String(this.fila) + "," + String(this.columna) + "]";
    }
}
exports.Excepcion = Excepcion;

},{}],4:[function(require,module,exports){
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
}
exports.Simbolo = Simbolo;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
            // Definir el tipo de dato que estoy retornando
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
            // Definir el tipo de dato que estoy retornando
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

},{"../AST/Excepcion":3,"../AST/Tipo":5}],7:[function(require,module,exports){
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
            //console.log('entrando a suma',this.opIzquierdo.tipo,this.opDerecho.tipo)
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
                return izq.charCodeAt(0) - der.charCodeAt(0);
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
                return izq.charCodeAt(0) * der.charCodeAt(0);
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
                return izq.charCodeAt(0) / der.charCodeAt(0);
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
                return izq.charCodeAt(0) % der.charCodeAt(0);
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.CONCATENAR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.STRING) {
                this.tipo = Tipo_1.Tipo.STRING;
                return izq + der;
            }
        }
        else if (this.operador === Tipo_1.OperadorAritmetico.REPETIR) {
            if (this.opIzquierdo.tipo === Tipo_1.Tipo.STRING && this.opDerecho.tipo === Tipo_1.Tipo.INT) {
                this.tipo = Tipo_1.Tipo.STRING;
                var resultado = izq.repeat(Number(der));
                //console.log("iterar:", der);
                return resultado;
            }
        }
        else {
            return new Excepcion_1.Excepcion("Semantico", "Tipo de dato erroneo para operacion +", this.fila, this.columna);
        }
    }
}
exports.Aritmetica = Aritmetica;

},{"../AST/Excepcion":3,"../AST/Tipo":5}],8:[function(require,module,exports){
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
    interpretar(tree, table) {
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null)
            return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);
        this.tipo = simbolo.getTipo();
        return simbolo.getValor();
    }
}
exports.Identificador = Identificador;

},{"../AST/Excepcion":3}],9:[function(require,module,exports){
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

},{"../AST/Excepcion":3,"../AST/Tipo":5}],10:[function(require,module,exports){
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

},{"../AST/Excepcion":3,"../AST/Tipo":5}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Relacional {
    constructor(operador, opIzquierdo, opDerecho, fila, columna) {
        this.operador = operador;
        this.opIzquierdo = opIzquierdo;
        this.opDerecho = opDerecho;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo_1.Tipo.BOOL;
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
}
exports.Relacional = Relacional;

},{"../AST/Excepcion":3,"../AST/Tipo":5}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
class Asignacion {
    constructor(identificador, expresion, fila, columna) {
        this.identificador = identificador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion_1.Excepcion)
            return value;
        let simbolo = new Simbolo_1.Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
        let result = table.actualizarTabla(simbolo);
        if (result instanceof Excepcion_1.Excepcion)
            return result;
        return null;
    }
}
exports.Asignacion = Asignacion;

},{"../AST/Excepcion":3,"../AST/Simbolo":4}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
class Break {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        return this;
    }
}
exports.Break = Break;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
class Case {
    constructor(expresion, instrucciones, fila, columna) {
        this.expresion = expresion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        return this;
    }
}
exports.Case = Case;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
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
                if (this.tipo !== this.expresion.tipo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
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

},{"../AST/Excepcion":3,"../AST/Simbolo":4,"../AST/Tipo":5}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
class Default {
    constructor(instrucciones, fila, columna) {
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(tree, table) {
        return this;
    }
}
exports.Default = Default;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
const Return_1 = require("./Return");
class Funcion {
    constructor(tipo, nombre, parametros, instrucciones, fila, columna) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"./Return":23}],18:[function(require,module,exports){
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Tipo":5,"./Return":23}],19:[function(require,module,exports){
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
    }
    interpretar(tree, table) {
        let cadena = "";
        for (let imprimir of this.expresion) {
            let value = imprimir.interpretar(tree, table);
            if (value instanceof Excepcion_1.Excepcion)
                return value;
            // Agregar ciclo interpretar
            if (imprimir.tipo === Tipo_1.Tipo.ARRAY) {
                cadena += "[" + value + "]";
            }
            else {
                cadena += value;
            }
        }
        tree.updateConsola(cadena);
        if (this.salto === true)
            tree.updateConsola('\n');
        return this;
    }
}
exports.Imprimir = Imprimir;

},{"../AST/Excepcion":3,"../AST/Tipo":5}],20:[function(require,module,exports){
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"../AST/Simbolo":4,"../AST/Tipo":5}],21:[function(require,module,exports){
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

},{"../AST/Entorno":2,"../AST/Excepcion":3}],22:[function(require,module,exports){
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

},{"../AST/Excepcion":3,"../AST/Tipo":5}],23:[function(require,module,exports){
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

},{"../AST/Excepcion":3}],24:[function(require,module,exports){
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

},{"../AST/Entorno":2,"../AST/Excepcion":3,"./Break":13,"./Return":23}],25:[function(require,module,exports){
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,16],$V2=[1,24],$V3=[1,25],$V4=[1,26],$V5=[1,27],$V6=[1,28],$V7=[1,23],$V8=[1,19],$V9=[1,20],$Va=[1,21],$Vb=[1,22],$Vc=[1,17],$Vd=[1,18],$Ve=[5,20,28,29,30,31,32,33,65,67,69,73,74,75,76,81,83],$Vf=[1,42],$Vg=[1,57],$Vh=[1,61],$Vi=[1,49],$Vj=[1,50],$Vk=[1,51],$Vl=[1,52],$Vm=[1,53],$Vn=[1,54],$Vo=[1,55],$Vp=[1,56],$Vq=[1,58],$Vr=[20,24],$Vs=[2,30],$Vt=[8,27],$Vu=[1,69],$Vv=[27,56],$Vw=[2,95],$Vx=[1,80],$Vy=[1,79],$Vz=[1,81],$VA=[1,82],$VB=[1,83],$VC=[1,84],$VD=[1,85],$VE=[1,86],$VF=[1,87],$VG=[1,88],$VH=[1,89],$VI=[1,90],$VJ=[1,91],$VK=[1,92],$VL=[8,25,27,34,35,36,37,38,39,40,41,42,43,44,45,46,47,56,60],$VM=[2,53],$VN=[1,96],$VO=[1,108],$VP=[5,8,20,25,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,56,60,65,67,69,73,74,75,76,81,83],$VQ=[1,115],$VR=[1,117],$VS=[8,25,27,46,47,56,60],$VT=[1,137],$VU=[1,138],$VV=[25,27],$VW=[8,21,24,25,27,34,35,36,37,38,39,40,41,42,43,44,45,46,47,56,60],$VX=[8,25,27,34,35,38,39,40,41,42,43,44,45,46,47,56,60],$VY=[8,25,27,40,41,42,43,44,45,46,47,56,60],$VZ=[2,59],$V_=[25,60],$V$=[1,168],$V01=[73,74];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"instrucciones":4,"EOF":5,"instruccion":6,"variables":7,"PTCOMA":8,"imprimir":9,"if":10,"switch":11,"break":12,"return":13,"modificarArreglo":14,"main":15,"funcion":16,"llamada":17,"ptc":18,"tipo":19,"ID":20,"IGUAL":21,"expresion":22,"listaid":23,"CORIZQ":24,"CORDER":25,"NUMERAL":26,"COMA":27,"RINT":28,"RDOUBLE":29,"RSTRING":30,"RCHAR":31,"RBOOLEAN":32,"RVOID":33,"MENOS":34,"MAS":35,"POR":36,"DIVIDIDO":37,"CONCATENAR":38,"REPETICION":39,"MENOR":40,"MAYOR":41,"MENORIGUAL":42,"MAYORIGUAL":43,"IGUALIGUAL":44,"DIFERENTE":45,"AND":46,"OR":47,"NOT":48,"ENTERO":49,"DECIMAL":50,"CADENA":51,"CARACTER":52,"RTRUE":53,"RFALSE":54,"PARIZQ":55,"PARDER":56,"declaracionArregloT1":57,"listaExpresiones":58,"posicion":59,"DOSPT":60,"RBEGIN":61,"REND":62,"listaValores":63,"valores":64,"RIF":65,"LLAVEIZQ":66,"LLAVEDER":67,"RELSE":68,"RSWITCH":69,"caselist":70,"default":71,"case":72,"RCASE":73,"RDEFAULT":74,"RBREAK":75,"RRETURN":76,"parametros":77,"parametro":78,"parametrosLlamada":79,"RMAIN":80,"RPRINT":81,"listaImprimir":82,"RPRINTLN":83,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"PTCOMA",20:"ID",21:"IGUAL",24:"CORIZQ",25:"CORDER",26:"NUMERAL",27:"COMA",28:"RINT",29:"RDOUBLE",30:"RSTRING",31:"RCHAR",32:"RBOOLEAN",33:"RVOID",34:"MENOS",35:"MAS",36:"POR",37:"DIVIDIDO",38:"CONCATENAR",39:"REPETICION",40:"MENOR",41:"MAYOR",42:"MENORIGUAL",43:"MAYORIGUAL",44:"IGUALIGUAL",45:"DIFERENTE",46:"AND",47:"OR",48:"NOT",49:"ENTERO",50:"DECIMAL",51:"CADENA",52:"CARACTER",53:"RTRUE",54:"RFALSE",55:"PARIZQ",56:"PARDER",60:"DOSPT",61:"RBEGIN",62:"REND",65:"RIF",66:"LLAVEIZQ",67:"LLAVEDER",68:"RELSE",69:"RSWITCH",73:"RCASE",74:"RDEFAULT",75:"RBREAK",76:"RRETURN",80:"RMAIN",81:"RPRINT",83:"RPRINTLN"},
productions_: [0,[3,2],[4,2],[4,1],[4,1],[6,2],[6,2],[6,1],[6,1],[6,2],[6,2],[6,1],[6,1],[6,1],[6,2],[18,1],[18,0],[7,4],[7,2],[7,3],[7,6],[7,7],[7,6],[23,3],[23,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[22,2],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,3],[22,2],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,3],[22,1],[22,2],[22,6],[22,1],[59,1],[59,1],[59,1],[57,3],[63,3],[63,1],[64,1],[64,1],[14,5],[58,4],[58,3],[10,7],[10,11],[10,9],[11,8],[70,2],[70,1],[72,4],[71,3],[12,1],[13,2],[16,8],[16,7],[77,3],[77,1],[78,4],[78,2],[17,4],[17,3],[79,3],[79,1],[15,7],[9,4],[9,4],[82,3],[82,1],[82,0]],
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
case 3: case 64: case 75: case 83: case 89: case 94:
 this.$ = [$$[$0]]; 
break;
case 4:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
break;
case 5: case 6: case 9: case 10: case 14: case 54: case 62:
 this.$ = $$[$0-1]; 
break;
case 7: case 8: case 11: case 12: case 13: case 58: case 59: case 65: case 66:
 this.$ = $$[$0]; 
break;
case 17:
 this.$ = new Declaracion($$[$0-3], [$$[$0-2]], _$[$0-3].first_line, _$[$0-3].first_column, $$[$0], false, false, false); 
break;
case 18:
 this.$ = new Declaracion($$[$0-1], $$[$0], _$[$0-1].first_line, _$[$0-1].first_column, null, false, false, false); 
break;
case 19:
 this.$ = new Asignacion($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 20:
 this.$ = new Declaracion($$[$0-5], [$$[$0-2]], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0], true, true, false); 
break;
case 21:
 this.$ = new Declaracion($$[$0-6], [$$[$0-3]], _$[$0-6].first_line, _$[$0-6].first_column, $$[$0], true, false, true); 
break;
case 22:
 this.$ = new Declaracion($$[$0-5], [$$[$0-2]], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0], true, false, false); 
break;
case 23:
this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 24:
 this.$ = new Array(); this.$.push($$[$0]); 
break;
case 25:
 this.$ = Tipo.INT; 
break;
case 26:
 this.$ = Tipo.DOUBLE; 
break;
case 27:
 this.$ = Tipo.STRING; 
break;
case 28:
 this.$ = Tipo.CHAR; 
break;
case 29:
 this.$ = Tipo.BOOL; 
break;
case 30:
 this.$ = Tipo.VOID; 
break;
case 31:
 this.$ = new Aritmetica(OperadorAritmetico.UMENOS, $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 32:
 this.$ = new Aritmetica(OperadorAritmetico.MAS, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 33:
 this.$ = new Aritmetica(OperadorAritmetico.MENOS, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 34:
 this.$ = new Aritmetica(OperadorAritmetico.POR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 35:
 this.$ = new Aritmetica(OperadorAritmetico.DIV, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 36:
 this.$ = new Aritmetica(OperadorAritmetico.CONCATENAR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 37:
 this.$ = new Aritmetica(OperadorAritmetico.REPETIR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 38:
 this.$ = new Relacional(OperadorRelacional.MENORQUE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 39:
 this.$ = new Relacional(OperadorRelacional.MAYORQUE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 40:
 this.$ = new Relacional(OperadorRelacional.MENORIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 41:
 this.$ = new Relacional(OperadorRelacional.MAYORIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 42:
 this.$ = new Relacional(OperadorRelacional.IGUALIGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 43:
 this.$ = new Relacional(OperadorRelacional.DIFERENTE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 44:
 this.$ = new Logica(OperadorLogico.AND, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 45:
 this.$ = new Logica(OperadorLogico.OR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 46:
 this.$ = new Logica(OperadorLogico.NOT, $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 47:
 this.$ = new Primitivos(Tipo.INT, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 48:
 this.$ = new Primitivos(Tipo.DOUBLE, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 49:
 this.$ = new Primitivos(Tipo.STRING, String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 50:
 this.$ = new Primitivos(Tipo.CHAR, String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 51:
 this.$ = new Primitivos(Tipo.BOOL, true, _$[$0].first_line, _$[$0].first_column); 
break;
case 52:
 this.$ = new Primitivos(Tipo.BOOL, false, _$[$0].first_line, _$[$0].first_column); 
break;
case 53:
 this.$ = new Identificador(String($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 55:
 this.$ = new Primitivos(Tipo.ARRAY, $$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 56:
 this.$ = new AccesoArreglo($$[$0-1], $$[$0], null, null, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 57:
 this.$ = new AccesoArreglo($$[$0-5], null, $$[$0-3], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 60: case 61:
 this.$ = true; 
break;
case 63:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 67:
 this.$ = new ModificarArreglo($$[$0-4], $$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 68:
 $$[$0-3].push($$[$0-1]); this.$ = $$[$0-3]; 
break;
case 69:
 this.$ = [$$[$0-1]] 
break;
case 70:
 this.$ = new If($$[$0-4], $$[$0-1], null, null, _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 71:
 this.$ = new If($$[$0-8], $$[$0-5], $$[$0-1], null, _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 72:
 this.$ = new If($$[$0-6], $$[$0-3], null, $$[$0], _$[$0-8].first_line, _$[$0-8].first_column); 
break;
case 73:
 this.$ = new Switch($$[$0-5], $$[$0-2], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 74:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 76:
 this.$ = new Case($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 77:
 this.$ = new Default($$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 78:
 this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 79:
 this.$ = new Return($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 80:
 this.$ = new Funcion($$[$0-7], $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 81:
 this.$ = new Funcion($$[$0-6], $$[$0-5], [], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 82: case 88: case 93:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 84:
 this.$ = {'tipo': $$[$0-3], 'identificador': $$[$0-1], 'arreglo':true}; 
break;
case 85:
 this.$ = {'tipo': $$[$0-1], 'identificador': $$[$0], 'arreglo':false}; 
break;
case 86:
 this.$ = new Llamada($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 87:
 this.$ = new Llamada($$[$0-2], [], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 90:
 this.$ = new Main($$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 91:
 this.$ = new Imprimir(false, $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 92:
 this.$ = new Imprimir(true, $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 95:
 this.$ = []; 
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{1:[3]},{5:[1,29],6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},o($Ve,[2,3]),o($Ve,[2,4]),{8:[1,31]},{8:[1,32]},o($Ve,[2,7]),o($Ve,[2,8]),{8:[1,33]},{8:[1,34]},o($Ve,[2,11]),o($Ve,[2,12]),o($Ve,[2,13]),o($Ve,[2,16],{18:35,8:[1,36]}),{20:[1,37],23:38,24:[1,39]},{21:[1,40],24:[1,43],55:$Vf,58:41},{55:[1,44]},{55:[1,45]},{55:[1,46]},{55:[1,47]},{8:[2,78]},{17:60,20:$Vg,22:48,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($Vr,$Vs,{80:[1,62]}),o($Vr,[2,25]),o($Vr,[2,26]),o($Vr,[2,27]),o($Vr,[2,28]),o($Vr,[2,29]),{1:[2,1]},o($Ve,[2,2]),o($Ve,[2,5]),o($Ve,[2,6]),o($Ve,[2,9]),o($Ve,[2,10]),o($Ve,[2,14]),o($Ve,[2,15]),o($Vt,[2,24],{21:[1,63],55:[1,64]}),{8:[2,18],27:[1,65]},{25:[1,66]},{17:60,20:$Vg,22:67,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{21:[1,68],24:$Vu},{17:60,20:$Vg,22:72,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,56:[1,71],57:59,79:70},{17:60,20:$Vg,22:73,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($Vv,$Vw,{57:59,17:60,82:74,22:75,20:$Vg,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq}),o($Vv,$Vw,{57:59,17:60,22:75,82:76,20:$Vg,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq}),{17:60,20:$Vg,22:77,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:78,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{8:[2,79],34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{17:60,20:$Vg,22:93,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:94,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($VL,[2,47]),o($VL,[2,48]),o($VL,[2,49]),o($VL,[2,50]),o($VL,[2,51]),o($VL,[2,52]),o($VL,$VM,{58:95,24:$VN,55:$Vf}),{17:60,20:$Vg,22:97,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($VL,[2,55]),o($VL,[2,58]),{17:60,20:$Vg,22:101,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:100,63:98,64:99},{55:[1,102]},{17:60,20:$Vg,22:103,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{19:107,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$VO,56:[1,105],77:104,78:106},{20:[1,109]},{20:[1,110]},{8:[2,19],34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{17:60,20:$Vg,22:111,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:112,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{27:[1,114],56:[1,113]},o($VP,[2,87]),o($Vv,[2,89],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK}),{25:$VQ,34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{27:$VR,56:[1,116]},o($Vv,[2,94],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK}),{27:$VR,56:[1,118]},{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK,56:[1,119]},{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK,56:[1,120]},{17:60,20:$Vg,22:121,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:122,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:123,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:124,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:125,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:126,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:127,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:128,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:129,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:130,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:131,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:132,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:133,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{17:60,20:$Vg,22:134,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($VL,[2,31]),o($VS,[2,46],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI}),o($VL,[2,56],{24:$Vu}),{17:60,20:$Vg,22:136,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59,59:135,61:$VT,62:$VU},{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK,56:[1,139]},{25:[1,140],27:[1,141]},o($VV,[2,64]),o([25,27,34,35,36,37,38,39,40,41,42,43,44,45,46,47],[2,65]),o($VV,[2,66],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK}),{56:[1,142]},{8:[2,17],34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{27:[1,144],56:[1,143]},{66:[1,145]},o($Vv,[2,83]),{20:[1,147],24:[1,146]},o($Vr,$Vs),o($Vt,[2,23]),{21:[1,148]},{8:[1,149],34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{25:[1,150],34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},o($VP,[2,86]),{17:60,20:$Vg,22:151,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($VW,[2,69]),{8:[2,91]},{17:60,20:$Vg,22:152,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{8:[2,92]},{66:[1,153]},{66:[1,154]},o($VX,[2,32],{36:$Vz,37:$VA}),o($VX,[2,33],{36:$Vz,37:$VA}),o($VL,[2,34]),o($VL,[2,35]),o($VX,[2,36],{36:$Vz,37:$VA}),o($VX,[2,37],{36:$Vz,37:$VA}),o($VY,[2,38],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC}),o($VY,[2,39],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC}),o($VY,[2,40],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC}),o($VY,[2,41],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC}),o($VY,[2,42],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC}),o($VY,[2,43],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC}),o($VS,[2,44],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI}),o([8,25,27,47,56,60],[2,45],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ}),{60:[1,155]},{25:$VQ,34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK,60:$VZ},o($V_,[2,60]),o($V_,[2,61]),o($VL,[2,54]),o($VL,[2,62]),{17:60,20:$Vg,22:101,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:100,64:156},{66:[1,157]},{66:[1,158]},{19:107,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$VO,78:159},{2:$V0,4:160,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{25:[1,161]},o($Vv,[2,85]),{17:60,20:[1,162],22:164,24:$Vh,26:[1,163],34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},o($Ve,[2,67]),o($VW,[2,68]),o($Vv,[2,88],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK}),o($Vv,[2,93],{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK}),{2:$V0,4:165,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{70:166,72:167,73:$V$},{17:60,20:$Vg,22:170,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59,59:169,61:$VT,62:$VU},o($VV,[2,63]),{2:$V0,4:171,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{2:$V0,4:172,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},o($Vv,[2,82]),{6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,67:[1,173],69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{20:[1,174]},o([34,35,36,37,38,39,40,41,42,43,44,45,46,47],$VM,{58:95,8:[2,20],24:$VN,55:$Vf}),{20:[1,175]},{8:[2,22],34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,67:[1,176],69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{71:177,72:178,73:$V$,74:[1,179]},o($V01,[2,75]),{17:60,20:$Vg,22:180,24:$Vh,34:$Vi,48:$Vj,49:$Vk,50:$Vl,51:$Vm,52:$Vn,53:$Vo,54:$Vp,55:$Vq,57:59},{25:[1,181]},{25:$VZ,34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK},{6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,67:[1,182],69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,67:[1,183],69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},o($Ve,[2,81]),o($Vv,[2,84]),{8:[2,21]},o($Ve,[2,70],{68:[1,184]}),{67:[1,185]},o($V01,[2,74]),{60:[1,186]},{34:$Vx,35:$Vy,36:$Vz,37:$VA,38:$VB,39:$VC,40:$VD,41:$VE,42:$VF,43:$VG,44:$VH,45:$VI,46:$VJ,47:$VK,60:[1,187]},o($VL,[2,57]),o($Ve,[2,90]),o($Ve,[2,80]),{10:189,65:$V8,66:[1,188]},o($Ve,[2,73]),{2:$V0,4:190,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{2:$V0,4:191,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},{2:$V0,4:192,6:3,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},o($Ve,[2,72]),{6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,67:[2,77],69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},o($V01,[2,76],{7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,6:30,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd}),{6:30,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,19:15,20:$V1,28:$V2,29:$V3,30:$V4,31:$V5,32:$V6,33:$V7,65:$V8,67:[1,193],69:$V9,75:$Va,76:$Vb,81:$Vc,83:$Vd},o($Ve,[2,71])],
defaultActions: {21:[2,78],29:[2,1],116:[2,91],118:[2,92],175:[2,21]},
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
	// const { Continue } = require("./Instrucciones/Continue");
	const { Return } = require("./Instrucciones/Return");
	const { ModificarArreglo } = require("./Instrucciones/ModificarArreglo");
	const { AccesoArreglo } = require("./Expresiones/AccesoArreglo");
	const { Main } = require("./Instrucciones/Main");
	const { Funcion } = require("./Instrucciones/Funcion");
	const { Llamada } = require("./Instrucciones/Llamada");
	
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
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 8;
break;
case 1:return 27;
break;
case 2:return 'PUNTO';
break;
case 3:return 60;
break;
case 4:return 'TERNARIO';
break;
case 5:return 26;
break;
case 6:return 55;
break;
case 7:return 56;
break;
case 8:return 24;
break;
case 9:return 25;
break;
case 10:return 66;
break;
case 11:return 67;
break;
case 12:return 35;
break;
case 13:return 34;
break;
case 14:return 36;
break;
case 15:return 37;
break;
case 16:return 'MODULO';
break;
case 17:return 44;
break;
case 18:return 45;
break;
case 19:return 43;
break;
case 20:return 42;
break;
case 21:return 41;
break;
case 22:return 40;
break;
case 23:return 21;
break;
case 24:return 46;
break;
case 25:return 47;
break;
case 26:return 48;
break;
case 27:return 38;
break;
case 28:return 39;
break;
case 29:return 28;
break;
case 30:return 29;
break;
case 31:return 'RFLOAT';
break;
case 32:return 30;
break;
case 33:return 31
break;
case 34:return 32;
break;
case 35:return 53;
break;
case 36:return 54;
break;
case 37:return 33;
break;
case 38:return 'RNULL';
break;
case 39:return 83;
break;
case 40:return 81;
break;
case 41:return 80;
break;
case 42:return 65;
break;
case 43:return 68;
break;
case 44:return 69;
break;
case 45:return 73;
break;
case 46:return 61;
break;
case 47:return 62;
break;
case 48:return 74;
break;
case 49:return 75;
break;
case 50:return 'RCONTINUE';
break;
case 51:return 76;
break;
case 52:
break;
case 53:
break;
case 54:
break;
case 55:
break;
case 56:return 50;
break;
case 57:return 49;
break;
case 58:return 20;
break;
case 59:
                            yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2)
                            return 51
                        
break;
case 60:
                            yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2)
                            return 52
                        
break;
case 61:return 5;
break;
case 62: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:;)/i,/^(?:,)/i,/^(?:\.)/i,/^(?::)/i,/^(?:\?)/i,/^(?:#)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:=)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:&)/i,/^(?:\^)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:float\b)/i,/^(?:String\b)/i,/^(?:char\b)/i,/^(?:boolean\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:void\b)/i,/^(?:null\b)/i,/^(?:println\b)/i,/^(?:print\b)/i,/^(?:main\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:begin\b)/i,/^(?:end\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:[//.*[^\n])/i,/^(?:[/\*(.|\n)*?\*/])/i,/^(?:[0-9]+\.[0-9]+\b)/i,/^(?:[0-9]+\b)/i,/^(?:[a-zA-Z][a-zA-Z_0-9]*)/i,/^(?:[\"]((\\")|(\\')|(\\\n)|[^\"])*[\"])/i,/^(?:[\']((\\\n)|(\\")|(\\')|[^\'])[\'])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62],"inclusive":true}}
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
},{"./AST/Tipo":5,"./Expresiones/AccesoArreglo":6,"./Expresiones/Aritmetica":7,"./Expresiones/Identificador":8,"./Expresiones/Logica":9,"./Expresiones/Primitivos":10,"./Expresiones/Relacional":11,"./Instrucciones/Asignacion":12,"./Instrucciones/Break":13,"./Instrucciones/Case":14,"./Instrucciones/Declaracion":15,"./Instrucciones/Default":16,"./Instrucciones/Funcion":17,"./Instrucciones/If":18,"./Instrucciones/Imprimir":19,"./Instrucciones/Llamada":20,"./Instrucciones/Main":21,"./Instrucciones/ModificarArreglo":22,"./Instrucciones/Return":23,"./Instrucciones/Switch":24,"_process":29,"fs":27,"path":28}],26:[function(require,module,exports){
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

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);

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

        if ((instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo)) {
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
        if (!((instruccion instanceof Funcion) || (instruccion instanceof Main) || (instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo))) {
            let err = new Excepcion("Semantico", "Sentencia fuera de Main", instruccion.fila, instruccion.columna);
            ast.getExcepciones().push(err);
            ast.updateConsola(err.toString());
        }
    }

    console.log(ast.getConsola());
}

// function numeracion(e) {
//     let eArea = document.getElementById('areaNumeracion');
//     let eArea2 = document.getElementById('txCodigo');
//     let numeros = eArea2.value.split("\n").length;
//     let msj="";
//     for (let i = 0; i < numeros; i++) {
//         msj += i + "\n";
//     }
//     eArea.value=msj;
// }
},{"./JS/AST/AST":1,"./JS/AST/Entorno":2,"./JS/AST/Excepcion":3,"./JS/Instrucciones/Asignacion":12,"./JS/Instrucciones/Declaracion":15,"./JS/Instrucciones/Funcion":17,"./JS/Instrucciones/Imprimir":19,"./JS/Instrucciones/Main":21,"./JS/Instrucciones/ModificarArreglo":22,"./JS/gramatica":25}],27:[function(require,module,exports){

},{}],28:[function(require,module,exports){
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
},{"_process":29}],29:[function(require,module,exports){
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

},{}]},{},[26])(26)
});
