"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
const Entorno_1 = require("../AST/Entorno");
const Excepcion_1 = require("../AST/Excepcion");
class Struct {
    constructor(tipo, identficador, fila, columna, expresion, tipoStruct) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.tipoStruct = tipoStruct;
    }
    interpretar(tree, table) {
        let value = null;
        /*if (this.expresion !== null) {
            value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
            if (this.tipo !== this.expresion.tipo) return new Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
        }*/
        //console.log('la expresion es: ',this.expresion[0]);
        let nuevaTabla = new Entorno_1.Entorno(table);
        for (let id of this.expresion[0]) {
            //if (value instanceof Excepcion) return value;
            /* console.log('el id es',id);
            let arr:any = Array.from(id); */
            //let aux:any=[id];
            let result = id.interpretar(tree, nuevaTabla);
            //console.log('el valor es:', result)
            if (result instanceof Excepcion_1.Excepcion) {
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
exports.Struct = Struct;
