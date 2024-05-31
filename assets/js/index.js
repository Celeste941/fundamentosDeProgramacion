/* 
1- Al enviar el formulario con el ID "searchForm" 
el código que sigue se ejecutará cuando el usuario 
envíe el formulario HTML que tiene  el atributo 
id="searchForm"

2- Evitar el comportamiento por defecto del formulario
.event.preventDefault(); 
  
3- regex : Expresión regular para validar que el valor 
es un número positivo y mayor a 0

4-if (regex.test(inputValue)) ---> Valida el valor de 
entrada usando la expresión regular.

5-  let requestConfig ---> Configuración de la solicitud 
AJAX

6-Si ${inputValue} tiene el valor "1", entonces la URL 
completa será https://superheroapi.com/api.php/3033707663582647/1.
Esto apunta a los datos del superhéroe con el identificador 
1 en la API.

7-  $("#chartContainer").html("") ----> Limpia el contenido
del contenedor donde se vera el gráfico;

8- let img = new Image() ---- > Crear un nuevo objeto de imagen
 para verificar la carga de la misma.
 
9- img.onload = function () ---- > Función que se ejecuta 
si la imagen se carga correctamente. 

10- let postCard ---> crear la tarjeta de información del 
superhéroe con los datos de la respuesta.

11- $("#card-hero").html(postCard) --- > Insertar la tarjeta de 
información en el contenedor con el ID "card-hero"

12-const stats ---> Convertir las estadísticas del superhéroe
a números enteros, y const statsHero ---- > Crea un array de 
objetos con las estadísticas del superhéroe.

13-const validStats  ---> Verificar si al menos una estadística
es mayor que 0.

14- if (!validStats) -----> Si no hay estadísticas válidas, 
mostrar un mensaje indicando "estadisticas no validas".

15- Mostrar el gráfico de pastel en el contenedor con el ID 
"chartContainer" $("#chartContainer").CanvasJSChart(options)

16-img.onerror ---> Función que se ejecuta si la imagen no 
se carga correctamente

17- img.src establece la URL de la imagen para iniciar la carga*/

$("#searchForm").submit(function (event) {
  event.preventDefault();
  let inputValue = $("#validateInput").val();
  let regex = /^[1-9]\d*$/; //

  if (regex.test(inputValue)) {
    let requestConfig = {
      url: `https://superheroapi.com/api.php/3033707663582647/${inputValue}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        const post = response;

        $("#chartContainer").html("");

        let img = new Image();
        img.onload = function () {
          
          let postCard = `
          <div class="card mb-3 m-auto" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${post.image.url}" alt="${post.name}" class="w-100 h-100">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="card-title">Nombre: ${post.name}</p> 
                  <p class="card-title">Conexión: ${post.connections["group-affiliation"]}</p> 
                  <p class="card-text">Publicado por: ${post.biography.publisher}</p>
                  <p class="card-text">Primera aparición: ${post.biography["first-appearance"]}</p>
                  <p class="card-text">Ocupación: ${post.work.occupation}</p>
                  <p class="card-text">Altura: ${post.appearance.height[1]}</p>
                  <p class="card-text">Peso: ${post.appearance.weight[1]}</p>            
                  <p class="card-text">Alianzas: ${post.biography.aliases}</p>
                </div>
              </div>
            </div>
          </div>`;
          $("#card-hero").html(postCard);

          const stats = {
            durability: parseInt(post.powerstats.durability) || 0,
            speed: parseInt(post.powerstats.speed) || 0,
            strength: parseInt(post.powerstats.strength) || 0,
            intelligence: parseInt(post.powerstats.intelligence) || 0,
            combat: parseInt(post.powerstats.combat) || 0,
            power: parseInt(post.powerstats.power) || 0,
          };
          const validStats = Object.values(stats).some((stat) => stat > 0);

          if (!validStats) {
            $("#chartContainer").html("<h3>Lo siento, estadísticas no disponibles</h3>");
          }
          else {
            /* Se Crea un array de objetos con las
               estadísticas del superhéroe*/
            const statsHero = [
              { y: stats.durability, label: "Durabilidad" },
              { y: stats.speed, label: "Velocidad" },
              { y: stats.strength, label: "Fuerza" },
              { y: stats.intelligence, label: "Inteligencia" },
              { y: stats.combat, label: "Combate" },
              { y: stats.power, label: "Poder" },
            ];

            /* Configuración del gráfico de pastel*/
            let options = {
              title: {
                text: "Estadísticas del Superhéroe",
              },
              subtitles: [
                {
                  text: `Héroe: ${post.name}}`,
                },
              ],
              theme: "light2",
              animationEnabled: true,
              data: [
                {
                  type: "pie",
                  startAngle: 40,
                  toolTipContent: "<b>{label}</b>: {y}%",
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabelFontSize: 16,
                  indexLabel: "{label} - {y}%",
                  dataPoints: statsHero,
                },
              ],
            };
            $("#chartContainer").CanvasJSChart(options);
          }
        };

        img.onerror = function () {
          $("#card-hero").html(
            "<h3 class='text-center'>Héroe no disponible</h3>"
          );
        };
        /* Establecer la URL de la imagen para iniciar la carga*/
        img.src = post.image.url;
      },

      error: function (error) {
        console.log("¡Ha ocurrido un error!", error);
        alert("ERROR 404 - RECARGAR PAGINA");
      },

    };
    $.ajax(requestConfig);
  } else {
    // Mostrar una alerta si el valor ingresado no es válido
    alert("Por favor, ingresa un número positivo válido.");
  }
});
