import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
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


    traducir(tree: AST, table: Entorno) {
        //console.log('la tabla tiene: ', tree.getTemporalClase());
        let textoFinal="";
        for (let imprimir of this.expresion) { 
            if (imprimir['acceso'] === null) {
                //console.log('imprimir lleva: ',imprimir['expresion'].identificador);
                //console.log("la tabal tiene:",tree.getTabla());
                console.log("la impresion lleva: ",imprimir['expresion'])
                let tipo=tree.getTipoTablaByIdentificador(imprimir['expresion'].identificador);
                if (tipo===Tipo.INT || tipo===Tipo.DOUBLE) {
                    let value=tree.getValorTablaByIdentificador(imprimir['expresion'].identificador);
                    //console.log('el valor es: ',value);
                    let nuevoTemporal=tree.generarTemporal();
                    let texto3d= tree.generarInstruccion(nuevoTemporal+" = stack[(int)"+value+"]");
                    texto3d+=tree.generarInstruccion("printf(\"%f\", (double)"+nuevoTemporal+")")
                    texto3d+=tree.generarInstruccion("printf(\"%c\", (char)10)");
                    textoFinal="\n"+texto3d+"\n";
                    /* tree.updateConsola(texto3d);
                    tree.updateConsola("\n"); */
                    //console.log(texto3d+"\n");
                    //return texto3d+"\n"
                }else if (tipo===Tipo.STRING) {
                    console.log("Stack",tree.getStack());
                    console.log("heap",tree.getHeap());
                    let texto3d=tree.getPrintString(imprimir['expresion'].identificador)
                    //console.log(texto3d+"\n");
                    textoFinal= texto3d+"\n"
                }else{
                    
                    /* let izq=imprimir['expresion'].opIzquierdo.traducir(tree,table);
                    let der=imprimir['expresion'].opDerecho.traducir(tree,table);
                    console.log(lista+"\n"+izq+"\n"+der) */
                    let expre=imprimir['expresion'].traducir(tree,table);
                    let lista=tree.getListaTemporalClase();
                    let texto3d="printf(\"%f\", (double)"+expre+");\nprintf(\"%c\", (char)10);\n"
                    //console.log(lista+"\n"+texto3d);
                    textoFinal= lista+"\n"+texto3d
                }
          
            }else{

            }
        }
        console.log(textoFinal)
        return textoFinal;
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

    getNodo() {
        let nodo = new NodoAST("IMPIRMIR");

        let instrucciones = new NodoAST("EXPRESIONES ")
        // for(let instr of this.expresion){
        //     instrucciones.agregarHijoNodo(instr.getNodo());
        // }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }

}