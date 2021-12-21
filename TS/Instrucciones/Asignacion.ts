import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { TemporalAux } from "../AST/temporalAux";


export class Asignacion implements Instruccion {
    identificador: string;
    expresion: any;
    fila: number;
    columna: number;

    constructor(identificador: string, expresion: any, fila: number, columna: number) {
        this.identificador = identificador;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        let valor=this.expresion.traducir(tree,table);
        let texto3d="";
        let lista=tree.getListaTemporalClase();
        let posStack=tree.getValorTablaByIdentificador(this.identificador);
        let value=tree.getValorPosStack(posStack).toString()
        if (this.expresion.valor) {
            texto3d=tree.generarInstruccion("stack[(int)"+posStack+"] = "+this.expresion.valor);
            
        } else {
            texto3d=tree.generarInstruccion("stack[(int)"+posStack+"] = "+valor);
        }
        tree.limpiartemporalClase();
        console.log(lista + texto3d)
       return "\n//-------------------Asignacion\n"+lista + texto3d;

    }

    interpretar(tree: AST, table: Entorno) {
        let value = this.expresion.interpretar(tree, table);
        if (value instanceof Excepcion) return value;

        let simbolo = table.getTabla(this.identificador);
        if (simbolo === null) return new Excepcion("Semantico", "Variable " + this.identificador + " no encontrada", this.fila, this.columna);

        var result: any;

        if ((simbolo.getTipo() === Tipo.DOUBLE) && (this.expresion.tipo === Tipo.INT)) {
            let simboloActualizado = new Simbolo(this.identificador, simbolo.getTipo(), this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        } else {
            let simboloActualizado = new Simbolo(this.identificador, this.expresion.tipo, this.fila, this.columna, value);
            result = table.actualizarTabla(simboloActualizado);
        }
        if (result instanceof Excepcion) return result;

        return null;
    }

}