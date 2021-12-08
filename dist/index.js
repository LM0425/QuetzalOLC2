"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("./AST/AST");
const Entorno_1 = require("./AST/Entorno");
const Excepcion_1 = require("./AST/Excepcion");
const CodeMirror = __importStar(require("./codemirror"));
require("codemirror/lib/codemirror.css");
require("codemirror/addon/display/fullscreen.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/addon/display/fullscreen.js");
require("../../styles/components/_codemirror.css");
const gramatica = require('../gramatica');
var editor = CodeMirror.fromTextArea(document.getElementById('editorEntrada'), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true
});
editor.setSize("650", "600");
var editor2 = CodeMirror.fromTextArea(document.getElementById('editorSalida'), {
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true
});
editor2.setSize("650", "600");
document.getElementById("eventoAnalizar").addEventListener("click", displayDate);
function displayDate() {
    const instrucciones = gramatica.parse("print(10.56);");
    const ast = new AST_1.AST(instrucciones);
    const entornoGlobal = new Entorno_1.Entorno(null);
    ast.setTSglobal(entornoGlobal);
    ast.getInstrucciones().forEach((element) => {
        let value = element.interpretar(ast, entornoGlobal);
        if (value instanceof Excepcion_1.Excepcion) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
    });
    console.log(ast.getConsola());
}
function analizar(entrada) {
    const instrucciones = gramatica.parse(String(entrada));
    const ast = new AST_1.AST(instrucciones);
    const entornoGlobal = new Entorno_1.Entorno(null);
    ast.setTSglobal(entornoGlobal);
    ast.getInstrucciones().forEach((element) => {
        let value = element.interpretar(ast, entornoGlobal);
        if (value.instanceOf(Excepcion_1.Excepcion)) {
            ast.getExcepciones().push(value);
            ast.updateConsola(value.toString());
        }
    });
    console.log(ast.getConsola());
}
