import { Instruccion } from "../Abstract/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Entorno } from "./Entorno";
import { Excepcion } from "./Excepcion";
import { Struct } from "../Instrucciones/struct";
import { TemporalAux } from "./temporalAux";
import { Case3d } from "./Case3d";
import {Tipo} from "./Tipo"
import { SimboloReporte } from "./SimboloReporte";

export class AST {
    instrucciones: Array<Instruccion>
    public funciones: Array<Funcion>;   //Pull de Funciones
    public structs: Array<Struct>;      //Pull de Strcuts
    excepciones: Array<Excepcion>;      //Pull de Excepciones
    consola: string;
    dot: string;
    contador: number;
    TSGlobal: Entorno;
    entorno: string;
    noEntorno: number;
    simbolos: {[identificador: string]: SimboloReporte};

    contadores: Array<string>;
    contadorTemporal:number;
    posicionContador:number;
    stack:Array<number>;
    heap:Array<number>;
    temporalesAux: Array<TemporalAux>;
    apuntadorStack:number;
    apuntadorHeap:number;

    contadorEtiquetas:number;
    tabla: Array<TemporalAux>;

    casos:Array<Case3d>

    funciones3D:Array<String>;
    main3D:String;



    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.structs = []
        this.funciones = []
        this.excepciones = []
        this.consola = "";
        this.dot = "";
        this.contador = 0;
        this.TSGlobal = null;
        this.entorno = "Global"
        this.noEntorno = 1;
        this.simbolos = {}

        this.contadores=[];
        this.contadorTemporal=0;
        this.posicionContador=0;
        this.stack=[];
        this.heap=[];
        this.temporalesAux=[];
        this.apuntadorStack=0;
        this.apuntadorHeap=0;
        this.contadorEtiquetas=0;
        this.tabla=[];

        this.casos=[];

