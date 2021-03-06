import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Break } from "./Break";

export class While implements Instruccion {

    condicion: any;
    instruccionesIf: any;
    fila: number;
    columna: number;

    constructor(condicion: any, instruccionesIf: any,fila: number, columna: number){
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
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
                tree.updateConsola(result.toString());
            }
            //console.log('la instruccion es: ', result);
            texto3dVerdadero+=result;
        }

        instrucion=tree.getWhile(cond,texto3dVerdadero);
        //console.log(lista+"\n" + instrucion);
        return lista+"\n" + instrucion;
    }

    interpretar(tree: AST, table: Entorno) {
        while (true) {
            let condicion = this.condicion.interpretar(tree, table);
            if (condicion instanceof Excepcion) return condicion;

            if (this.condicion.tipo === Tipo.BOOL) {
                if (condicion=== true) {
                    let nuevaTabla = new Entorno(table);
                    for (let instruccion of this.instruccionesIf) {
                        let result = instruccion.interpretar(tree, nuevaTabla);

                        if(result instanceof Break){
                            break;
                        }

                        if (result instanceof Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        }

                    }
                } else {
                    break;
                }
            } else {
                return new Excepcion("Semantico", "Tipo de dato no booleano en condicion While.", this.fila, this.columna);
            }
        }
    }

    getNodo() {
        let nodo = new NodoAST("WHILE");

        let instrucciones = new NodoAST("INSTRUCCIONES ")
        for(let instr of this.instruccionesIf){
            instrucciones.agregarHijoNodo(instr.getNodo());
        }
        nodo.agregarHijoNodo(instrucciones);
        return nodo;
        
    }
}