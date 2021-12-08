/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

";"                 return 'PTCOMA';
","					return 'COMA';
"."					return 'PUNTO';
":"					return 'DOSPT';
"?"					return 'TERNARIO'
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';
"{"					return 'LLAVEIZQ';
"}"					return 'LLAVEDER';

"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';
"%"					return 'MODULO';

'=='                return 'IGUALIGUAL';
'!='                return 'DIFERENTE';
'>='                return 'MAYORIGUAL';
'<='                return 'MENORIGUAL';
'>'                 return 'MAYOR';
'<'                 return 'MENOR';
'='                 return 'IGUAL';

'&&'                return 'AND';
'||'              	return 'OR';
'!'                 return 'NOT';
'&'					return 'CONCATENAR';
'^'					return 'REPETICION';

'int'               return 'RINT';
'double'            return 'RDOUBLE';
'float'				return 'RFLOAT';
'String'            return 'RSTRING';
'char'				return 'RCHAR'
'boolean'			return 'RBOOLEAN';
'void'				return 'RVOID';
'null'				return 'RNULL';

'println'           return 'RPRINTLN';
'print'             return 'RPRINT';
'main'				return 'RMAIN';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

/* comentarios */
[//.*]             	{}
[/\*(.|\n)*?\*/]    {}

[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
[a-zA-Z][a-zA-Z_0-9]*   return 'ID';
[\"[^\']*?\"]    		return  'CADENA';
[\'[^\'\\]\'] 			return 'CARACTER';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Imports */

%{
	const { Primitivos } = require("./dist/Expresiones/Primitivos");
	const { Aritmetica } = require("./dist/Expresiones/Aritmetica");
	const { Imprimir } = require("./dist/Instrucciones/Imprimir");
	const { Tipo, OperadorAritmetico } = require("./dist/AST/Tipo");
%}
/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF { $$ = $1; return $$;}
;

instrucciones
	: instrucciones instruccion { $1.push($2); $$ = $1;}
	| instruccion  { $$ = [$1]; }
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instruccion
	: variables PTCOMA { $$ = $1; }
	| imprimir PTCOMA { $$ = $1; }
;

variables
	: tipo ID IGUAL expresion { console.log("Variable declarada de tipo " + $1 + " con nombre " + $2 + " y valor " + $4);}
	| tipo listaid { console.log("lista de variables de tipo " + $1 + " con variables " + $2);}
	| ID IGUAL expresion { console.log("asignacion a variable " + $1 + " de nuevo valor " + $3);}
;

listaid
	: listaid COMA ID {$$ = $1; $$.push($3); }
	| ID { $$ = new Array(); $$.push($1); }
;

tipo
	: RINT
	| RDOUBLE
	| RFLOAT
	| RSTRING
	| RCHAR
	| RBOOLEAN
;

expresion
	: MENOS expresion %prec UMENOS  { $$ = new Aritmetica(OperadorAritmetico.UMENOS, $2, null, @1.first_line, @1.first_column); }
	| expresion MAS expresion       { $$ = new Aritmetica(OperadorAritmetico.MAS, $1, $2, @1.first_line, @1.first_column); }
	| expresion MENOS expresion     { $$ = new Aritmetica(OperadorAritmetico.MENOS, $1, $2, @1.first_line, @1.first_column); }
	| expresion POR expresion       { $$ = new Aritmetica(OperadorAritmetico.POR, $1, $2, @1.first_line, @1.first_column); }
	| expresion DIVIDIDO expresion  { $$ = new Aritmetica(OperadorAritmetico.DIV, $1, $2, @1.first_line, @1.first_column); }
	| ENTERO                        { $$ = new Primitivos(OperadorAritmetico.INT, $1, @1.first_line, @1.first_column); }
	| DECIMAL                       { $$ = new Primitivos(OperadorAritmetico.DOUBLE, $1, @1.first_line, @1.first_column); }
	| PARIZQ expresion PARDER       { $$ = $2; }
	| CADENA 						{ $$ = new Primitivos(Tipo.STRING, $1, @1.first_line, @1.first_column);}
;

imprimir
	: RPRINT PARIZQ expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column); }
;