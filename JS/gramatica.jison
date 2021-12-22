/**
 *Proyecto 1 - Quetzal OLC2 
  - 201403975 - Joel Obdulio Xicará Ríos
  - 201503612 - Luis Fernando Morales García
 **/

/* Definición Léxica */
%{
	errores = []
%}

%lex

escapeChar              [\'\"\\bfnrtv]
escape                  \\{escapeChar}
acceptedCharDouble      [^\"\\]+
stringDouble            {escape}|{acceptedCharDouble}
stringLiteral           \"{stringDouble}\"

acceptedCharSingle      [^\'\\]
stringSingle            {escape}|{acceptedCharDouble}
charLiteral             \'{stringDouble}\'

BSL                                 "\\".
%s                                  comment

%%

"//".*                              /* skip comments */
"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

";"                 return 'PTCOMA';
","					return 'COMA';
"."					return 'PUNTO';
":"					return 'DOSPT';
"?"					return 'TERNARIO';
"#"					return 'NUMERAL';
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
'begin'				return 'RBEGIN';
'end'				return 'REND';
'default'			return 'RDEFAULT';
'break'				return 'RBREAK';
'while'				return 'RWHILE';
'do'				return 'RDO';
'struct'			return 'RSTRUCT';
'for'				return	'RFOR';
'in'				return 'RIN';
'continue'			return 'RCONTINUE';
'return'			return 'RRETURN';

'pow'				return 'RPOW';
'sqrt'				return 'RRAIZ';
'sin'				return 'RSIN';
'cos'				return 'RCOS';
'tan'				return 'RTAN';
'log10'				return 'RLOG';

'caracterOfPosition'	return 'RCARACTEROFPOSITION';
'subString'				return 'RSUBSTRING';
'toUppercase'			return 'RTOUPPERCASE';
'toLowercase'			return 'RTOLOWERCASE';

'parse'				return 'RPARSE';
'toInt'				return 'RTOINT';
'toDouble'			return 'RTODOUBLE';
'string'			return 'RSSTRING';
'typeof'			return 'RTYPEOF';

'push'				return 'RPUSH';
'pop'				return 'RPOP';
'length'			return 'RLENGTH';

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

/* comentarios */
[//.*[^\n]]        	{}
[/\*(.|\n)*?\*/]    {}

[0-9]+\.[0-9]+\b    return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
[a-zA-Z][a-zA-Z_0-9]*   return 'ID';
// [\"[^\']*?\"]    		return  'CADENA';
// [\'[^\'\\]\'] 			return 'CARACTER';
[\"]((\\\")|(\\\')|(\\\n)|[^\"])*[\"]         {
                            yytext = yytext.substr(1, yyleng - 2)
                            return 'CADENA'
                        }
[\']((\\\n)|(\\\")|(\\\')|[^\'])[\']            {
                            yytext = yytext.substr(1, yyleng - 2)
                            return 'CARACTER'
                        }

<<EOF>>                 return 'EOF';

.                       { 
							errores.push(new Excepcion("Lexico", "Error lexico - " + yytext, yylloc.first_line, yylloc.first_column))
							//console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
						}
/lex

/* Imports */

%{
	const { Excepcion } = require("./AST/Excepcion");
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
	const { Switch } = require("./Instrucciones/Switch");
	const { Case } = require("./Instrucciones/Case");
	const { Default } = require("./Instrucciones/Default");
	const { Break } = require("./Instrucciones/Break");
	const { While } = require("./Instrucciones/while");
	const { DoW } = require("./Instrucciones/DoW");
	const { inc_dec } = require("./Instrucciones/inc_dec");
	const { Struct } = require("./Instrucciones/struct");
	const { For } = require("./Instrucciones/For");
	const { ForIn } = require("./Instrucciones/ForIn");
	const { Llamada_struct } = require("./Instrucciones/llamada_struct");
	const { Declaracion_atributo } = require("./Instrucciones/Declaracion_atributo");
	const { Asignacion_atributo } = require("./Instrucciones/Asignacion_atributo");
	const { Continue } = require("./Instrucciones/Continue");
	const { Return } = require("./Instrucciones/Return");
	const { ModificarArreglo } = require("./Instrucciones/ModificarArreglo");
	const { AccesoArreglo } = require("./Expresiones/AccesoArreglo");
	const { Main } = require("./Instrucciones/Main");
	const { Funcion } = require("./Instrucciones/Funcion");
	const { Llamada } = require("./Instrucciones/Llamada");
	const { Caracter } = require("./Nativas/Caracter");
	const { Length } = require("./Nativas/Length");
	const { Parse } = require("./Nativas/Parse");
	const { SubString } = require("./Nativas/SubString");
	const { ToLowerCase } = require("./Nativas/ToLowerCase");
	const { ToUpperCase } = require("./Nativas/ToUpperCase");
	const { Pow } = require("./Nativas/Pow");
	const { Raiz } = require("./Nativas/Raiz");
	const { Seno } = require("./Nativas/Seno");
	const { Coseno } = require("./Nativas/Coseno");
	const { Tangente } = require("./Nativas/Tangente");
	const { Log } = require("./Nativas/Log");
	const { ToInt } = require("./Nativas/ToInt");
	const { ToDouble } = require("./Nativas/ToDouble");
	const { SString } = require("./Nativas/SString");
	const { TypeOf } = require("./Nativas/TypeOf");
	const { Push } = require("./Nativas/Push");
	const { Pop } = require("./Nativas/Pop");
	
%}

/* Asociación de operadores y precedencia */
%left 'OR'
%left 'AND'
%left 'UNOT'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENOR' 'MAYOR' 'MENORIGUAL' 'MAYORIGUAL'
%left 'MAS' 'MENOS' 'CONCATENAR' 'REPETICION'
%left 'POR' 'DIVIDIDO' 'MODULO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF { $$ = {'instrucciones':$1, 'errores':errores.slice()}; return $$;}
;

instrucciones
	: instrucciones instruccion	{ $1.push($2); $$ = $1;}
	| instruccion  				{ $$ = [$1]; }
	| error 					{
									errores.push(new Excepcion("Sintactico", "Error sintactico - " + yytext, yylloc.first_line, yylloc.first_column)) 
									//console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
								}
;

instruccion
	: variables PTCOMA		{ $$ = $1; }
	| imprimir PTCOMA 		{ $$ = $1; }
	| if 					{ $$ = $1; }
	| switch				{ $$ = $1; }
	| break PTCOMA			{ $$ = $1; }
	| incr_decr	PTCOMA		{ $$ = $1; }
	| while_instruccion 	{ $$ = $1; }
	| do_instruccion PTCOMA	{ $$ = $1; }
	| struct_crear PTCOMA 	{ $$ = $1; }
	| for					{ $$ = $1; }
	| llamada_struct PTCOMA	{ $$ = $1; }
	| continue PTCOMA		{ $$ = $1; }
	| return PTCOMA			{ $$ = $1; }
	| modificarArreglo		{ $$ = $1; }
	| main					{ $$ = $1; }
	| funcion				{ $$ = $1; }
	| llamada ptc	 		{ $$ = $1; }
	| pop ptc				{ $$ = $1; }
	| push ptc				{ $$ = $1; }
;

ptc
	: PTCOMA
	|
;

variables
	: tipo ID IGUAL expresion 					{ $$ = new Declaracion($1, [$2], @1.first_line, @1.first_column, $4, false, false, false); }
	| tipo listaid 								{ $$ = new Declaracion($1, $2, @1.first_line, @1.first_column, null, false, false, false); }
	| ID IGUAL expresion 						{ $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
	| ID IGUAL CORIZQ CORDER					{	let temp = new Primitivos(Tipo.ARRAY, [], @1.first_line, @1.first_column);
													$$ = new Asignacion($1, temp, @1.first_line, @1.first_column);
												}
	| tipo CORIZQ CORDER ID IGUAL ID			{ $$ = new Declaracion($1, [$4], @1.first_line, @1.first_column, $6, true, true, false); }
	| tipo CORIZQ CORDER ID IGUAL NUMERAL ID	{ $$ = new Declaracion($1, [$4], @1.first_line, @1.first_column, $7, true, false, true); }
	| tipo CORIZQ CORDER ID IGUAL expresion		{ $$ = new Declaracion($1, [$4], @1.first_line, @1.first_column, $6, true, false, false); }
	
	| expresion PUNTO expresion IGUAL expresion	{ $$ = new Asignacion_atributo($1, $3, $5, @1.first_line, @1.first_column); }
;

listaid
	: listaid COMA ID	{$$ = $1; $$.push($3); }
	| ID 				{ $$ = new Array(); $$.push($1); }
;

tipo
	: RINT 		{ $$ = Tipo.INT; }
	| RDOUBLE 	{ $$ = Tipo.DOUBLE; }
	| RSTRING	{ $$ = Tipo.STRING; }
	| RCHAR		{ $$ = Tipo.CHAR; }
	| RBOOLEAN	{ $$ = Tipo.BOOL; }
	| RVOID		{ $$ = Tipo.VOID; }
;

expresion
	: MENOS expresion %prec UMENOS  	{ $$ = new Aritmetica(OperadorAritmetico.UMENOS, $2, null, @1.first_line, @1.first_column); }
	| expresion MAS expresion       	{ $$ = new Aritmetica(OperadorAritmetico.MAS, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOS expresion     	{ $$ = new Aritmetica(OperadorAritmetico.MENOS, $1, $3, @1.first_line, @1.first_column); }
	| expresion POR expresion       	{ $$ = new Aritmetica(OperadorAritmetico.POR, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIVIDIDO expresion  	{ $$ = new Aritmetica(OperadorAritmetico.DIV, $1, $3, @1.first_line, @1.first_column); }
	| expresion MODULO expresion  		{ $$ = new Aritmetica(OperadorAritmetico.MOD, $1, $3, @1.first_line, @1.first_column); }
	| expresion CONCATENAR expresion	{ $$ = new Aritmetica(OperadorAritmetico.CONCATENAR, $1, $3, @1.first_line, @1.first_column); }
	| expresion REPETICION expresion	{ $$ = new Aritmetica(OperadorAritmetico.REPETIR, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENOR expresion			{ $$ = new Relacional(OperadorRelacional.MENORQUE, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAYOR expresion			{ $$ = new Relacional(OperadorRelacional.MAYORQUE, $1, $3, @1.first_line, @1.first_column); }
	| expresion MENORIGUAL expresion	{ $$ = new Relacional(OperadorRelacional.MENORIGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion MAYORIGUAL expresion	{ $$ = new Relacional(OperadorRelacional.MAYORIGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion IGUALIGUAL expresion	{ $$ = new Relacional(OperadorRelacional.IGUALIGUAL, $1, $3, @1.first_line, @1.first_column); }
	| expresion DIFERENTE expresion		{ $$ = new Relacional(OperadorRelacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column); }
	| expresion AND expresion			{ $$ = new Logica(OperadorLogico.AND, $1, $3, @1.first_line, @1.first_column); }
	| expresion OR expresion			{ $$ = new Logica(OperadorLogico.OR, $1, $3, @1.first_line, @1.first_column); }
	| NOT expresion %prec UNOT			{ $$ = new Logica(OperadorLogico.NOT, $2, null, @1.first_line, @1.first_column); }
	| ENTERO                        	{ $$ = new Primitivos(Tipo.INT, Number($1), @1.first_line, @1.first_column); }
	| DECIMAL                       	{ $$ = new Primitivos(Tipo.DOUBLE, Number($1), @1.first_line, @1.first_column); }
	| CADENA 							{ $$ = new Primitivos(Tipo.STRING, String($1), @1.first_line, @1.first_column); }
	| CARACTER							{ $$ = new Primitivos(Tipo.CHAR, String($1), @1.first_line, @1.first_column); }
	| RTRUE								{ $$ = new Primitivos(Tipo.BOOL, true, @1.first_line, @1.first_column); }
	| RNULL								{ $$ = new Primitivos(Tipo.NULL, null, @1.first_line, @1.first_column); }
	| RFALSE							{ $$ = new Primitivos(Tipo.BOOL, false, @1.first_line, @1.first_column); }
	| ID								{ $$ = new Identificador(String($1), @1.first_line, @1.first_column); }
	| PARIZQ expresion PARDER       	{ $$ = $2; }

	| declaracionArregloT1						{ $$ = new Primitivos(Tipo.ARRAY, $1, @1.first_line, @1.first_column); }
	| ID listaExpresiones						{ $$ = new AccesoArreglo($1, $2, null, null, @1.first_line, @1.first_column); }
	| ID CORIZQ posicion DOSPT posicion CORDER	{ $$ = new AccesoArreglo($1, null, $3, $5, @1.first_line, @1.first_column); }

	| llamada							{ $$ = $1; }
	| incr_decr							{ $$ = $1; }

	| RPOW PARIZQ expresion COMA expresion PARDER	{ $$ = new Pow($3, $5, @1.first_line, @1.first_column); }
	| RRAIZ PARIZQ expresion PARDER					{ $$ = new Raiz($3, @1.first_line, @1.first_column); }
	| RSIN PARIZQ expresion PARDER					{ $$ = new Seno($3, @1.first_line, @1.first_column); }
	| RCOS PARIZQ expresion PARDER					{ $$ = new Coseno($3, @1.first_line, @1.first_column); }
	| RTAN PARIZQ expresion PARDER					{ $$ = new Tangente($3, @1.first_line, @1.first_column); }
	| RLOG PARIZQ expresion PARDER					{ $$ = new Log($3, @1.first_line, @1.first_column); }
	

	| expresion PUNTO RCARACTEROFPOSITION PARIZQ expresion PARDER		{ $$ = new Caracter($1, $5, @1.first_line, @1.first_column); }
	| expresion PUNTO RSUBSTRING PARIZQ expresion COMA expresion PARDER	{ $$ = new SubString($1, $5, $7, @1.first_line, @1.first_column); }
	| expresion PUNTO RTOUPPERCASE PARIZQ PARDER						{ $$ = new ToUpperCase($1, @1.first_line, @1.first_column); }
	| expresion PUNTO RTOLOWERCASE PARIZQ PARDER						{ $$ = new ToLowerCase($1, @1.first_line, @1.first_column); }

	| tipo PUNTO RPARSE PARIZQ expresion PARDER	{ $$ = new Parse($1, $5, @1.first_line, @1.first_column); }
	| RTOINT PARIZQ expresion PARDER			{ $$ = new ToInt($3, @1.first_line, @1.first_column); }
	| RDOUBLE PARIZQ expresion PARDER			{ $$ = new ToDouble($3, @1.first_line, @1.first_column); }
	| RSSTRING PARIZQ expresion PARDER			{ $$ = new SString($3, @1.first_line, @1.first_column); }
	| RTYPEOF PARIZQ expresion PARDER			{ $$ = new TypeOf($3, @1.first_line, @1.first_column); }

	| pop									{ $$ = $1; }
	| expresion PUNTO RLENGTH PARIZQ PARDER	{ $$ = new Length($1, @1.first_line, @1.first_column); }
;

posicion
	: expresion { $$ = $1; }
	| RBEGIN    { $$ = true; }
	| REND		{ $$ = true; }
;

declaracionArregloT1
	: CORIZQ listaValores CORDER { $$ = $2; }
;

listaValores
	: listaValores COMA valores { $1.push($3); $$ = $1 }
	| valores 					{ $$ = [$1]; }
;

valores
	: declaracionArregloT1	{ $$ = $1; }
	| expresion 			{ $$ = $1; }
;

modificarArreglo
	: ID listaExpresiones IGUAL expresion PTCOMA { $$ = new ModificarArreglo($1, $2, $4, @1.first_line, @1.first_column); }
;

pop
	: expresion PUNTO RPOP PARIZQ PARDER { $$ = new Pop($1, @1.first_line, @1.first_column); } 
;

push
	: expresion PUNTO RPUSH PARIZQ expresion PARDER { $$ = new Push($1, $5, @1.first_line, @1.first_column); } 
;

listaExpresiones
	: listaExpresiones CORIZQ expresion CORDER	{ $1.push($3); $$ = $1; }
	| CORIZQ expresion CORDER 					{ $$ = [$2] }
;

if
	: RIF PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER 										{ $$ = new If($3, $6, null, null, @1.first_line, @1.first_column); }
	| RIF PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER RELSE LLAVEIZQ instrucciones LLAVEDER	{ $$ = new If($3, $6, $10, null, @1.first_line, @1.first_column); }
	| RIF PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER RELSE if 								{ $$ = new If($3, $6, null, $9, @1.first_line, @1.first_column); }
	| RIF PARIZQ expresion PARDER instruccion															{ $$ = new If($3, [$5], null, null, @1.first_line, @1.first_column); }
;

switch
	: RSWITCH PARIZQ expresion PARDER LLAVEIZQ caselist default LLAVEDER { $$ = new Switch($3, $6, $7, @1.first_line, @1.first_column); }
;

caselist
	: caselist case	{ $1.push($2); $$ = $1; }
	| case			{ $$ = [$1]; }
;

case
	: RCASE expresion DOSPT instrucciones { $$ = new Case($2, $4, @1.first_line, @1.first_column); }
;

default
	: RDEFAULT DOSPT instrucciones { $$ = new Default($3, @1.first_line, @1.first_column); }
;

break
	: RBREAK { $$ = new Break(@1.first_line, @1.first_column); }
;

continue
	: RCONTINUE { $$ = new Continue(@1.first_line, @1.first_column); }
;

return
	: RRETURN expresion { $$ = new Return($2, @1.first_line, @1.first_column); }
	| RRETURN			{ $$ = new Return(null, @1.first_line, @1.first_column); }
;

funcion
	: tipo ID PARIZQ parametros PARDER LLAVEIZQ instrucciones LLAVEDER	{ $$ = new Funcion($1, $2, $4, $7, @1.first_line, @1.first_column); }
	| ID ID PARIZQ parametros PARDER LLAVEIZQ instrucciones LLAVEDER	{ $$ = new Funcion(Tipo.STRUCT, $2, $4, $7, @1.first_line, @1.first_column); }
	| tipo ID PARIZQ PARDER LLAVEIZQ instrucciones LLAVEDER				{ $$ = new Funcion($1, $2, [], $6, @1.first_line, @1.first_column); }
;

parametros
	: parametros COMA parametro	{ $1.push($3); $$ = $1; }
	| parametro					{ $$ = [$1]; }
;

parametro
	: tipo CORIZQ CORDER ID { $$ = {'tipo': $1, 'identificador': $4, 'arreglo':true}; }
	| tipo ID				{ $$ = {'tipo': $1, 'identificador': $2, 'arreglo':false}; }
;

llamada
	: ID PARIZQ parametrosLlamada PARDER 	{ $$ = new Llamada($1, $3, @1.first_line, @1.first_column); }
	| ID PARIZQ PARDER						{ $$ = new Llamada($1, [], @1.first_line, @1.first_column); }
;

parametrosLlamada
	: parametrosLlamada COMA expresion 	{ $1.push($3); $$ = $1; }
	| expresion 						{ $$ = [$1]; }
;

main
	: RVOID RMAIN PARIZQ PARDER LLAVEIZQ instrucciones LLAVEDER { $$ = new Main($6, @1.first_line, @1.first_column); }
;

imprimir
	: RPRINT PARIZQ listaImprimir PARDER 	{ $$ = new Imprimir(false, $3, @1.first_line, @1.first_column); }
	| RPRINTLN PARIZQ listaImprimir PARDER	{ $$ = new Imprimir(true, $3, @1.first_line, @1.first_column); }
// 	| RPRINT PARIZQ expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column,null,false); }
// 	| RPRINT PARIZQ expresion PUNTO expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column,$5,false); }
// 	| RPRINTLN PARIZQ expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column,null,true); }
// 	| RPRINTLN PARIZQ expresion PUNTO expresion PARDER { $$ = new Imprimir($3, @1.first_line, @1.first_column,$5,true); }
;

listaImprimir
	: listaImprimir COMA expresion accesoStruct	{ $1.push({'expresion':$3, 'acceso': $4['acceso']}); $$ = $1; }
	| expresion accesoStruct					{ $$ = [{'expresion':$1, 'acceso': $2['acceso']}]; }
	|											{ $$ = []; }
;

accesoStruct
	: PUNTO expresion	{ $$ = {'acceso': $2}; }
	|					{ $$ = {'acceso': null}; }
;

incr_decr
	: expresion MAS MAS		{$$ = new inc_dec(OperadorAritmetico.MAS,$1,@1.first_line, @1.first_column);}	
	| expresion MENOS MENOS	{$$ = new inc_dec(OperadorAritmetico.MENOS,$1,@1.first_line, @1.first_column);}
;

while_instruccion
	: RWHILE PARIZQ expresion PARDER LLAVEIZQ instrucciones LLAVEDER { $$ = new While($3,$6, @1.first_line, @1.first_column);}
;

do_instruccion
	: RDO LLAVEIZQ instrucciones LLAVEDER RWHILE PARIZQ expresion PARDER { $$ = new DoW($7,$3, @1.first_line, @1.first_column);}
;

struct_crear
	: RSTRUCT ID LLAVEIZQ l_atributos LLAVEDER { $$ = new Struct(Tipo.STRUCT, $2, @1.first_line, @1.first_column, [$4]); }
;

l_atributos
	: l_atributos COMA atributo	{ $1.push($3); $$ = $1; }
	| atributo 					{ $$ = [$1]; }
;

atributo
	: tipo ID { $$ = new Declaracion_atributo($1, $2, @1.first_line, @1.first_column, null); }
	| ID ID	{ $$ = new Declaracion_atributo(Tipo.STRUCT, $2, @1.first_line, @1.first_column, null); }
	//| falta llamada de struct 
	//| falta llamada de arreglo
;

for
	: RFOR PARIZQ variables PTCOMA expresion PTCOMA expresion PARDER LLAVEIZQ instrucciones LLAVEDER	{ $$ = new For($3, $5, $7, $10, @1.first_line, @1.first_column); }
	| RFOR ID RIN expresion LLAVEIZQ instrucciones LLAVEDER 											{ $$ = new ForIn($2, $4, $6, @1.first_line, @1.first_column); }
;

l_expresiones
	: l_expresiones COMA expresion	{ $1.push($3); $$ = $1; }
	| expresion						{ $$ = [$1]; }
;

llamada_struct
	: ID ID IGUAL ID PARIZQ l_expresiones PARDER { $$ = new Llamada_struct($1,$2,$4,[$6], @1.first_line, @1.first_column); }
;