        this.funciones3D=[];
        this.main3D="";


    }

    getSimbolos(){
        return this.simbolos;
    }

    addSimbolo(id:string, simbolo:SimboloReporte){
        this.simbolos[id] = simbolo;
    }

    updateSimbolo(identficador:string, valor:any){
        if (this.simbolos.hasOwnProperty(identficador)) {
            this.simbolos[identficador].valor = valor;
        }
    }

    getInstrucciones() {
        return this.instrucciones;
    }

    getExcepciones() {
        return this.excepciones;
    }

    setExcepciones(excepciones: Array<Excepcion>) {
        this.excepciones = excepciones
    }

    getConsola() {
        return this.consola;
    }

    updateConsola(cadena: string) {
        this.consola += cadena;
    }

    getTSglobal() {
        return this.TSGlobal;
    }

    setTSglobal(TSglobal: Entorno) {
        this.TSGlobal = TSglobal;
    }

    getStructs() {
        return this.structs;
    }

    getStrut(nombre: any) {
        //console.log(this.structs)
        let estructura: any;
        this.structs.forEach(element => {
            if (nombre == element.identificador) {
                //console.log('existe la estructura ', element);
                estructura = element
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

    getFuncion(nombre: string) {
        for (let funcion of this.funciones) {
            if (funcion.nombre === nombre) {
                return funcion;
            }
        }
        return null;
    }

    addFuncion(funcion: Funcion) {
        this.funciones.push(funcion);
    }

    getDot(raiz:any){
        this.dot = "";
        this.dot += "digraph {\n";
        this.dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n"
        this.contador = 1;
        this.recorrerAST("n0", raiz);
        this.dot += "}"
        return this.dot
    }

    recorrerAST(idPadre:any, nodoPadre:any){
        for(let hijo of nodoPadre.getHijos()){
            let nombreHijo = "n" + String(this.contador);
            this.dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
            this.dot += idPadre + "->" + nombreHijo + ";\n"
            this.contador += 1
            this.recorrerAST(nombreHijo, hijo)
        }
    }

    addFuncion3D(funcion){
        this.funciones3D.push(funcion);
    }

    getListaFunciones3D(){
        let funciones="";
        this.funciones3D.forEach(element => {
            funciones+="\n"+element+"\n";
        });
        return funciones;
    }
    
    generarEtiquetas(){
        let etiqueta="L"+this.contadorEtiquetas.toString();
        this.contadorEtiquetas++;
        return etiqueta;
    }

    generarTemporal(){
        let temporal="T"+this.contadorTemporal.toString();
        this.contadores.push(temporal);
        this.contadorTemporal++;

        return temporal;
    }

    getUltimoTemporal(){
        let temporal:string;
        this.contadores.forEach(element => {
            temporal=element
        });
        return temporal;
    }

    getApuntadorStack(){
        return this.apuntadorStack;
    }

    addStack(valor){
        this.stack.push(valor);
        this.apuntadorStack++;
    }

    addHeap(valor){
        this.heap.push(Number(valor));
        this.apuntadorHeap++;
    }

    getHeap(){
        return this.heap;
    }

    getApuntadorHeap(){
        return this.apuntadorHeap;
    }

    getStack(){
        return this.stack;
    }

    getValorPosStack(pos:number){
        return this.stack[pos];
    }

    addTabla(valor:TemporalAux){
        this.tabla.push(valor);
    }

    getTabla(){
        return this.tabla;
    }

    getValorTablaByIdentificador(identificador){
        let tipo:any;
        this.tabla.forEach(element => {
            if (element.indentificador===identificador) {
                tipo=element.valor;
            }
        });
        return tipo;
    }

    getTipoTablaByIdentificador(identificador){
        let tipo:any;
        this.tabla.forEach(element => {
            if (element.indentificador===identificador) {
                tipo=element.tipo;
            }
        });
        return tipo;
    }

    actualizarValorTabla(identificador,nuevoValor){
        this.tabla.forEach(element => {
            if (element.indentificador===identificador) {
                element.valor=nuevoValor
            }
        });
    }

    addTemporalClase(valor:TemporalAux){
        this.temporalesAux.push(valor);
    }

    getTemporalClase(){
        return this.temporalesAux;
    }

    getTipoTemporalClase(identificador){
        let tipo:any;
        this.temporalesAux.forEach(element => {
            if (element.indentificador===identificador) {
                tipo=element.tipo;
            }
        });
        return tipo;
    }

    getValueTemporalClase(identificador){
        let value:any;
        this.temporalesAux.forEach(element => {
            if (element.indentificador===identificador) {
                value=element.valor;

            }
        });
        return value;
    }

    getListaTemporalClase(){
        let value="";
        this.temporalesAux.forEach(element => {
            value+=element.indentificador+" = "+element.valor+";\n";
        });
        return value;
    }

    limpiartemporalClase(){
        this.temporalesAux=[];
    }

    generarInstruccion(cadena){
        return "\n"+cadena+";";
    }


    setMain(propias){
        this.main3D=propias;
        //this.main3D="\n\n/*------MAIN------*/\nvoid main() {\nP = 0; H = 0;\n"+ins+"return;\n}";
        
        return this.main3D;
    }



    getMain(){
       
        
        return this.main3D;
    }

    getFunciones3D(){
        let funciones=this.getListaFunciones3D();
        return funciones;
    }

    getValueByTemporal(temporal){
        let value:string;
        this.temporalesAux.forEach(element => {
            if (element.indentificador===temporal) {
                value=element.valor;
            }
        });

        return value;
    }

    getListaTemporales(){
        let lista:string="";
        for (let i = 0; i < this.contadores.length; i++) {
            const element = this.contadores[i];
            if (i===0) {
                lista=element;
            } else {
                lista+=","+element;
            }
        }
        return lista;
    }

    getEncabezado(){
        let header="#include <stdio.h>\n#include <math.h>  \ndouble heap[30101999];\ndouble stack[30101999];\ndouble P;\ndouble H;";
        return header;
    }    
    
    getCasos(){
        return this.casos;
    }

    addCaso(value){
        this.casos.push(value);
    }


    //---------------------------IF

    getIf(condicion,verdadero,falso){
        let etiquetaTrue=this.generarEtiquetas();
        let etiquetaFalse=this.generarEtiquetas();
        let texto3d="";
        texto3d+="if("+condicion+") goto "+etiquetaTrue+";\n";
        texto3d+="goto "+etiquetaFalse+";\n";
        texto3d+=etiquetaTrue+":"+verdadero+"\n";
        texto3d+=etiquetaFalse+":"+falso+"\n";
        return texto3d;

    }


    //---------------------------while
    getWhile(condicion,instrucciones){
        let etiquetaRetorno=this.generarEtiquetas();
        let etiquetaEntrada=this.generarEtiquetas();
        let etiquetaSalida=this.generarEtiquetas();
        let texto3d="";
        texto3d+=etiquetaRetorno+":\n"
        texto3d+="if("+condicion+") goto "+etiquetaEntrada+";\n";
        texto3d+="goto "+etiquetaSalida+";\n";
        texto3d+=etiquetaEntrada+":\n";
        texto3d+=instrucciones+"\n";
        texto3d+="goto "+etiquetaRetorno+";\n"
        texto3d+=etiquetaSalida+":"

        return texto3d;
    }

    //--------------------------------do while

    getDoWhile(condicion,instrucciones){
        let etiquetaRetorno=this.generarEtiquetas();
        let etiquetaEntrada=this.generarEtiquetas();
        let etiquetaSalida=this.generarEtiquetas();
        let texto3d="";
        texto3d+=etiquetaRetorno+":\n";
        texto3d+=instrucciones+"\n";
        texto3d+="if("+condicion+") goto "+etiquetaEntrada+";\n";
        texto3d+="goto "+etiquetaSalida+";\n";
        texto3d+=etiquetaEntrada+":\n";
        texto3d+="  goto "+etiquetaRetorno+";\n";
        texto3d+=etiquetaSalida+":\n";

        return texto3d;

    }

    //--------------------------FOR

    getFor(){

    }

    //-------------switch

    getSwitch(){}

    //--------------------imprimir cadena
    getPrintString(identficador){
        let posStack=this.getValorTablaByIdentificador(identficador)
        if (posStack) {
            //let apuntador=this.getApuntadorStack()-1;
            let temporalA=this.generarTemporal();
            let texto3d=this.generarInstruccion("P = "+posStack.toString());
            texto3d+=this.generarInstruccion(temporalA+" = P");
            let temporalS=this.generarTemporal();
            texto3d+=this.generarInstruccion(temporalS+" = stack[(int)"+temporalA+"]");
            let etiquetaEntrada=this.generarEtiquetas();
            let etiquetaRegreso=this.generarEtiquetas();
            texto3d+="\n"+etiquetaRegreso+":"
            let temporalH=this.generarTemporal();
            texto3d+=this.generarInstruccion(temporalH+" = heap[(int)"+temporalS+"]")
            texto3d+=this.generarInstruccion("if("+temporalH+" == -1) goto "+etiquetaEntrada)
            texto3d+=this.generarInstruccion("printf(\"%c\", (char)"+temporalH+")");
            texto3d+=this.generarInstruccion(temporalS+" = "+temporalS+"+1")
            texto3d+="\ngoto "+etiquetaRegreso+";\n"+etiquetaEntrada+":\n"
            return texto3d;
        } else {
            
        }
        
    }

    getTipoString(tipo){
        let convertido="";
        if (tipo===Tipo.ARRAY) {
            convertido="Array"
        }else if (tipo==Tipo.BOOL) {
            convertido="Bool"
        }else if (tipo==Tipo.CHAR) {
            convertido="Char"
        }else if (tipo==Tipo.DOUBLE) {
            convertido="Dobule"
        }else if (tipo==Tipo.INT) {
            convertido="int"
        }else if (tipo==Tipo.STRING) {
            convertido="String"
        }else if (tipo==Tipo.STRUCT) {
            convertido="Sruct"
        }else if (tipo==Tipo.VOID) {
            convertido="Void"
        }

        return convertido;
    }


    reporteTabla(){
        let data ="<H1> REPORTE TABLA DE SIMBOLOS </H1> \n";
        data+="<br>\n";
        data += "<table WIDTH=\"70%\" border='1'style='margin: 0 auto;'>\n";
        data+= "<tr>\n" + "<td>" + "Identificador" + "</td>"+ "<td>" + "Posicion Stack" + "</td>"+ "<td>" + "Tipo" + "</td>"+ "<td>" + "Fila" + "</td>"+ "<td>" + "Columna" + "</td>\n";
        data+= "</tr>\n";
        this.tabla.forEach(element => {
            data+= "<tr>\n" + "<td>"+ element.indentificador + "</td>"+ "<td>"+ element.valor + "</td>"+ "<td>"+ this.getTipoString(element.tipo) + "</td>"+ "<td>"+ element.fila + "</td>"+ "<td>"+ element.columna + "</td>\n"
			data+= "</tr>\n"
        });
        data+="</table>\n"
        return data;
    }

    reporteStack(){
        let data ="<H1> REPORTE STACK </H1> \n";
        data+="<br>\n";
        data += "<table WIDTH=\"70%\" border='1'style='margin: 0 auto;'>\n";
        data+= "<tr>\n" + "<td>" + "posicion" + "</td>"+ "<td>" + "Valor" + "</td>\n";
        data+= "</tr>\n";
        for (let i = 0; i < this.stack.length; i++) {
            const element = this.stack[i];
            data+="<tr>\n" + "<td>"+ i + "</td>"+ "<td>"+ element+ "</td>\n"
            data+= "</tr>\n"
        }
        data+="</table>\n"
        return data;
    }

    reporteHeap(){
        let data ="<H1> REPORTE HEAP </H1> \n";
        data+="<br>\n";
        data += "<table WIDTH=\"70%\" border='1'style='margin: 0 auto;'>\n";
        data+= "<tr>\n" + "<td>" + "posicion" + "</td>"+ "<td>" + "Valor" + "</td>\n";
        data+= "</tr>\n";
        for (let i = 0; i < this.heap.length; i++) {
            const element = this.heap[i];
            data+="<tr>\n" + "<td>"+ i + "</td>"+ "<td>"+ element+ "</td>\n"
            data+= "</tr>\n"
        }
        data+="</table>\n"
        return data;
    }



} 