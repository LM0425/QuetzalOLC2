import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";
import { Break } from "./Break";

export class DoW implements Instruccion {

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

    interpretar(tree: AST, table: Entorno) {
        do {
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
        } while (true);
    }
}