import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";

export interface Instruccion {
    fila: number;
    columna: number;

    interpretar(tree: AST, table: Entorno): any;
    traducir(tree: AST, table: Entorno):any;
}