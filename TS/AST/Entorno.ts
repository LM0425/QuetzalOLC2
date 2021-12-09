import { Simbolo } from "./Simbolo";
import { Excepcion } from "./Excepcion";

export class Entorno {
    tabla: { [id: string]: Simbolo };
    anterior: Entorno;

    constructor(anterior = null) { // Revisar -> anterior:any o anterior=null
        this.tabla = {}; // Diccionario vacio, es como una tabla hash
        this.anterior = anterior;
    }

    setTabla(simbolo: Simbolo) {
        if (this.tabla.hasOwnProperty(simbolo.indentificador.toLowerCase())) {
            console.log("El simbolo ya existe")
            return new Excepcion("Semantico", "Variable " + simbolo.indentificador + " ya existe", simbolo.fila, simbolo.columna);
        } else {
            this.tabla[simbolo.indentificador.toLowerCase()] = simbolo;
            console.log("simbolo insertado")
            return null; // Se agrego correctamente
        }
    }

    getTabla(identificador: string) {
        let tablaActual: Entorno

        while (tablaActual.tabla !== null) {
            if (tablaActual.tabla.hasOwnProperty(identificador.toLowerCase())) {
                console.log("Simbolo encontrado");
                return tablaActual.tabla[identificador.toLowerCase()]; // Retorno Simbolo (variable)
            } else {
                tablaActual = tablaActual.anterior;
            }
        }

        return null; // No existe el simbolo
    }

    actualizarTabla(simbolo: Simbolo) {
        let tablaActual: Entorno;
        let id = simbolo.indentificador.toLowerCase();

        while (tablaActual.tabla !== null) {
            if (tablaActual.tabla.hasOwnProperty(id)) {
                if (tablaActual.tabla[id].getTipo() === simbolo.getTipo()) {
                    console.log("Modificando simbolo");
                    tablaActual.tabla[id].setValor(simbolo.getValor())
                    return null;
                } else {
                    console.log("Tipo diferente en modificacion");
                    return new Excepcion("Semantico", "Tipo de valor difente al tipo del simbolo a modificar", simbolo.getFila(), simbolo.getColumna());
                }

            } else {
                tablaActual = tablaActual.anterior;
            }
        }


        return new Excepcion("Semantico", "Variable no encontrada en Asignacion", simbolo.getFila(), simbolo.getColumna());
    }

    agregar(id: string, simbolo: Simbolo) {
        id = id.toLowerCase();
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.tabla[id] = simbolo;
    }

    agregarSimbolo(simbolo: Simbolo) {
        let id = simbolo.indentificador.toLowerCase();

        if (this.tabla.hasOwnProperty(id)) {
            console.log("El simbolo ya existe")
            return new Excepcion("Semantico", "Variable " + simbolo.indentificador + " ya existe", simbolo.fila, simbolo.columna);
        } else {
            this.tabla[id] = simbolo;
            console.log("simbolo insertado")
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
            if (value !== undefined) {
                if (value.getTipo() === simbolo.getTipo()) {
                    console.log("Modificando simbolo");
                    e.tabla[id].setValor(simbolo.getValor());
                    return null;
                } else {
                    console.log("Tipo diferente en modificacion");
                    return new Excepcion("Semantico", "Tipo de valor difente al tipo del simbolo a modificar", simbolo.getFila(), simbolo.getColumna());
                }

            }
        }

        return new Excepcion("Semantico", "Variable no encontrada en Asignacion", simbolo.getFila(), simbolo.getColumna());
    }

}