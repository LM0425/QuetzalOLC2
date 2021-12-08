/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

";"                 return 'RPTCOMA';
","					return 'RCOMA';
"("                 return 'RPARIZQ';
")"                 return 'RPARDER';
"["                 return 'RCORIZQ';
"]"                 return 'RCORDER';
"{"					return 'RLLAVEIZQ';
"}"					return 'RLLAVEDER';
":"					return	'RDOSPUNTOS'

"+"                 return 'RMAS';
"-"                 return 'RMENOS';
"*"                 return 'RPOR';
"/"                 return 'RDIVIDIDO';

'struct'            return 'RSTRUCT';
'int'               return 'RINT';
'double'            return 'RDOUBLE';
'float'				return 'RFLOAT';
'String'            return 'RSTRING';
'char'				return 'RCHAR'
'boolean'			return 'RBOOLEAN';
'null'				return 'RNULL';
'=='                return 'RIGUALIGUAL';
'!='                return 'RDIFERENTE';
'!'                 return 'RNOT';
'>='                return 'RMAYORIGUAL';
'<='                return 'RMENORIGUAL';
'<'                 return 'RMENOR';
'>'                 return 'RMAYOR';
'&&'                return 'RAND';
'||'                return 'ROR';
'sin'               return 'RSIN';
'log10'             return 'RLOG10';
'cos'               return 'RCOS';
'tan'               return 'RTAN';
'sqrt'              return 'RSQRT';
'='                 return 'RIGUAL';
'\.'                return 'RPUNTO';
'for'               return 'RFOR';
'switch'            return 'RSWITCH';
'breack'            return 'RBREACK';
'case'              return 'RCASE';
'default'           return 'RDEFAULT';
'while'             return 'RWHILE';
'do'                return  'RDO';
'if'                return 'RIF';
'else'              return  'RELSE';
'in'                return  'RIN';
'println'             return 'RPRINTLN';
'print'             return 'RPRINT';

//comentarios

[//.*]             {}
[/\*(.|\n)*?\*/]    {}

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

%left 'MAS' 'MENOS' 'RMENOR' 'RMAYOR'
%left 'POR' 'DIVIDIDO' 'RIGUALIGUAL' 'RMAYORIGUAL' 'RMENORIGUAL' 'RDIFERENTE'
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
	: variables RPTCOMA
	| if_instruccion
	| while_instruccion
	| switch_instruccion
	| funcion_instruccion
	| llamar_funcion RPTCOMA
	| imprimir RPTCOMA

;

imprimir
	: RPRINTLN RPARIZQ l_expresiones RPARDER
	| RPRINT RPARIZQ l_expresiones RPARDER
;

l_expresiones
	: l_expresiones RCOMA expresion
	| expresion
;

llamar_funcion
	: ID RPARIZQ RPARDER
	| ID RPARIZQ listaid RPARDER 
;

funcion_instruccion
	: tipo ID RPARIZQ parametros RPARDER RLLAVEIZQ RLLAVEDER
	| tipo ID RPARIZQ RPARDER RLLAVEIZQ RLLAVEDER
;

parametros
	: parametros RCOMA parametro
	| parametro
;

parametro
	: tipo ID
;

switch_instruccion
	: RSWITCH RPARIZQ expresion RPARDER RLLAVEIZQ l_case RDEFAULT RDOSPUNTOS instrucciones RLLAVEDER
;

l_case
	: l_case case
	| case
;

case
	: RCASE expresion RDOSPUNTOS instrucciones
	| RCASE expresion RDOSPUNTOS instrucciones RBREACK RPTCOMA
;

while_instruccion
	: RWHILE RPARIZQ condicion RPARDER RLLAVEIZQ instrucciones RLLAVEDER
	| RDO RLLAVEIZQ instrucciones RLLAVEDER RWHILE RPARIZQ condicion RPARDER RPTCOMA
;

if_instruccion
	: RIF RPARIZQ condicion RPARDER RLLAVEIZQ instrucciones RLLAVEDER RELSE if_instruccion {}
	| RIF RPARIZQ condicion RPARDER RLLAVEIZQ instrucciones RLLAVEDER RELSE RLLAVEIZQ instrucciones RLLAVEDER	{}
	| RIF RPARIZQ condicion RPARDER RLLAVEIZQ instrucciones RLLAVEDER	{} 
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

condicion
	: expresion RMAYORIGUAL expresion	{}
	| expresion RMENORIGUAL expresion		{}
	| expresion RIGUALIGUAL expresion	{}
	| expresion RDIFERENTE expresion {}
	| expresion RMAYOR expresion	{}
	| expresion RMENOR expresion	{}
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
	| ID							{ $$ = $1; }
	| llamar_funcion
;
