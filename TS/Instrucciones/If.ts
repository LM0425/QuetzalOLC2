import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Return } from "./Return";

export class If implements Instruccion {

    condicion: any;
    instruccionesIf: any;
    instruccionesElse: any;
    elseIf: any;
    fila: number;
    columna: number;

    constructor(condicion: any, instruccionesIf: any, instruccionesElse: any, elseIf: any, fila: number, columna: number) {
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
        this.elseIf = elseIf;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        //sconsole.log('el true es',this.instruccionesIf.traducir(tree,table));
        let nuevaTabla = new Entorno(table);
        let texto3dVerdadero="";
        let textoFalso="";
        let instrucion="";
        //console.log("la condicion es:",this.condicion);
        let cond=this.condicion.traducir(tree, nuevaTabla)//.split("$");
        //let condicion=cond[0];
        let lista=tree.getListaTemporalClase();
        tree.limpiartemporalClase()
        for (let instruccion of this.instruccionesIf) {
            let result = instruccion.traducir(tree, nuevaTabla);
            if (result instanceof Excepcion) {
                tree.getExcepciones().push(result);
                //tree.updateConsola(result.toString());
            }
            if(result instanceof Return){
                return result;
            }
            //console.log('la instruccion es: ', result);
            texto3dVerdadero+=result;
        }

        if (this.instruccionesElse) {
            for (let instruccion of this.instruccionesElse) {
                let result = instruccion.traducir(tree, nuevaTabla);
                if (result instanceof Excepcion) {
                    tree.getExcepciones().push(result);
                    //tree.updateConsola(result.toString());
                }
                if(result instanceof Return){
                    return result;
                }
                //console.log('la instruccion es: ', result);
                textoFalso+=result;
            }
        }
        
        instrucion=tree.getIf(cond,texto3dVerdadero,textoFalso);
        if (this.elseIf) {
            instrucion+=this.elseIf.traducir(tree,table)
        }
        /* if (this.elseIf==null) {
            instrucion=tree.getIf(cond,texto3dVerdadero,textoFalso);
        }else{
            console.log('el else if es: ',this.elseIf);
            console.log('la traducion es: ',this.elseIf.traducir(tree,table))

        } */
        
        console.log(lista+"\n" + instrucion);
        return lista+"\n" + instrucion;
        //console.log('la lista de instrucciones es: ',texto3dVerdadero);
    }

    interpretar(tree: AST, table: Entorno) {
        let condicionIf = this.condicion.interpretar(tree, table);
        if (condicionIf instanceof Excepcion) return condicionIf;

        if (this.condicion.tipo === Tipo.BOOL) {
           // console.log("Condicion - " + condicionIf)
            if (condicionIf === true) {
                //console.log("Entrando a if")
                let nuevaTabla = new Entorno(table);
                for (let instruccion of this.instruccionesIf) {
                    let result = instruccion.interpretar(tree, nuevaTabla);
                    if (result instanceof Excepcion) {
                        tree.getExcepciones().push(result);
                        tree.updateConsola(result.toString());
                    }
                    if(result instanceof Return){
                        return result;
                    }
                }
            } else {
                if (this.instruccionesElse !== null) {
                    //console.log("Entrando a Else")
                    let nuevaTabla = new Entorno(table);
                    for (let instruccion of this.instruccionesElse) {
                        let result = instruccion.interpretar(tree, nuevaTabla);
                        if (result instanceof Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }
                        if(result instanceof Return){
                            return result;
                        }
                    }
                } else if (this.elseIf !== null) {
                    //console.log("Entrando a else if")
                    let result = this.elseIf.interpretar(tree, table);
                    if (result instanceof Excepcion) return result;
                    if(result instanceof Return) return result;
                }
            }
        } else {
            return new Excepcion("Semantico", "Tipo de dato no booleano en condicion If.", this.fila, this.columna);
        }
    }

    getNodo() {
        let nodo = new NodoAST("IF");

        let instruccionesIf = new NodoAST("INSTRUCCIONES IF")
        for(let instr of this.instruccionesIf){
            instruccionesIf.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instruccionesIf);

        if(this.instruccionesElse !== null){
            let instruccionesElse = new NodoAST("INSTRUCCIONES ELSE");
            for(let instr of this.instruccionesElse){
                instruccionesElse.agregarHijoNodo(instr.getNodo());
            }
            nodo.agregarHijoNodo(instruccionesElse);
        }else if(this.elseIf !== null){
            nodo.agregarHijoNodo(this.elseIf.getNodo());
        }

        return nodo;
        
    }

}