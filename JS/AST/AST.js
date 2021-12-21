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
