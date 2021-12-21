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
