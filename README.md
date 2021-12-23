# QuetzalOLC2

# _MANUAL TECNICO_

## LENGUAJE DE PROGRAMACIÓN UTILIZADO

Para el desarrollo del programa se utilizo como base el lenguaje TypeScript para luego hacer un traspilado y obtener el código en JavaScript para que la herramienta de análisis funcione de forma correcta. 
El desarrollo inicial se debe ejecutar en las clases TS y una vez completado este proceso se debe correr los siguientes comandos para poder traspilar de TS a JS:

```sh
tsc
- npm run build
```

## DESARROLLO DE LA INTERFAZ

La interfaz grafica fue desarrollado con HTML y alcenada en un repositorio de Github para poder hacer uso de Github Pages y contar con un dominio de Github Page para presentar el programa de Quetzal.

## HERRAMIENTA PARA EL ANÁLISIS 

En esta ocasión se utilizo la herramienta de Bison para lo cual es necesario tener instalado:
- npm en su versión 6.9.0 
- •	NodeJs en su versión V8.10.0 para poder proceder con su instalación y correcto funcionamiento

Para la instalación de Jison es necesario ejecutar el comando npm install jison -g para que quede de forma global.

## PATRON INTERPRETE

Para el desarrollo de la lógica dell funcionamiento del programa Quetzal se utilizo el patron interprete por medio del cual creamos una clase abstracta llamada instrucción de la cual se va a heredar dos métodos, un método para interpretas y otro para traducir, estos métodos estarán presentes en todas clases en las que implementos la instrucción. Esta clase maneja 4 atributos:

- Fila
- Columna
- Árbol
- Entorno

