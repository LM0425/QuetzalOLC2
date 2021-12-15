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
