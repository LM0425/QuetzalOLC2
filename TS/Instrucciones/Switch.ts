import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Break } from "./Break";

export class Switch implements Instruccion{

    expresion:any;
    cases:any;
    porDefecto:any;
    fila: number;
    columna: number;

    constructor(expresion:any, cases:any, porDefecto:any, fila:number, columna:number){
        this.expresion = expresion;
        this.cases = cases;
        this.porDefecto = porDefecto;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(tree: AST, table: Entorno) {
        let condicion = this.expresion.interpretar(tree, table);
        if(condicion instanceof Excepcion) return condicion;

        let cumple = false;

        if(this.cases !== null){
            for(let caso of this.cases){
                let expresionCaso = caso.interpretar(tree, table);

                if(expresionCaso instanceof Excepcion){
                    tree.getExcepciones().push(expresionCaso);
                    tree.updateConsola(expresionCaso.toString());
                    continue
                }

                if(this.expresion.tipo === caso.expresion.tipo){
                    if(condicion === expresionCaso){
                        let nuevaTabla = new Entorno(table);
                        for(let instruccion of caso.instrucciones){
                            let result = instruccion.interpretar(tree, nuevaTabla);
                            if(result instanceof Excepcion){
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }

                            if(result instanceof Break){
                                cumple = true;
                                return null;
                            }
                        }
                    }
                }
            }
        }

        if(!cumple){
            if(this.porDefecto !== null){
                let nuevaTabla = new Entorno(table);
                for(let instruccion of this.porDefecto.instrucciones){
                    let result = instruccion.interpretar(tree, nuevaTabla);
                    if(result instanceof Excepcion){
                        tree.getExcepciones().push(result);
                        tree.updateConsola(result.toString());
                    }

                    if(result instanceof Break) return null;
                }
            }
        }
    }
    
}