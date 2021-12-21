import { Instruccion } from "../Abstract/Instruccion";
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

    interpretar(tree: AST, table: Entorno) {
        let entornoFor = new Entorno(table);
        let decAsig = this.decAsig.interpretar(tree, entornoFor);

        if(decAsig instanceof Excepcion) return decAsig;

        while(true){
            let condicion = this.condicion.interpretar(tree, entornoFor);
            if(condicion instanceof Excepcion) return condicion;

            if(this.condicion.tipo === Tipo.BOOL){
                if(condicion === true){
                    let entornoPasadaFor = new Entorno(entornoFor);
                    for(let instruccion of this.instrucciones){
                        let result = instruccion.interpretar(tree, entornoPasadaFor);
                        if(result instanceof Excepcion){
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                        if(result instanceof Break) return null;
                        if(result instanceof Continue) break;
                        if(result instanceof Return) return result
                    }
                    let actualizacion = this.actualizacion.interpretar(tree, entornoFor)
                    if(actualizacion instanceof Excepcion) return actualizacion;
                }else{
                    break;
                }
            }else{
                return new Excepcion("Semantico", "Tipo de dato no booleano en condicion de For", this.fila, this.columna);
            }
        }
    }
}