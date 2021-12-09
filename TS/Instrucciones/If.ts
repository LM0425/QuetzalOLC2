import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

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

    interpretar(tree: AST, table: Entorno) {
        let condicionIf = this.condicion.interpretar(tree, table);
        if (condicionIf instanceof Excepcion) return condicionIf;

        if (this.condicion.tipo === Tipo.BOOL) {
            if (condicionIf === true) {
                let nuevaTabla = new Entorno(table);
                for (let instruccion of this.instruccionesIf) {
                    let result = instruccion.interpretar(tree, nuevaTabla);
                    if (result instanceof Excepcion) {
                        tree.getExcepciones().push(result);
                        tree.updateConsola(result.toString());
                    }
                }
            } else {
                if (this.instruccionesElse !== null) {
                    let nuevaTabla = new Entorno(table);
                    for (let instruccion of this.instruccionesIf) {
                        let result = instruccion.interpretar(tree, nuevaTabla);
                        if (result instanceof Excepcion) {
                            tree.getExcepciones().push(result);
                            tree.updateConsola(result.toString());
                        };
                    }
                } else if (this.elseIf !== null) {
                    let result = this.elseIf.interpretar(tree, table);
                    if (result instanceof Excepcion) return result;
                }
            }
        } else {
            return new Excepcion("Semantico", "Tipo de dato no booleano en condicion If.", this.fila, this.columna);
        }
    }

}