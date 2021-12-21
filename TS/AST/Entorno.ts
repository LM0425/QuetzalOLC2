import { Simbolo } from "./Simbolo";
import { Excepcion } from "./Excepcion";

export class Entorno {
    tabla: { [id: string]: Simbolo };
    anterior: Entorno;

    constructor(anterior = null) { // Revisar -> anterior:any o anterior=null
        this.tabla = {}; // Diccionario vacio, es como una tabla hash
        this.anterior = anterior;
    }

    agregarSimbolo(simbolo: Simbolo) {
        let id = simbolo.indentificador.toLowerCase();

        if (this.tabla.hasOwnProperty(id)) {
            //console.log("El simbolo ya existe")
            return new Excepcion("Semantico", "Variable " + simbolo.indentificador + " ya existe", simbolo.fila, simbolo.columna);
        } else {
            this.tabla[id] = simbolo;
            //console.log("simbolo insertado")
            return null; // Se agrego correctamente
        }
    }

    eliminar(id: string): boolean {
        id = id.toLowerCase();
        for (let e: Entorno = this; e != null; e = e.anterior) {
            const value = e.tabla[id]
            if (value !== undefined) {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    existe(id: string): boolean {
        id = id.toLowerCase();
        for (let e: Entorno = this; e != null; e = e.anterior) {
            const value = e.tabla[id]
            if (value !== undefined) {
                return true;
            }
        }
        return false;
    }

    existeEnActual(id: string): boolean {
        id = id.toLowerCase();
        if (this.tabla[id] !== undefined) {
            return true;
        }
        return false;
    }

    getTabla(identificador: string) {
        let tablaActual: Entorno = this;
        let id = identificador.toLowerCase();

        while (tablaActual !== null) {
            if (tablaActual.tabla.hasOwnProperty(id)) {
                // console.log("Simbolo encontrado");
                return tablaActual.tabla[id]; // Retorno Simbolo (variable)
            } else {
                // console.log("Entrando a tabla anterior");
                tablaActual = tablaActual.anterior;
            }
        }

        return null; // No existe el simbolo
    }

    getSimbolo(id: string) {
        id = id.toLowerCase();
        for (let e: Entorno = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazar(id: string, nuevoValor: Simbolo) {
        id = id.toLowerCase();
        for (let e: Entorno = this; e != null; e = e.anterior) {
            const value = e.tabla[id]
            if (value !== undefined) {
                e.tabla[id] = nuevoValor;
            }
        }
    }

    actualizarSimbolo(simbolo: Simbolo) {
        let id = simbolo.indentificador.toLowerCase();
        for (let e: Entorno = this; e != null; e = e.anterior) {
            const value = e.tabla[id];
            //console.log('e es igual a ', value)
            if (value !== undefined) {
                if (value.getTipo() === simbolo.getTipo()) {
                    //console.log("Modificando simbolo");
                    e.tabla[id].setValor(simbolo.getValor());
                    return null;
                } else {
                    //console.log("Tipo diferente en modificacion");
                    return new Excepcion("Semantico", "Tipo de valor difente al tipo del simbolo a modificar", simbolo.getFila(), simbolo.getColumna());
                }

            }
        }

        return new Excepcion("Semantico", "Variable no encontrada en Asignacion", simbolo.getFila(), simbolo.getColumna());
    }

    actualizarTabla(simbolo: Simbolo) {
        let tablaActual: Entorno = this;
        let id = simbolo.indentificador.toLowerCase();

        while (tablaActual !== null) {
            if (tablaActual.tabla.hasOwnProperty(id)) {
                if (tablaActual.tabla[id].getTipo() === simbolo.getTipo()) {
                    //console.log("Modificando simbolo");
                    tablaActual.tabla[id].setValor(simbolo.getValor())
                    return null;
                } else {
                    //console.log("Tipo diferente en modificacion");
                    return new Excepcion("Semantico", "Tipo de valor difente al tipo del simbolo a modificar", simbolo.getFila(), simbolo.getColumna());
                }

            } else {
                tablaActual = tablaActual.anterior;
            }
        }


        return new Excepcion("Semantico", "Variable no encontrada en Asignacion", simbolo.getFila(), simbolo.getColumna());
    }

}