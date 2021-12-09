/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

escapeChar              [\'\"\\bfnrtv]
escape                  \\{escapeChar}
acceptedCharDouble      [^\"\\]+
stringDouble            {escape}|{acceptedCharDouble}
stringLiteral           \"{stringDouble}\"

acceptedCharSingle      [^\'\\]
stringSingle            {escape}|{acceptedCharDouble}
charLiteral             \'{stringDouble}\'

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
'true'				return 'RTRUE';
'false'				return 'RFALSE';
'void'				return 'RVOID';
'null'				return 'RNULL';

'println'           return 'RPRINTLN';
'print'             return 'RPRINT';
'main'				return 'RMAIN';
'if'				return 'RIF';
'else'				return 'RELSE';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

/* comentarios */
[//.*]             	{}
[/\*(.|\n)*?\*/]    {}

[0-9]+\.[0-9]+\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
[a-zA-Z][a-zA-Z_0-9]*   return 'ID';
// [\"[^\']*?\"]    		return  'CADENA';
// [\'[^\'\\]\'] 			return 'CARACTER';
{stringLiteral}         {
                            yytext = yytext.substr(1, yyleng - 2)
                            return 'CADENA'
                        }
{charLiteral}           {
                            yytext = yytext.substr(1, yyleng - 2)
                            return 'CARACTER'
                        }

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Imports */

%{
	const { Tipo, OperadorAritmetico, OperadorRelacional, OperadorLogico } = require("./AST/Tipo");
	const { Primitivos } = require("./Expresiones/Primitivos");
	const { Aritmetica } = require("./Expresiones/Aritmetica");
	const { Relacional } = require("./Expresiones/Relacional");
	const { Logica } = require("./Expresiones/Logica");
	const { Declaracion } = require("./Instrucciones/Declaracion");
	const { Asignacion } = require("./Instrucciones/Asignacion");
	const { Identificador } = require("./Expresiones/Identificador");
	const { Imprimir } = require("./Instrucciones/Imprimir");
	const { If } = require("./Instrucciones/If");
	
%}
/* Asociación de operadores y precedencia */
%left 'OR'
%left 'AND'
%left 'UNOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENOR' 'MAYOR' 'MENORIGUAL' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO' 'MODULO'
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
	: variables PTCOMA	{ $$ = $1; }
	| imprimir PTCOMA 	{ $$ = $1; }
	| llamada PTCOMA 	{ $$ = $1; }
	| if 				{ $$ = $1; }
;

variables
	: tipo ID IGUAL expresion 	{ $$ = new Declaracion($1, [$2], @1.first_line, @1.first_column, $4); }
	| tipo listaid 				{ $$ = new Declaracion($1, $2, @1.first_line, @1.first_column, null); }
	| ID IGUAL expresion 		{ $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
;

listaid
	: listaid COMA ID {$$ = $1; $$.push($3); }
	| ID { $$ = new Array(); $$.push($1); }
;

tipo
	: RINT 		{ $$ = Tipo.INT; }
	| RDOUBLE 	{ $$ = Tipo.DOUBLE; }
	| RSTRING	{ $$ = Tipo.STRING; }
	| RCHAR		{ $$ = Tipo.CHAR; }
	| RBOOLEAN	{ $$ = Tipo.BOOL; }
;

expresion
	: MENOS expresion %prec UMENOS  	{ $$ = new Aritmetica(OperadorAritmetico.UMENOS, $2, null, @1.first_line, @1.first_column); }
	| expresion MAS expresion       	{ $$ = new Aritmetica(OperadorAritmetico.MAS, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOS expresion     	{ $$ = new Aritmetica(OperadorAritmetico.MENOS, $1, $3, @1.first_line, @1.first_column); }
	| expresion POR expresion       	{ $$ = new Aritmetica(OperadorAritmetico.POR, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIVIDIDO expresion  	{ $$ = new Aritmetica(OperadorAritmetico.DIV, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOR expresion			{ $$ = new Relacional(OperadorRelacional.MENORQUE, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAYOR expresion			{ $$ = new Relacional(OperadorRelacional.MAYORQUE, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENORIGUAL expresion	{ $$ = new Relacional(OperadorRelacional.MENORIGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAYORIGUAL expresion	{ $$ = new Relacional(OperadorRelacional.MAYORIGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion IGUALIGUAL expresion	{ $$ = new Relacional(OperadorRelacional.IGUALIGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIFERENTE expresion		{ $$ = new Relacional(OperadorRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column); }
	| expresion AND expresion			{ $$ = new Logica(OperadorLogico.AND, $1, $3, @1.first_line, @1.first_column); }
	| expresion OR expresion			{ $$ = new Logica(OperadorLogico.OR, $1, $3, @1.first_line, @1.first_column); }
	| NOT expresion %prec UNOT			{ $$ = new Logica(OperadorLogico.NOT, $2, null, @1.first_line, @1.first_column); }
	| ENTERO                        	{ $$ = new Primitivos(Tipo.INT, $1, @1.first_line, @1.first_column); }
	| DECIMAL                       	{ $$ = new Primitivos(Tipo.DOUBLE, $1, @1.first_line, @1.first_column); }
	| CADENA 							{ $$ = new Primitivos(Tipo.STRING, $1, @1.first_line, @1.first_column); }
	| CARACTER							{ $$ = new Primitivos(Tipo.CHAR, $1, @1.first_line, @1.first_column); }
	| RTRUE								{ $$ = new Primitivos(Tipo.BOOL, true, @1.first_line, @1.first_column); }
	| RFALSE							{ $$ = new Primitivos(Tipo.BOOL, false, @1.first_line, @1.first_column); }
	| ID								{ $$ = new Identificador($1, @1.first_line, @1.first_column); }
	| PARIZQ expresion PARDER       	{ $$ = $2; }

	| llamada						{ $$ = $1; }
;
if
	: RIF PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER { $$ = new If($3, $6, null, null, @1.first_line, @1.first_column) }
	| RIF PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER RELSE LLAVEIZQ instrucciones LLAVEDER { $$ = new If($3, $6, $10, null, @1.first_line, @1.first_column) }
	| RIF PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER RELSE if { $$ = new If($3, $6, null, $9, @1.first_line, @1.first_column) }	
;

llamada
	: ID PARIZQ parametrosLlamada PARDER 	{  }
	| ID PARIZQ PARDER						{  }
;

parametrosLlamada
	: parametrosLlamada COMA parametroLlamada 	{ $1.push($3); $$ = $1; }
	| parametroLlamada 							{ $$ = [$1]; }
;

parametroLlamada
	: expresion { $$ = $1 }
;

imprimir
	: RPRINT PARIZQ expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column); }
;