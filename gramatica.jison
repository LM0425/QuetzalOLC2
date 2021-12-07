/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

"Evaluar"           return 'REVALUAR';
'int'               return 'RINT';
'double'            return 'RDOUBLE';
'float'				return 'RFLOAT';
'String'            return 'RSTRING';
'char'				return 'RCHAR'
'boolean'			return 'RBOOLEAN';
";"                 return 'PTCOMA';
","					return 'RCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';
"="					return 'RIGUAL';

"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+("."[0-9]+)?\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
[a-zA-Z][a-zA-Z_0-9]*   return 'ID';
[\"[^\']*?\"]    		return  'CADENA';
[\'[^\'\\]\'] return 'CARACTER';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF
;

instrucciones
	: instruccion instrucciones
	| instruccion
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instruccion
	: variables PTCOMA
;

variables
	: tipo ID RIGUAL expresion { console.log("Variable declarada de tipo " + $1 + " con nombre " + $2 + "y valor " + $4);}
	| tipo listaid { console.log("lista de variables de tipo " + $1 + " con variables " + $2);}
	| ID RIGUAL expresion { console.log("asignacion a variable " + $1 + " de neuvo valor " + $3);}
;

listaid
	: listaid RCOMA ID {$$ = $1; $$.push($3); }
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
	: MENOS expresion %prec UMENOS  { $$ = $2 *-1; }
	| expresion MAS expresion       { $$ = $1 + $3; }
	| expresion MENOS expresion     { $$ = $1 - $3; }
	| expresion POR expresion       { $$ = $1 * $3; }
	| expresion DIVIDIDO expresion  { $$ = $1 / $3; }
	| ENTERO                        { $$ = Number($1); }
	| DECIMAL                       { $$ = Number($1); }
	| PARIZQ expresion PARDER       { $$ = $2; }
	| CADENA 						{ $$ = $1;}
;
