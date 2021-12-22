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
                //console.log("el tipo es: ",tipo)
                if (tipo === Tipo_1.Tipo.INT || tipo === Tipo_1.Tipo.DOUBLE) {
                    let value = tree.getValorTablaByIdentificador(imprimir['expresion'].identificador);
                    //console.log('el valor es: ',value);
                    let nuevoTemporal = tree.generarTemporal();
                    let texto3d = tree.generarInstruccion(nuevoTemporal + " = stack[(int)" + value + "]");
                    texto3d += tree.generarInstruccion("printf(\"%f\", (double)" + nuevoTemporal + ")");
                    //texto3d+=tree.generarInstruccion("printf(\"%c\", (char)10)");
                    textoFinal += "\n" + texto3d + "\n";
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
                    textoFinal += texto3d + "\n";
                }
                else {
                    if (imprimir['expresion'].tipo === Tipo_1.Tipo.STRING) {
                        let lista = tree.getListaTemporalClase();
                        let temporal = tree.generarTemporal();
                        let texto3d = tree.generarInstruccion(temporal + " = H");
                        let apuntadorHeap = tree.getApuntadorHeap();
                        for (let i = 0; i < imprimir['expresion'].valor.length; i++) {
                            const element = imprimir['expresion'].valor[i];
                            let value = element.charCodeAt(0);
                            tree.addHeap(value);
                            texto3d += tree.generarInstruccion("heap[(int)H] = " + value);
                            texto3d += tree.generarInstruccion('H = H + 1');
                        }
                        tree.addHeap(-1);
                        texto3d += tree.generarInstruccion("heap[(int)H] = -1");
                        texto3d += tree.generarInstruccion('H = H + 1');
                        //textoFinal= texto3d+"\n"
                        let temporalS = tree.generarTemporal();
                        texto3d += tree.generarInstruccion(temporalS + " = " + apuntadorHeap);
                        let etiquetaEntrada = tree.generarEtiquetas();
                        let etiquetaRegreso = tree.generarEtiquetas();
                        texto3d += "\n" + etiquetaRegreso + ":";
                        let temporalH = tree.generarTemporal();
                        texto3d += tree.generarInstruccion(temporalH + " = heap[(int)" + temporalS + "]");
                        texto3d += tree.generarInstruccion("if(" + temporalH + " == -1) goto " + etiquetaEntrada);
                        texto3d += tree.generarInstruccion("printf(\"%c\", (char)" + temporalH + ")");
                        texto3d += tree.generarInstruccion(temporalS + " = " + temporalS + "+1");
                        texto3d += "\ngoto " + etiquetaRegreso + ";\n" + etiquetaEntrada + ":\n";
                        textoFinal += lista + "\n" + texto3d;
                    }
                    else {
                        let expre = imprimir['expresion'].traducir(tree, table);
                        let lista = tree.getListaTemporalClase();
                        let texto3d = "printf(\"%f\", (double)" + expre + ");"; //\nprintf(\"%c\", (char)10);\n"
                        //console.log(lista+"\n"+texto3d);
                        textoFinal += lista + "\n" + texto3d;
                    }
                }
            }
            else {
            }
        }
        if (this.salto === true) {
            textoFinal += tree.generarInstruccion("printf(\"%c\", (char)10)");
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
