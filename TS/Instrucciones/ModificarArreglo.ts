import { Instruccion } from "../Abstract/Instruccion";
import { NodoAST } from "../Abstract/NodoAST";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class ModificarArreglo implements Instruccion{

    identificador:string;
    expresiones:any;
    valor:any;
    fila: number;
    columna: number;

    constructor(identificador:string, expresiones:any, valor:any, fila:number, columna:number){
        this.identificador = identificador;
        this.expresiones = expresiones;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let value = this.valor.interpretar(tree, table);
        if(value instanceof Excepcion) return value;

        let simbolo = table.getTabla(this.identificador);
        if(simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + " no encontrada.", this.fila, this.columna);

        if(simbolo.getTipo() !== Tipo.ARRAY) return new Excepcion("Semantico", "Variable " + this.identificador + " no es un arreglo.", this.fila, this.columna);

        if(simbolo.getTipoArreglo() !== this.valor.tipo) return new Excepcion("Semantico", "Tipo de dato a asignar difente al tipo del arreglo", this.fila, this.columna);

        let listaPos = []
        for(let expresion of this.expresiones){
            let temp = expresion.interpretar(tree, table);
            if(temp instanceof Excepcion) return temp;
            listaPos.push(temp);
        }

        let interpretar = !(String(typeof value)==="number") && !(String(typeof value)==="string") && !(String(typeof value)==="boolean") && !(value instanceof Array)
        while(interpretar){
            value = value.interpretar(tree, table);
            if(value instanceof Excepcion) return value;
            interpretar = !(String(typeof value)==="number") && !(String(typeof value)==="string") && !(String(typeof value)==="boolean") && !(value instanceof Array)
        }

        let val = this.modificarDimensiones(tree, table, listaPos.slice(), simbolo.getValor(), value);
        if(val instanceof Excepcion) return val;

        return val;
    }

    modificarDimensiones(tree: AST, table:Entorno, expresiones:any, arreglo:any, valor:any){
        if(expresiones.length === 0){
            if(arreglo instanceof Array) return new Excepcion("Semantico", "Modificacion a Arreglo incompleta", this.fila, this.columna);
            return valor
        }
        if(!(arreglo instanceof Array)) return new Excepcion("Semantico", "Acceso de mas al Arreglo", this.fila, this.columna);
        let dimension = expresiones.shift()

        try {
            var value = this.modificarDimensiones(tree, table, expresiones.slice(), arreglo[dimension],valor);
        } catch (error) {
            return new Excepcion("Semantico", "La posicion dada es negativa o mayor que la dimension del arreglo", this.fila, this.columna);
        }

        if(value instanceof Excepcion) return value;
        if(value !== null) arreglo[dimension] = value

        return null
    }

    getNodo() {
        let nodo = new NodoAST("MODIFICAR ARREGLO");
        nodo.agregarHijo(String(this.identificador));

        let exp = new NodoAST("EXPRESIONES DE LAS DIMENSIONES")
        for(let expresion of this.expresiones){
            exp.agregarHijoNodo(expresion.getNodo());
        }
        nodo.agregarHijoNodo(exp);
        let val = new NodoAST("VALOR A ASIGNAR");
        val.agregarHijoNodo(this.valor.getNodo());

        nodo.agregarHijoNodo(val);
        return nodo;
        
    }

}