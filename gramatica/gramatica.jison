/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%


";"                 return 'RPTCOMA';
"("                 return 'RPARIZQ';
")"                 return 'RPARDER';
"["                 return 'RCORIZQ';
"]"                 return 'RCORDER';

"+"                 return 'RMAS';
"-"                 return 'RMENOS';
"*"                 return 'RPOR';
"/"                 return 'RDIVIDIDO';

'struct'            return 'RSTRUCT';
'int'               return 'RINT';
'double'            return 'RDOUBLE';
'=='                return 'RIGUALIGUAL';
'string'            return 'RSTRING';
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
[[a-zA-Z][a-zA-Z_0-9]*]     return 'ID';         
[\"(\\\'|\\"|[^\'])*?\"]    return  'CADENA';
[\'(\\\'|\\"|\\t|\\n|\\\\|[^\'\\])\'] return 'CARACTER';


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
	: REVALUAR CORIZQ expresion CORDER PTCOMA {
		console.log('El valor de la expresión es: ' + $3);
	}
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
;
