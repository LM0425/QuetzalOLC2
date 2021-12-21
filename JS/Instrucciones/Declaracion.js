"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Excepcion_1 = require("../AST/Excepcion");
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
const temporalAux_1 = require("../AST/temporalAux");
class Declaracion {
    constructor(tipo, identficador, fila, columna, expresion, decArreglo, porRefencia, copia) {
        this.tipo = tipo;
        this.identificador = identficador;
        this.fila = fila;
        this.columna = columna;
        this.expresion = expresion;
        this.decArreglo = decArreglo;
        this.porReferencia = porRefencia;
        this.copia = copia;
    }
    traducir(tree, table) {
        //console.log('la expresion es: ',this.expresion);
        /* console.log('la el tipo: ',this.tipo); */
        if (this.decArreglo === true) {
        }
        else {
            if (this.expresion != null) {
                if (this.tipo === Tipo_1.Tipo.INT || this.tipo === Tipo_1.Tipo.DOUBLE) {
                    if (this.expresion.valor || this.expresion.valor === 0) {
                        //console.log("se fue para int con valor")
                        let value = this.expresion.traducir(tree, table);
                        if (value instanceof Excepcion_1.Excepcion)
                            return value;
                        //let temporal=tree.getUltimoTemporal();
                        let apuntador = tree.getApuntadorStack().toString();
                        let texto3d = tree.generarInstruccion("stack[(int)" + apuntador + "] = " + this.expresion.valor);
                        tree.addStack(this.expresion.valor);
                        let temporalAux = new temporalAux_1.TemporalAux(this.identificador[0], this.tipo, this.fila, this.columna, apuntador);
                        tree.addTabla(temporalAux);
                        let lista = tree.getListaTemporalClase();
                        console.log(texto3d + "\n");
                        return "\n//-------------------------Declaracion\n" + texto3d + "\n";
                    }
                    else {
                        //console.log("se fue para int sen valor")
                        //console.log(tree.getTemporalClase());
                        let ultimoTemporal = this.expresion.traducir(tree, table);
                        if (ultimoTemporal instanceof Excepcion_1.Excepcion)
                            return ultimoTemporal;
                        let temporal = tree.getUltimoTemporal();
                        let apuntador = tree.getApuntadorStack().toString();
                        let texto3d = "";
                        texto3d += tree.generarInstruccion("stack[(int)" + apuntador + "] = " + temporal);
                        /* tree.updateConsola(texto3d);
                        tree.updateConsola("\n"); */
                        //let valorTemporal=tree.getValueByTemporal(temporal);
                        tree.addStack(temporal);
                        let temporalAux = new temporalAux_1.TemporalAux(this.identificador[0], this.tipo, this.fila, this.columna, apuntador);
                        tree.addTabla(temporalAux);
                        //console.log(tree.getListaTemporalClase()+ texto3d);
                        texto3d = "\n//-------------------------Declaracion\n" + tree.getListaTemporalClase() + texto3d;
                        /*  console.log(tree.getTemporalClase());
                         console.log(tree.getStack()); */
                        tree.limpiartemporalClase();
                        console.log(texto3d + "\n");
                        return texto3d + "\n";
                    }
                }
                else if (this.tipo === Tipo_1.Tipo.STRING) {
                    let exp = this.expresion.traducir(tree, table);
                    let temporal = tree.generarTemporal();
                    let texto3d = "\n//-------------------------Declaracion\n" + tree.generarInstruccion(temporal + " = H");
                    let apuntadorHeap = tree.getApuntadorHeap();
                    for (let i = 0; i < exp.length; i++) {
                        const element = exp[i];
                        let value = element.charCodeAt(0);
                        tree.addHeap(value);
                        texto3d += tree.generarInstruccion("heap[(int)H] = " + value);
                        texto3d += tree.generarInstruccion('H = H + 1');
                    }
                    tree.addHeap(-1);
                    texto3d += tree.generarInstruccion("heap[(int)H] = -1");
                    texto3d += tree.generarInstruccion('H = H + 1');
                    let apuntador = tree.getApuntadorStack().toString();
                    texto3d += tree.generarInstruccion("stack[(int)" + apuntador + "] = " + temporal);
                    /* tree.updateConsola(texto3d);
                    tree.updateConsola("\n");
 */
                    tree.addStack(apuntadorHeap);
                    let temporalAux = new temporalAux_1.TemporalAux(this.identificador[0], this.tipo, this.fila, this.columna, apuntadorHeap.toString());
                    tree.addTabla(temporalAux);
                    console.log(texto3d);
                    return texto3d;
                }
            }
            else {
                if (this.tipo === Tipo_1.Tipo.INT || this.tipo === Tipo_1.Tipo.DOUBLE) {
                    let texto3d = "";
                    for (let id of this.identificador) {
                        let apuntador = tree.getApuntadorStack().toString();
                        texto3d += tree.generarInstruccion("stack[(int)" + apuntador + "] = " + 0);
                        tree.addStack(0);
                        let temporalAux = new temporalAux_1.TemporalAux(id, this.tipo, this.fila, this.columna, apuntador);
                        tree.addTabla(temporalAux);
                    }
                    console.log(texto3d + "\n");
                    return "\n//-------------------------Declaracion\n" + texto3d + "\n";
                }
            }
        }
    }
    interpretar(tree, table) {
        if (this.decArreglo === true) {
            if (this.porReferencia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null)
                    return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);
                if (this.tipo !== simbolo.getTipoArreglo())
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);
                simbolo.setId(this.identificador.pop());
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
            else if (this.copia) {
                let simbolo = table.getTabla(this.expresion);
                if (simbolo === null)
                    return new Excepcion_1.Excepcion("Semantico", "Variable " + this.identificador + "no encontrada", this.fila, this.columna);
                if (this.tipo !== simbolo.getTipoArreglo())
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de arreglo diferente al tipo de variable", this.fila, this.columna);
                let nuevoSimbolo = new Simbolo_1.Simbolo(this.identificador.pop(), Tipo_1.Tipo.ARRAY, this.fila, this.columna, simbolo.getValor().slice());
                nuevoSimbolo.setTipoArreglo(this.tipo);
                let result = table.agregarSimbolo(nuevoSimbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
            else {
                let value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                if (this.tipo !== this.expresion.tipoArreglo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo del arreglo.", this.fila, this.columna);
                this.tipo = Tipo_1.Tipo.ARRAY;
                let simbolo = new Simbolo_1.Simbolo(this.identificador.pop(), this.tipo, this.fila, this.columna, value);
                simbolo.setTipoArreglo(this.expresion.tipoArreglo);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        else {
            let value = null;
            if (this.expresion !== null) {
                value = this.expresion.interpretar(tree, table); // Valor a asignar a la variable
                if (this.tipo === Tipo_1.Tipo.DOUBLE && this.expresion.tipo === Tipo_1.Tipo.INT) {
                }
                else if (this.tipo !== this.expresion.tipo)
                    return new Excepcion_1.Excepcion("Semantico", "Tipo de dato difente al tipo de la variable.", this.fila, this.columna);
            }
            else {
                if ((this.tipo === Tipo_1.Tipo.INT) || (this.tipo === Tipo_1.Tipo.DOUBLE) || (this.tipo === Tipo_1.Tipo.CHAR))
                    value = 0;
                if (this.tipo === Tipo_1.Tipo.BOOL)
                    value = false;
            }
            for (let id of this.identificador) {
                if (value instanceof Excepcion_1.Excepcion)
                    return value;
                let simbolo = new Simbolo_1.Simbolo(id, this.tipo, this.fila, this.columna, value);
                let result = table.agregarSimbolo(simbolo);
                if (result instanceof Excepcion_1.Excepcion)
                    return result;
            }
        }
        return null;
    }
}
exports.Declaracion = Declaracion;
