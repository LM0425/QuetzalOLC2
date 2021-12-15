import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Imprimir implements Instruccion {
    salto: boolean;
    expresion: any;
    fila: number;
    columna: number;
    atributo: any;

    constructor(salto: boolean, expresion: any, fila: number, columna: number) {
        this.salto = salto;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.atributo = null;
    }

    interpretar(tree: AST, table: Entorno) {
        let cadena = "";
        for (let imprimir of this.expresion) {
            if (imprimir['acceso'] === null) {
                let value = imprimir['expresion'].interpretar(tree, table);
                if (value instanceof Excepcion) return value;

                // Agregar ciclo interpretar

                if (imprimir['expresion'].tipo === Tipo.ARRAY) {
                    cadena += "[" + value + "]"
                } else if (imprimir['expresion'].tipo === Tipo.STRUCT) {
                    let consolidado: String = "";
                    let tipo: String = "";
                    let contador: number = 0;
                    //console.log('el valor es --->',value);
                    /*console.log('la tabla  es ',value.tabla); */
                    const propertyValues = Object.values(value.tabla);
                    //console.log('el array es ',propertyValues);
                    let aux: any = propertyValues[0]
                    tipo = aux.tSt;
                    propertyValues.forEach(element => {

                        //console.log('el elemeno es: ', element)
                        const propertyValues2 = Object.values(element);
                        //console.log('el p2 es ',propertyValues2);
                        if (contador == 0) {
                            consolidado += propertyValues2[4];
                        } else {
                            consolidado += "," + propertyValues2[4];
                        }
                        contador++;
                    });
                    //console.log('el consolidado es: '+tipo+consolidado);
                    cadena += tipo + "(" + consolidado + ")"
                    //let result = new VerStruct(this.expresion.identificador,null,this.fila,this.columna)
                } else {
                    cadena += value
                }
                //console.log('el valor es:',value);
            } else {
                let value = imprimir['expresion'].interpretar(tree, table);
                if (imprimir['expresion'].tipo === Tipo.STRUCT) {
                    let consolidado: String = "";

                    //console.log('el valor es --->',value);
                    //console.log('la tabla  es ',value.tabla); 
                    const propertyValues = Object.values(value.tabla);
                    //console.log('el array es ',propertyValues);

                    propertyValues.forEach(element => {

                        //console.log('el elemeno es: ', element)
                        const propertyValues2 = Object.values(element);
                        //console.log('el p2 es ',propertyValues2);
                        if (propertyValues2[0] == imprimir['acceso'].identificador) {
                            value = propertyValues2[4]
                        } else {

                        }

                    });
                    cadena += value;
                    //console.log('el consolidado es: '+tipo+consolidado);
                    //value=tipo+"("+consolidado+")"
                    //let result = new VerStruct(this.expresion.identificador,null,this.fila,this.columna)
                }
            }
        }

        tree.updateConsola(cadena)

        if (this.salto === true) tree.updateConsola('\n');

        return this;
    }

}