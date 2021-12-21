import { Instruccion } from "../Abstract/Instruccion";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Excepcion } from "../AST/Excepcion";
import { Break } from "./Break";
import { Return } from "./Return";

export class Switch implements Instruccion{

    expresion:any;
    cases:any;
    porDefecto:any;
    fila: number;
    columna: number;

    constructor(expresion:any, cases:any, porDefecto:any, fila:number, columna:number){
        this.expresion = expresion;
        this.cases = cases;
        this.porDefecto = porDefecto;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(tree: AST, table: Entorno) {
        let variable=this.expresion.traducir(tree,table);
        console.log("la tabla tiene: ",tree.getTabla())
        let posStack=tree.getValorTablaByIdentificador(variable);
        let temporal =tree.generarTemporal();
        
        let etiquetaSalida=tree.generarEtiquetas();
        let texto3d="\n//-----------------switch\n";
        texto3d+=tree.generarInstruccion(temporal+" = stack[(int)"+posStack+"]");
        let etiquetaDefault;
        for(let k = 0; k < this.cases.length; k++){
            const caso = this.cases[k];
            let expresionCaso = caso.traducir(tree, table);
            let etiquetainstruccion=tree.generarEtiquetas();
            let etiquetaSalidaAux=tree.generarEtiquetas();
            etiquetaDefault=etiquetaSalidaAux;
            //console.log("el caso es: ",expresionCaso)
            //console.log("el id es ",expresionCaso.identificador);            
            texto3d+=tree.generarInstruccion("if("+temporal+"=="+expresionCaso.identificador+") goto "+etiquetainstruccion);
            texto3d+=tree.generarInstruccion("goto "+etiquetaSalidaAux);
            texto3d+="\n"+etiquetainstruccion+":\n";
            for (let i = 0; i < expresionCaso.instrucciones.length; i++) {
                const element = expresionCaso.instrucciones[i];
                //console.log('las intrucciones del caso son: ',element.traducir(tree,table));
                texto3d+=element.traducir(tree,table);                
            }
            
            texto3d+=tree.generarInstruccion("goto "+etiquetaSalida);
            if (this.cases[k+1]) {
                //let temporalSiguiente=tree.generarEtiquetas();
                texto3d+="\n"+etiquetaSalidaAux+":"
            }
            
        }

        texto3d+="\n"+etiquetaDefault+":\n"

        for (let i = 0; i < this.porDefecto.instrucciones.length; i++) {
            const element = this.porDefecto.instrucciones[i];
            texto3d+=element.traducir(tree,table); 
        }

        texto3d+="\n"+etiquetaSalida+":\n";
        console.log(texto3d);
        return texto3d;
    }

    interpretar(tree: AST, table: Entorno) {
        let condicion = this.expresion.interpretar(tree, table);
        if(condicion instanceof Excepcion) return condicion;

        let cumple = false;

        if(this.cases !== null){
            for(let caso of this.cases){
                let expresionCaso = caso.interpretar(tree, table);

                if(expresionCaso instanceof Excepcion){
                    tree.getExcepciones().push(expresionCaso);
                    tree.updateConsola(expresionCaso.toString());
                    continue
                }

                if(this.expresion.tipo === caso.expresion.tipo){
                    if(condicion === expresionCaso){
                        let nuevaTabla = new Entorno(table);
                        for(let instruccion of caso.instrucciones){
                            let result = instruccion.interpretar(tree, nuevaTabla);
                            if(result instanceof Excepcion){
                                tree.getExcepciones().push(result);
                                tree.updateConsola(result.toString());
                            }

                            if(result instanceof Break){
                                cumple = true;
                                return null;
                            }

                            if(result instanceof Return){
                                cumple = true;
                                return result;
                            }
                        }
                    }
                }
            }
        }

        if(!cumple){
            if(this.porDefecto !== null){
                let nuevaTabla = new Entorno(table);
                for(let instruccion of this.porDefecto.instrucciones){
                    let result = instruccion.interpretar(tree, nuevaTabla);
                    if(result instanceof Excepcion){
                        tree.getExcepciones().push(result);
                        tree.updateConsola(result.toString());
                    }

                    if(result instanceof Break) return null;
                    if(result instanceof Return){
                        return result;
                    }
                }
            }
        }
    }
    
}