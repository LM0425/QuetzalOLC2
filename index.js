const AST = require("./JS/AST/AST");
const Entorno = require("./JS/AST/Entorno");
const Excepcion = require("./JS/AST/Excepcion");
const gramatica = require('./JS/gramatica');

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);

function displayDate() {
    console.log("Analizando");
    
    const instrucciones = gramatica.parse("print(10.56);");
    const ast = new AST.AST(instrucciones);
    const entornoGlobal = new Entorno.Entorno(null);
    ast.setTSglobal(entornoGlobal);
    ast.getInstrucciones().forEach((element) => {
        let value = element.interpretar(ast, entornoGlobal);
        if (value instanceof Excepcion.Excepcion) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
    });
    console.log(ast.getConsola());
}

// function analizar(entrada) {
    
//     console.log("analizar");
//     console.log(entrada);
//     try {
//         test=gramatica.parse(entrada);
//         console.log("test",test)
//     } catch (error) {
//         console.log(error);   
//     }
// }