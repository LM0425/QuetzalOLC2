"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imprimir = void 0;
<<<<<<< Updated upstream
const Excepcion_1 = require("../AST/Excepcion");
const Tipo_1 = require("../AST/Tipo");
class Imprimir {
    constructor(salto, expresion, fila, columna) {
        this.salto = salto;
=======
const Tipo_1 = require("../AST/Tipo");
class Imprimir {
    constructor(expresion, fila, columna, atributo, salto) {
>>>>>>> Stashed changes
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.atributo = atributo;
        this.salto = salto;
    }
    interpretar(tree, table) {
<<<<<<< Updated upstream
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
=======
        if (this.atributo == null) {
            //tree.mostrarStruct();
            /* let estructura=tree.getStrut(this.expresion);
            console.log('la estruct es', estructura); */
            let value = this.expresion.interpretar(tree, table);
            if (this.expresion.tipo === Tipo_1.Tipo.ARRAY) {
                value = "[" + value + "]";
            }
            else if (this.expresion.tipo === Tipo_1.Tipo.STRUCT) {
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
                value = tipo + "(" + consolidado + ")";
                if (this.salto == true) {
                    value += "\n";
                }
                //let result = new VerStruct(this.expresion.identificador,null,this.fila,this.columna)
            }
            //console.log('el valor es:',value);
            tree.updateConsola(value);
            return 0;
        }
        else {
            let value = this.expresion.interpretar(tree, table);
            if (this.expresion.tipo === Tipo_1.Tipo.STRUCT) {
                let consolidado = "";
                //console.log('el valor es --->',value);
                //console.log('la tabla  es ',value.tabla); 
                const propertyValues = Object.values(value.tabla);
                //console.log('el array es ',propertyValues);
                propertyValues.forEach(element => {
                    //console.log('el elemeno es: ', element)
                    const propertyValues2 = Object.values(element);
                    //console.log('el p2 es ',propertyValues2);
                    if (propertyValues2[0] == this.atributo.identificador) {
                        value = propertyValues2[4];
                    }
                    else {
                    }
                });
                if (this.salto == true) {
                    value += "\n";
                }
                tree.updateConsola(value);
                return 0;
                //console.log('el consolidado es: '+tipo+consolidado);
                //value=tipo+"("+consolidado+")"
                //let result = new VerStruct(this.expresion.identificador,null,this.fila,this.columna)
            }
        }
>>>>>>> Stashed changes
    }
}
exports.Imprimir = Imprimir;
