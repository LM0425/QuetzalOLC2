import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";

export class Struct implements Instruccion {
    tipo: Tipo;
    identificador: string;
    expresion: any[];
    fila: number;
    columna: number;
    tipoStruct:String;

    constructor(tipo: Tipo, identficador: string, fila: number, columna: number, expresion: any[],tipoStruct:String) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipoStruct=tipoStruct;
    }

    interpretar(tree: AST, table: Entorno) {
        let value = null;
        /*if (this.expresion !== null) {
            value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
            if (this.tipo !== this.expresion.tipo) return new Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
        }*/
        //console.log('la expresion es: ',this.expresion[0]);
        let nuevaTabla = new Entorno(table);
        for (let id of this.expresion[0]) {
            //if (value instanceof Excepcion) return value;
            /* console.log('el id es',id);
            let arr:any = Array.from(id); */
            //let aux:any=[id];
            
            let result = id.interpretar(tree, nuevaTabla);
            //console.log('el valor es:', result)
            if (result instanceof Excepcion) {
                tree.getExcepciones().push(result);
                tree.updateConsola(result.toString());
            }
        }
        tree.getStructs().push(this);
        
        //tree.mostrarStruct();
        //ast.getStrut('test');et
        return this;
    }

}