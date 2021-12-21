import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Tipo } from "../AST/Tipo";

export class AccesoArreglo implements Instruccion {

    identificador: string;
    expresiones: any;
    expInicial: any;
    expFinal: any;
    fila: number;
    columna: number;
    tipo: Tipo;

    constructor(identificador: string, expresiones: any, expInicial: any, expFinal: any, fila: number, columna: any) {
        this.identificador = identificador;
        this.expresiones = expresiones;
        this.expInicial = expInicial;
        this.expFinal = expFinal;
        this.fila = fila;
        this.columna = columna;
        this.tipo = Tipo.NULL;
    }
    traducir(tree: AST, table: Entorno) {
        throw new Error("Method not implemented.");
    }

    interpretar(tree: AST, table: Entorno) {
        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + " no encontrada.", this.fila, this.columna);

        if (simbolo.getTipo() !== Tipo.ARRAY) return new Excepcion("Semantico", "Variable " + this.identificador + " no es un arreglo.", this.fila, this.columna);
        this.tipo = simbolo.getTipo();

        if (this.expresiones !== null) {
            let listaPos = []
            for (let expresion of this.expresiones) {
                let temp = expresion.interpretar(tree, table);
                if (temp instanceof Excepcion) return temp;
                listaPos.push(temp);
            }

            let value = this.buscarDimensiones(tree, table, listaPos.slice(), simbolo.getValor());
            if(value instanceof Excepcion) return value;

            this.tipo = simbolo.getTipoArreglo();

            return value;
        } else {
            let longitud = simbolo.getValor().length;
            let posInicial = 0;
            let posFinal = longitud;
            if(this.expInicial !== true){
                posInicial = this.expInicial.interpretar(tree,table);
                if(posInicial < 0) return new Excepcion("Semantico", "Posicion inicial menor que cero",this.fila, this.columna);
                if(posInicial >= longitud) return new Excepcion("Semantico","Posicion inicial mayor que la longitud del arreglo", this.fila, this.columna);
            }
            if(this.expFinal !== true){
                posFinal = this.expFinal.interpretar(tree,table);
                if(posFinal < 0) return new Excepcion("Semantico", "Posicion final menor que cero",this.fila, this.columna);
                if(posInicial > longitud) return new Excepcion("Semantico","Posicion final mayor que la longitud del arreglo", this.fila, this.columna);
            }

            // Definir el tipo de dato que estoy retornando (Pense agregar tipo y tipo arreglo (?))

            return simbolo.getValor().slice(posInicial, posFinal)
        }
    }

    buscarDimensiones(tree: AST, table: Entorno, expresiones: any, arreglo: any) {
        var value = null;
        if (expresiones.length === 0) return arreglo;
        
        if (!(arreglo instanceof Array)) return new Excepcion("Semantico", "Acceso de mas en el arreglo", this.fila, this.columna);
        let dimension = expresiones.shift()

        try {
            var value = this.buscarDimensiones(tree, table, expresiones.slice(), arreglo[dimension]);
        } catch (error) {
            return new Excepcion("Semantico", "La posicion dada es negativa o mayor que la dimension del arreglo", this.fila, this.columna);
        }

        return value
    }

}