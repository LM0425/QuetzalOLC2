import { AST } from "./AST/AST";
import { Entorno } from "./AST/Entorno";
import { Instruccion } from "./Abstract/Instruccion";
import { Excepcion } from "./AST/Excepcion";

const gramatica = require('../gramatica');

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);

function displayDate() {
    const instrucciones = gramatica.parse("print(10.56);");
    const ast:AST = new AST(instrucciones);
    const entornoGlobal:Entorno = new Entorno(null);
    ast.setTSglobal(entornoGlobal);

    ast.getInstrucciones().forEach((element:Instruccion) => {
        let value = element.interpretar(ast,entornoGlobal);

        if(value instanceof Excepcion){
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
    })

    console.log(ast.getConsola());
  }

function analizar(entrada:any){

    const instrucciones = gramatica.parse(String(entrada));
    const ast:AST = new AST(instrucciones);
    const entornoGlobal:Entorno = new Entorno(null);
    ast.setTSglobal(entornoGlobal);

    ast.getInstrucciones().forEach((element:Instruccion) => {
        let value = element.interpretar(ast,entornoGlobal);

        if(value.instanceOf(Excepcion)){
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
    })

    console.log(ast.getConsola());
}