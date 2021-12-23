import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";

export class For implements Instruccion{

    decAsig:any;
    condicion:any;
    actualizacion:any;
    instrucciones:any;
    fila: number;
    columna: number;

    constructor(decAsig:any, condicion:any, actualizacion:any, instrucciones:any, fila:number, columna:number){
        this.decAsig = decAsig;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        
        let variable=this.decAsig.traducir(tree,table);
        let condicion=this.condicion.traducir(tree,table);
        let lista=tree.getListaTemporalClase();
        let expre=this.actualizacion.traducir(tree,table);
        console.log("la variable es \n",variable);
        console.log("la lista es  \n",lista);        
        console.log("la consicion es  \n",condicion);
        console.log("la expresion  es \n",expre);
        let instrucciones="";

        this.instrucciones.forEach(element => {
            instrucciones+=element.traducir(tree,table);
        });

        let temporalRetorno=tree.generarTemporal();
        let temporalEntrada=tree.generarTemporal();
        let temporalSalida=tree.generarTemporal();

        let texto3d="\n//-------------------FOR\n";
        texto3d+=variable;
        
        texto3d+=temporalRetorno+":\n";
        texto3d+=lista;
        texto3d+=tree.generarInstruccion("if("+condicion+") goto "+temporalEntrada)
        texto3d+=tree.generarInstruccion("goto "+temporalSalida);
        texto3d+="\n"+temporalEntrada+":\n";
        texto3d+=instrucciones+"\n"
        texto3d+=expre;
        texto3d+=tree.generarInstruccion("goto "+temporalRetorno);
        texto3d+="\n"+temporalSalida+":\n";

        console.log(texto3d)
        return texto3d;

    }

    interpretar(tree: AST, table: Entorno) {
        let anterior = tree.entorno
        tree.entorno = anterior + "_" +"For"
        let entornoFor = new Entorno(table);
        let decAsig = this.decAsig.interpretar(tree, entornoFor);

        if(decAsig instanceof Excepcion) return decAsig;

        while(true){
            let condicion = this.condicion.interpretar(tree, entornoFor);
            if(condicion instanceof Excepcion){
                tree.entorno = anterior;
                return condicion;
            }

            if(this.condicion.tipo === Tipo.BOOL){
                if(condicion === true){
                    tree.entorno += "_"
                    tree.entorno += String(tree.noEntorno);
                    tree.noEntorno++;
                    let entornoPasadaFor = new Entorno(entornoFor);
                    for(let instruccion of this.instrucciones){
                        let result = instruccion.interpretar(tree, entornoPasadaFor);
                        if(result instanceof Excepcion){
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                        if(result instanceof Break) {
                            tree.entorno = anterior;
                            return null;
                        }
                        if(result instanceof Continue) break;
                        if(result instanceof Return) {
                            tree.entorno = anterior;
                            return result
                        }
                    }
                    let actualizacion = this.actualizacion.interpretar(tree, entornoFor)
                    if(actualizacion instanceof Excepcion) {
                        tree.entorno = anterior;
                        return actualizacion;
                    }
                }else{
                    break;
                }
            }else{
                tree.entorno = anterior;
                return new Excepcion("Semantico", "Tipo de dato no booleano en condicion de For", this.fila, this.columna);
            }
        }

        tree.entorno = anterior
    }
    
    getNodo() {
        let nodo = new NodoAST("FOR");
        let instrucciones = new NodoAST("INSTRUCCIONES FOR");
        for(let instr of this.instrucciones){
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);

        return nodo;
    }
}