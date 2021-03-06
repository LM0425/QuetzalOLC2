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
'switch'			return 'RSWITCH';
'case'				return 'RCASE';
'break'				return 'RBREAK';
'default'			return 'RDEFAULT';
'while'				return 'RWHILE';
'do'				return 'RDO'


'return'			return 'RRETURN';

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
	const { Primitivos } = require("./Expresiones/Primitivos");
	const { Aritmetica } = require("./Expresiones/Aritmetica");
	const { Imprimir } = require("./Instrucciones/Imprimir");
	const { Tipo, OperadorAritmetico } = require("./AST/Tipo");
%}
/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS' 'AND' 'OR' 'NOT'
%left 'POR' 'DIVIDIDO' 'IGUALIGUAL' 'DIFERENTE' 'MAYORIGUAL' 'MENORIGUAL' 'MAYOR' 'MENOR'
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
	| llamada PTCOMA
	| funciones
	| if_instruccion
	| switch_instruccion
	| while_instruccion
	| do_instruccion PTCOMA
	| incre_decre PTCOMA
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
	| expresion MAS expresion       { $$ = new Aritmetica(OperadorAritmetico.MAS, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOS expresion     { $$ = new Aritmetica(OperadorAritmetico.MENOS, $1, $3, @1.first_line, @1.first_column); }
	| expresion POR expresion       { $$ = new Aritmetica(OperadorAritmetico.POR, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIVIDIDO expresion  { $$ = new Aritmetica(OperadorAritmetico.DIV, $1, $3, @1.first_line, @1.first_column); }
	| ENTERO                        { $$ = new Primitivos(Tipo.INT, $1, @1.first_line, @1.first_column); }
	| DECIMAL                       { $$ = new Primitivos(Tipo.DOUBLE, $1, @1.first_line, @1.first_column); }
	| CADENA 						{ $$ = new Primitivos(Tipo.STRING, $1, @1.first_line, @1.first_column); }
	| CARACTER						{ $$ = new Primitivos(Tipo.CHAR, $1, @1.first_line, @1.first_column); }
	| RTRUE							{ $$ = new Primitivos(Tipo.BOOL, true, @1.first_line, @1.first_column); }
	| RFALSE						{ $$ = new Primitivos(Tipo.BOOL, false, @1.first_line, @1.first_column); }
	| PARIZQ expresion PARDER       { $$ = $2; }
	| ID
;

llamada
	: ID PARIZQ listaid PARDER
	| ID PARIZQ PARDER
;

imprimir
	: RPRINT PARIZQ expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column); }
	| RPRINTLN PARIZQ expresion PARDER
;

funciones
	: tipo ID PARIZQ l_parametros PARDER LLAVEIZQ instrucciones LLAVEDER
	| tipo ID PARIZQ PARDER LLAVEIZQ instrucciones LLAVEDER
	| tipo ID PARIZQ l_parametros PARDER LLAVEIZQ instrucciones return LLAVEDER
	| tipo ID PARIZQ PARDER LLAVEIZQ instrucciones return LLAVEDER
;

l_parametros
	: l_parametros COMA parametro
	| parametro
;

parametro
	: tipo ID
	| ID
;

return	
	: RRETURN expresion PTCOMA
;

if_instruccion
	: RIF PARIZQ l_condicion PARDER LLAVEIZQ instrucciones LLAVEDER
	| RIF PARIZQ l_condicion PARDER LLAVEIZQ instrucciones LLAVEDER RELSE LLAVEIZQ instrucciones LLAVEDER
	| RIF PARIZQ l_condicion PARDER LLAVEIZQ instrucciones LLAVEDER RELSE if_instruccion
;

l_condicion
	: l_condicion AND condicion
	| l_condicion OR condicion
	| l_condicion NOT condicion
	| condicion
;

condicion
	: expresion IGUALIGUAL expresion
	| expresion DIFERENTE expresion
	| expresion MAYORIGUAL expresion
	| expresion MENORIGUAL expresion
	| expresion MAYOR expresion
	| expresion MENOR expresion
;

switch_instruccion
	: RSWITCH PARIZQ expresion PARDER LLAVEIZQ l_casos RDEFAULT DOSPT instrucciones LLAVEDER
;

l_casos
	: l_casos caso
	| caso
;

caso
	: RCASE expresion DOSPT instrucciones
	| RCASE expresion DOSPT instrucciones RBREAK PTCOMA
;

while_instruccion
	: RWHILE PARIZQ condicion PARDER LLAVEIZQ instrucciones LLAVEDER
;

do_instruccion
	: RDO LLAVEIZQ instrucciones LLAVEDER RWHILE PARIZQ condicion PARDER
;

incre_decre
	: ID MAS MAS
	| ID MENOS MENOS
;