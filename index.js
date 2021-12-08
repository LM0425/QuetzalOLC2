const AST = require("./JS/AST/AST");
const Entorno = require("./JS/AST/Entorno");
const Excepcion = require("./JS/AST/Excepcion");
const gramatica = require('./JS/gramatica');

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);

function displayDate() {
    console.log("Analizando");
    var textoIngresado = document.getElementById('txCodigo').value;
    
    const instrucciones = gramatica.parse(textoIngresado);
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

// function numeracion(e) {
//     let eArea = document.getElementById('areaNumeracion');
//     let eArea2 = document.getElementById('txCodigo');
//     let numeros = eArea2.value.split("\n").length;
//     let msj="";
//     for (let i = 0; i < numeros; i++) {
//         msj += i + "\n";
//     }
//     eArea.value=msj;
// }