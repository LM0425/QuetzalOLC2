import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class Imprimir implements Instruccion {
    salto: boolean;
    expresion: any;
    fila: number;
    columna: number;
    atributo:any;
    //salto:boolean;

    constructor(salto: boolean, expresion: any, fila: number, columna: number,atributo:any) {
        this.salto = salto;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.atributo=atributo;
        this.salto=salto;
    }

    interpretar(tree: AST, table: Entorno) {
        let cadena = "";

        for (let imprimir of this.expresion) {
            let value = imprimir.interpretar(tree, table);
            if(value instanceof Excepcion) return value;

            // Agregar ciclo interpretar

            if (imprimir.tipo === Tipo.ARRAY) {
                cadena += "[" + value + "]"
            }else{
                cadena += value
            }
        }

        tree.updateConsola(cadena)

        if(this.salto === true)  tree.updateConsola('\n');
        
        return this;
    }

}