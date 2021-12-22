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
const { Llamada_struct } = require("./JS/Instrucciones/llamada_struct");
const { NodoAST } = require("./JS/Abstract/NodoAST");

document.getElementById("eventoAnalizar").addEventListener("click", displayDate);
document.getElementById("eventoTraducir").addEventListener("click", traducirCodigo);
document.getElementById("tablaTaductor").addEventListener("click", tablaTraductor);


function traducirCodigo() {
    console.log("Traduciendo");
    var instrucciones3D = "";
    var textoIngresado = document.getElementById('txCodigo').value;
    const result = parse(textoIngresado);
    const instrucciones = result['instrucciones'];
    console.log("instrucciones: ",instrucciones)
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);
    ast.getInstrucciones().forEach((element) => {
        let value = element.traducir(ast, entornoGlobal);
        if (value instanceof Excepcion) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
   
        instrucciones3D += value;

    });
  
    let main="\n\n/*------MAIN------*/\nvoid main() {\nP = 0; H = 0;\n"+instrucciones3D+"\n"+ast.getMain()+"return;\n}";
    document.getElementById("editorSalida").value  = ast.getEncabezado()+"\ndouble "+ast.getListaTemporales()+";\n\n"+ast.getListaFunciones3D()+main;
    
}
function tablaTraductor() {
    console.log("tabla traductor");
    var instrucciones3D = "";
    var textoIngresado = document.getElementById('txCodigo').value;
    const result = parse(textoIngresado);
    const instrucciones = result['instrucciones'];
    
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);
    console.log("instrucciones: ",instrucciones)
    ast.getInstrucciones().forEach((element) => {
        let value = element.traducir(ast, entornoGlobal);
        if (value instanceof Excepcion) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
   
        instrucciones3D += value;

    });
  
    let main="\n\n/*------MAIN------*/\nvoid main() {\nP = 0; H = 0;\n"+instrucciones3D+"\n"+ast.getMain()+"return;\n}";
    document.getElementById("editorSalida").value  = ast.getEncabezado()+"\ndouble "+ast.getListaTemporales()+";\n\n"+ast.getListaFunciones3D()+main;
    
    console.log(ast.reporteTabla());
    var elemento="<div>"+ast.reporteTabla()+"</div>"
    document.getElementById("tabla").insertAdjacentHTML("afterbegin",elemento)
}

function displayDate() {
    console.log("Analizando");
    var textoIngresado = document.getElementById('txCodigo').value;

    const result = parse(textoIngresado);
    const instrucciones = result['instrucciones'];
    const errores = result['errores'];
    //console.log(instrucciones)
    const ast = new AST(instrucciones);
    const entornoGlobal = new Entorno(null);
    ast.setTSglobal(entornoGlobal);
    
    for(let error of errores){
        ast.getExcepciones().push(error);
        ast.updateConsola(error.toString());
    }

    for (let instruccion of ast.getInstrucciones()) { // Primera Pasada
        if (instruccion instanceof Funcion) {
            ast.addFuncion(instruccion);
            continue;
        }

        if ((instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct) || (instruccion instanceof Llamada_struct)) {
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
        if (!((instruccion instanceof Funcion) || (instruccion instanceof Main) || (instruccion instanceof Declaracion) || (instruccion instanceof Asignacion) || (instruccion instanceof ModificarArreglo) || (instruccion instanceof Struct) || (instruccion instanceof Llamada_struct))) {
            let err = new Excepcion("Semantico", "Sentencia fuera de Main", instruccion.fila, instruccion.columna);
            ast.getExcepciones().push(err);
            ast.updateConsola(err.toString());
        }
    }

    //console.log(ast.getConsola());
    document.getElementById("editorSalida").value  =ast.getConsola();

    let init = new NodoAST("RAIZ");
    let instr = new NodoAST("INSTRUCCIONES");

    for(let instruccion of ast.getInstrucciones()){
        instr.agregarHijoNodo(instruccion.getNodo());
    }

    init.agregarHijoNodo(instr);
    let grafo = ast.getDot(init);

    //console.log(grafo)
    var divAST = document.getElementById("ast")
    //divAST.innerHTML = "<h5> probando </h5>"
    var viz = new Viz();

    viz.renderSVGElement(grafo).then(function (element){
        divAST.appendChild(element);
    })
    .catch((error) => {
        console.log(error)
    })

    let tableError = document.getElementById("tableE")
    let contadorError = 1;
    for(let error of ast.getExcepciones()){
        let row = document.createElement("tr")
        var err = document.createElement("td")
        err.innerHTML = contadorError
        row.appendChild(err)
        var cell1 = document.createElement("td")
        cell1.innerHTML = error.tipo
        row.appendChild(cell1)
        var cell2 = document.createElement("td")
        cell2.innerHTML = error.descripcion
        row.appendChild(cell2)
        var cell3 = document.createElement("td")
        cell3.innerHTML = error.fila
        row.appendChild(cell3)
        var cell4 = document.createElement("td")
        cell4.innerHTML = error.columna
        row.appendChild(cell4)
        tableError.appendChild(row)
        contadorError++;
    }
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