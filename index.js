const { AST } = require("./JS/AST/AST");
const { Entorno } = require("./JS/AST/Entorno");
const { Excepcion } = require("./JS/AST/Excepcion");
const { Funcion } = require("./JS/Instrucciones/Funcion");
const { parse } = require('./JS/gramatica');
const { Declaracion } = require("./JS/Instrucciones/Declaracion");
const { Asignacion } = require("./JS/Instrucciones/Asignacion");
const { ModificarArreglo } = require("./JS/Instrucciones/ModificarArreglo");
const { Main } = require("./JS/Instrucciones/Main");
const { Imprimir } = require("./JS/Instrucciones/Imprimir");
const { Struct } = require("./JS/Instrucciones/struct");

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);
document.getElementById("eventoTraducir").addEventListener("click", traducirCodigo);


function traducirCodigo() {
    console.log("Traduciendo");
    var instrucciones3D = "";
    var textoIngresado = document.getElementById('txCodigo').value;

    const instrucciones = parse(textoIngresado);
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);
    ast.getInstrucciones().forEach((element) => {
        let value = element.traducir(ast, entornoGlobal);
        if (value instanceof Excepcion) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
        //console.log("el valor es ",value);
        instrucciones3D += value;
        //ast.getStructs().push(value);
        //ast.getStrut('test');
        /*if (value instanceof Struct) {
            ast.getStructs().push(value)
        }*/
    });
    //console.log(ast.getEncabezado());

    //console.log(ast.getConsola());
    //console.log(ast.getListaTemporales());
   /*  console.log('el encabezado es: \n',ast.getEncabezado());
    console.log('la lista de temporales es:\n' ,ast.getListaTemporales())
    console.log("las instrucciones son \n", instrucciones3D); */
    document.getElementById("editorSalida").value  = ast.getEncabezado()+"\ndouble "+ast.getListaTemporales()+";\n\n"+ast.getMain(instrucciones3D);
}

function displayDate() {
    console.log("Analizando");
    var textoIngresado = document.getElementById('txCodigo').value;

    const instrucciones = parse(textoIngresado);
    console.log(instrucciones)
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);

    for (let instruccion of ast.getInstrucciones()) { // Primera Pasada
        if (instruccion instanceof Funcion) {
            ast.addFuncion(instruccion);
            continue;
        }

        if ((instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct)) {
            let value = instruccion.interpretar(ast, entornoGlobal);

            if (value instanceof Excepcion) {
                ast.getExcepciones().push(value);
                ast.updateConsola(value.toString());
            }
        }

    }

    let contador = 0;

    for (let instruccion of ast.getInstrucciones()) { // Segunda Pasada
        if (instruccion instanceof Main) {
            contador += 1;

            if (contador == 2) {
                let err = new Excepcion("Semantico", "Existe mas de una funcion Main", instruccion.fila, instruccion.columna);
                ast.getExcepciones().push(err);
                ast.updateConsola(err.toString());
            }

            let value = instruccion.interpretar(ast, entornoGlobal);
            if (value instanceof Excepcion) {
                ast.getExcepciones().push(value);
                ast.updateConsola(value.toString());
            }
            if (value instanceof Imprimir) {
                let err = new Excepcion("Semantico", "Instruccion Imprimir en entorno global", instruccion.fila, instruccion.columna);
                ast.getExcepciones().push(err);
                ast.updateConsola(err.toString());
            }
        }

    }

    for (let instruccion of ast.getInstrucciones()) { // Tercera Pasada
        if (!((instruccion instanceof Funcion) || (instruccion instanceof Main) || (instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct))) {
            let err = new Excepcion("Semantico", "Sentencia fuera de Main", instruccion.fila, instruccion.columna);
            ast.getExcepciones().push(err);
            ast.updateConsola(err.toString());
        }
    }

    console.log(ast.getConsola());
}

/* function numeracion(e) {
    let eArea = document.getElementById('areaNumeracion');
     let eArea2 = document.getElementById('txCodigo');
     let numeros = eArea2.value.split("\n").length;
     let msj="";
     for (let i = 0; i < numeros; i++) {
         msj += i + "\n";
     }
     eArea.value=msj;
 } 

 function numeracion2(e) {
    let eArea = document.getElementById('areaNumeracion2');
     let eArea2 = document.getElementById('editorSalida');
     let numeros = eArea2.value.split("\n").length;
     let msj="";
     for (let i = 1; i < numeros; i++) {
         msj += i + "\n";
     }
     eArea.value=msj;
 }*/