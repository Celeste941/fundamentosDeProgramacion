![alt](./assets/img/img-del-proyecto.png)
- [SuperHero API](#superhero-api)
  - [Descripción](#descripción)
  - [Funcionamiento](#funcionamiento)
  - [Uso](#uso)
  - [Notas adicionales](#notas-adicionales)

# SuperHero API

Desarrolladora : Ana Celeste Pérez
## Descripción
Este código es para buscar superhéroes que utiliza la API de Superhero para obtener información
sobre personajes de cómics. Permite a los usuarios ingresar un numero de un superhéroe y visualizar
 sus detalles, como nombre, conexiones, biografía y estadísticas de poder.

## Funcionamiento
1-Envío del formulario:
Cuando el usuario envía el formulario con el botón de búsqueda, el código se activa para procesar
 la solicitud.
 

2-[Validación de entrada:](./assets/js/index.js#L57)
Se verifica que el ID-número ingresado por el usuario sea un número entero positivo mayor que cero.
Si la entrada no cumple con esta condición, se muestra una alerta indicando que se debe ingresar un 
número válido.

3-Solicitud a la API:
Si el ID ingresado es válido, se realiza una solicitud a la API de Superhero para obtener información
sobre el superhéroe 
correspondiente.

4-Procesamiento de la respuesta:
Una vez que se recibe la respuesta de la API, se procesa la información para generar una "CARD" de 
detalles del superhéroe.  Esta tarjeta incluye su nombre, conexiones, biografía, altura, peso y 
alianzas. En caso de que la imagen de la card del superheroe indicado por el usuario no estuviera
disponible saldra un mensaje indicandoselo al usuario.

5-Visualización de estadísticas:
Además de la tarjeta de detalles, se muestra un gráfico "pastel" que representa las estadísticas de
poder del superhéroe. Estas estadísticas se obtienen de la respuesta de la API y se muestran en el 
gráfico si están disponibles aunque sea "1" powerstats. En caso contrario, se indicara que las 
estadísticas no están disponibles "cuando todas las estadisticas sean todas null o "-". [Ir al inicio](#superhero-api)
EJEMPLO:

*ESTE GRAFICO NO SE VERA*  
``` javascript
 El heroe id-124

 "powerstats": {  
 "intelligence": "null",  
 "strength": "null",  
 "speed": "null",      
 "durability": "null",  
  "power": "null",  
  "combat": "null"}
  ```  
  

*ESTE GRAFICO SI SE VERA*  
 ``` 
El heroe id-125  
"powerstats": {  
"intelligence": "null",  
 "strength": "45",  
"speed": "null",  
"durability": "null",  
"power": "null",  
"combat": "null"}  
  ```


"Fue una manera para que no se rompiera el codigo cuando todos los stats fueran `null`, y apareciera 
un mensaje indicandolo.""

Manejo de errores:
El código maneja posibles errores durante la solicitud a la API. Si ocurre un error, se registra en 
la consola del navegador y se muestra una alerta al usuario para informarle sobre el problema.

## Uso

1-Ingresar ID del superhéroe:
El usuario debe ingresar el ID "un numero" del superhéroe en el campo de entrada proporcionado.
"Cabe destacar que la api nos proporciona 732 heroes, no se controlo en caso de que el usuario colocara
733 o 1000 por ejemplo".

2-Enviar formulario:
Después de ingresar el ID, el usuario debe hacer clic en el botón de búsqueda para enviar el formulario y 
obtener la información del superhéroe.

3-Visualización de resultados:
Una vez que se completa la búsqueda, se muestran los detalles del superhéroe y, si están disponibles, las 
estadísticas de poder en forma de gráfico circular.  
[Ir al inicio](#superhero-api)

## Notas adicionales
-El llamado de esta api en particular estuvo algo compleja, ya que existian datos que estaban incompletos
por ejemplo: 
1-Imagenes la cual la url no servian "error 404", "se resolvio" y a la vez no, tomando como decisión
no mostrar la card del superheroe.

2-Algunos stats "poderes" del heroe salian como null o "-", se "resolvio" no 
mostrando el grafico si todos eran null y si un stat salia se mostraba ese podeer nada mas. 

3- algunos datos del  superheroe como la ocupación, peso, entre otros, aparecian como "-", no solucione ese 
detalle, simplemente deje que se mostrara pero no se si sera agradable ante la vista del usuario o mejor 
desaparecer ese dato con un condicional "se ira mejorando el codigo"
En caso de que algunos datos de la API estén ausentes o sean incorrectos, se ha implementado lógica para evitar
errores y mostrar la información disponible de manera apropiada "los que se pudo".  
[Ir al inicio](#superhero-api)