[![Image from Gyazo](https://i.gyazo.com/b7c4e4c19a14c8d6c28570bb02f89969.png)](https://gyazo.com/b7c4e4c19a14c8d6c28570bb02f89969)


## Gramatica

Utilizando la herramienta de jison se debe crear una clase .jison en donde se escribirán todas las reglas y producciones que contendrá nuestro lenguaje, este archivo se encuenta en la carpeta raíz de la carpeta en la se encuentra el código JS.
Para realizar el análisis de algún archivo es necesario instanciar la clase AST dentro de el index.js para que el frontend pueda mandarle el texto de entrada al parser y para esto se hace uso de la funcion parse que provee jison y se declara un entorno global que se el primero.

[![Image from Gyazo](https://i.gyazo.com/11903ca18d2ad0ff4f8a99831ad8a217.png)](https://gyazo.com/11903ca18d2ad0ff4f8a99831ad8a217)

## Clases Principales

**Clase AST**

Esta clase cuenta con diversos métodos necesarios para poder realizar el interprete y la traducción de forma correcta ya que cuenta con un objeto de instrucciones que hereda de la clase de Instrucción asi como objetos de tipo Funion y Strucs para algunas instrucciones y para menejar cada uno de los ambietes se crea un objeto de tipo Entorno, Adicional se cuenta con variables auxiliares para el proceso de traducción tales como apuntadores y objetos para el Heap y el Stack.

https://gyazo.com/4214d66f903332672ff0c91c87bdc848


**Clase Entorno**

Esta clase cuenta con dos atributos los cuales son la tabla en la que se almacenan todas las variables que pertenezcan a ese entorno y por ultimo un atributo de tipo Entorno que hace referencia a la tabla que le precede.

[![Image from Gyazo](https://i.gyazo.com/34b8f076c84347b06de4d8839c206cbf.png)](https://gyazo.com/34b8f076c84347b06de4d8839c206cbf)

**Clase Excepcion**
Si existe algún error durante el análisis es posible almacenar estos en errores gracias a una clase llamada excepción la cual nos permite guardar el tipo de error, agregar una descripción mas exacta del error asi como almacenar en fila y columna se dio el error.

[![Image from Gyazo](https://i.gyazo.com/8660ad48439c3ba137e067257a326bf6.png)](https://gyazo.com/8660ad48439c3ba137e067257a326bf6)

**CLASE SÍMBOLO**

Esta clase se utiliza para crear símbolos los cuales serán utilizados durante el análisis del interprete ya que al declarar alguna variable o funcion se puede almacenar su información especifica como el nombre del objeto, el tipo y su valor, adicional también detalles como la fila y columna  y una bandera que indica si es arreglo y su tipo de arreglo.

[![Image from Gyazo](https://i.gyazo.com/f6d2947dbc6e1c43add6f2e792c4191a.png)](https://gyazo.com/f6d2947dbc6e1c43add6f2e792c4191a)

**CLASE TIPO**

Esta clase contiene listas de los diferentes tipos y operadores que el software será capaz de reconocer y serán de ayuda para las diferentes expresiones posibles.

[![Image from Gyazo](https://i.gyazo.com/3f0871529420097ed77dce07a005706a.png)](https://gyazo.com/3f0871529420097ed77dce07a005706a)

[![Image from Gyazo](https://i.gyazo.com/3aee8ffff49f699c7b4489c030a90dee.png)](https://gyazo.com/3aee8ffff49f699c7b4489c030a90dee)


**DIRECTORIOS**

La herramienta esta divide en tres directorios restantes los cuales contienes todo el desarrollo de las instrucciones posibles, el desarrollo de los operaciones aritméticas y lógicas posibles y por ultimo un directorio con funciones nativas del programa. 

[![Image from Gyazo](https://i.gyazo.com/88e97ea7529eaa74ed603deb2f9c4983.png)](https://gyazo.com/88e97ea7529eaa74ed603deb2f9c4983)

[![Image from Gyazo](https://i.gyazo.com/131ef2420d85ac1a38f2ae98655691f9.png)](https://gyazo.com/131ef2420d85ac1a38f2ae98655691f9)

[![Image from Gyazo](https://i.gyazo.com/7ccf05eacfa85f3dc56bd1785f97e635.png)](https://gyazo.com/7ccf05eacfa85f3dc56bd1785f97e635)



# _MANUAL DE USUARIO_

El programa esta desplegado en una pagina de [githubPage] y en la podemos observar que en la pantalla inicial cuenta con un a barra de navegacion y dos paneles de texto principales.

En el primer panel se ingreso el texto de entrada y de acuerdo a cual opción se decida (interpretar o traducir) esta será la salida que se observe en el segundo panel. EL panel de navegación cuenta con tres opciones

-	Traducir
-	Interpretar
-	Tabla Traductor

[![Image from Gyazo](https://i.gyazo.com/f178d8f5dfb3cad3bd922725c34bb7e3.png)](https://gyazo.com/f178d8f5dfb3cad3bd922725c34bb7e3)

## Interpretar

Para iniciar con el proceso de interpretar algun codigo es necesario colocar dicho codigo en el primer panel de texto y darle click al boton de Interpretar que se encuentra en la barra de navegacion y al ejecutar esta accion se obtendra el resultado en el segundo panel de texto.

[![Image from Gyazo](https://i.gyazo.com/eb954a1edb21f2afb494443e865f0615.png)](https://gyazo.com/eb954a1edb21f2afb494443e865f0615)


Una vez ejecutada esta accion es posible visualizar el diagrama del arbol AST con cada una de sus producciones y caminos que tomo de acuerdo a la gramatica.

[![Image from Gyazo](https://i.gyazo.com/328c98b911fb344f807e78d0540893cd.png)](https://gyazo.com/328c98b911fb344f807e78d0540893cd)


Si existe algun error gramtical durante el proceso de analisis se podra observar el reporte de errores en la parte baja de la pagina en la que se encuentra a detalle el error ocurrido asi como el tipo, descripcion y datos como fila y columna para poder ubicar el error con facilidad.

[![Image from Gyazo](https://i.gyazo.com/dc8ff6bfbf36f35527f8c226e00b94a7.png)](https://gyazo.com/dc8ff6bfbf36f35527f8c226e00b94a7)


## Traducir

De igual forma que el interprete es necesario ingresar el texto a analizar en primer panel y darle click al boton de Traducir para que se realice el analisis y aparezca en el siguiente panel en el cual obtendremos la traduccion a codigo de 3 direcciones en el lenguaje de C.


[![Image from Gyazo](https://i.gyazo.com/2f4df6a6d004a507255515872fa4380d.png)](https://gyazo.com/2f4df6a6d004a507255515872fa4380d)

Añ realizar el analisis es posible observar la tabla de simbolos en el que se detalla como se encuentra cada una de las instrucciones analisadas


[![Image from Gyazo](https://i.gyazo.com/76d2c835f8579df74e98734aa5e5acb7.png)](https://gyazo.com/76d2c835f8579df74e98734aa5e5acb7)



[githubPage]: <https://lm0425.github.io/QuetzalOLC2/>
