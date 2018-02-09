var arrayHero = [];
var arrayComics = [];
var arrayVotantes = [];
var descripcionGrafico = "";
var hello;
  var dataHero;
  var optionsHero;
  var chartHero;
  var dataComic;
  var optionsComic;
  var chartComic;

function Votante(config){
  this.peli = config.peli;
  this.nombre = config.nombre || "noName";
  this.email = config.email || "example@mail.com";
  this.numero = config.numero || 000000000;
}

function cargarDatos(){
  var datos = load('listaVotos');
  for (var i = 0; i < datos.length; i++) {
    if(datos[i].tipo == "comic"){
      arrayComics.push(datos[i].nombre);
    }
    else{
      arrayHero.push(datos[i].nombre);
    }
  }
}

$(document).ready(function() {
  cargarDatos();
  createDatas();
});

function createDatas(){
  var menu = $("<div id='menu' tabindex='0'></div>");
  var cabecera = $("<h3>Si desea participar en el sorteo de dos entradas del cine rellene los campos a continuacion.</h3>");
  var campo1 = $("<div><label for='nombre' value='Nombre:'> <input type='text' id='nombre' placeholder='Introduce tu nombre'/></div> ");
  var campo2 = $("<div><label for='email' value='Email:'> <input type='text' id='email' placeholder='Introduce tu email'/></div> ");
  var campo3 = $("<div><label for='telef' value='Telefono:'> <input type='text' id='telef' placeholder='Introduce tu telefono'/> </div>");
  var button1 = $("<div><button type='button' class='btn btn-success' id='boton1' onclick='votacionCompleta(true)' aria-label='Pulse enter sus datos y participar en el sorteo'>Aceptar </button><button id='button2' type='button' class='btn btn-danger' aria-label='Pulse enter para saltar el sorteo y acceder directamente a los resultados' onclick='votacionCompleta(false)'>Cancelar </button></div>");
  menu.append(cabecera,campo1,campo2,campo3,button1);
  $("#contenedor").append(menu);
  $("#contenedor").fadeOut();
  $("#contenedor").fadeIn(2000);


}

function votacionCompleta(participar){
 var nombre;
 var telefono;
 var email;
 var votante;
 var peli = load("voto");

  if(participar == true){
      nombre = $("#nombre").val();
      email = $("#email").val();
      telefono = $("#telefono").val();
      votante = new Votante({
        voto:peli,
        nombre:nombre,
        email:email,
        numero:telefono
      });
  }
  else{
     votante = new Votante({
       peli:peli
     });
  }
  addVotante(votante);
  borrarInterfaz();
  crearSegundoInterfaz();
  //llamar ultima votacion añadir a "JSON" + toda la pesca nombre etc ;
  // llamar la api de google
}

function borrarInterfaz(){

  $("#contenedor").fadeOut(1000);
  $("#contenedor").children().remove();
  $("#contenedor").fadeIn(2000);
}

function addVotante(votante){
  arrayVotantes = load("listaVotantes");
  if(arrayVotantes == null){
    arrayVotantes = [];
    arrayVotantes.push(votante);
  }
  else{
    arrayVotantes.push(votante);
  }
    save(arrayVotantes,"listaVotantes");
}

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function crearSegundoInterfaz(){

  var dropDown = $("<div class='dropdown'><button class='btn btn-secondary' aria-label='Pulse enter para mostrar un grafico de barras' type='button' id='dropdownMenuButton' onclick='barGraf(),false' >Grafico de Barras</button><button class='btn btn-secondary' type='button'  aria-label='Pulse enter para mostrar un grafico circular ' id='dropdownMenuButton2' onclick='pieGraf(),false' >Grafico de Tartas</button></div>");
  $("#contenedor").append(dropDown);
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);


}

function descripcion(){
  var contador = 0;
    var contadorTotal = 0;
    var descripcion = "";

   for (var i = 0; i < arrayPeliculas.length; i++) {
     for (var j = 0; j < arrayVotantes.length; j++) {
       if(arrayVotantes[j].peli == i){
         contador++;
        contadorTotal ++;
       }
     }
     descripcion = descripcion + "La pelicula : "+arrayPeliculas[i].Nombre+ " ha optenido "+contador+" votos.";
     contador = 0;
   }
   descripcionGrafico = "El total de votos es de "+contadorTotal+" de los cuales " + descripcion;
}

function drawChart() {

      //Grafico HEROES
      var contador = 0;
      var arrayHeroAdd = arrayHero.unique();
      // Create the data table.
      dataHero = new google.visualization.DataTable();
      dataHero.addColumn('string', 'Personajes');
      dataHero.addColumn('number', 'Cantidad de votos');
     for (var i = 0; i < arrayHeroAdd.length; i++) {
       for (var j = 0; j < arrayHero.length; j++) {
         if(arrayHeroAdd[i] == arrayHero[j]){
           contador++;
         }
       }

       dataHero.addRow([arrayHeroAdd[i],contador]);
       contador = 0;
     }
      optionsHero = {'title':'Votacion Personajes'};
      chartHero = new google.visualization.BarChart(document.getElementById('contenedorGraficoHero'));
      chartHero.draw(dataHero, optionsHero);

      //COMICS

      contador = 0;
      var arrayComicsAdd = arrayComics.unique();
      // Create the data table.
      dataComic = new google.visualization.DataTable();
      dataComic.addColumn('string', 'Comic');
      dataComic.addColumn('number', 'Cantidad de votos');
     for (var i = 0; i < arrayComicsAdd.length; i++) {
       for (var j = 0; j < arrayComics.length; j++) {
         if(arrayComicsAdd[i] == arrayComics[j]){
           contador++;
         }
       }

       dataComic.addRow([arrayComicsAdd[i],contador]);
       contador = 0;
     }
      optionsComic = {'title':'Votacion Comics'};
      chartComic = new google.visualization.BarChart(document.getElementById('contenedorGraficoComic'));
      chartComic.draw(dataComic, optionsComic);
    }

function barGraf(){
  chartHero = new google.visualization.BarChart(document.getElementById('contenedorGraficoHero'));
  chartHero.draw(dataHero, optionsHero);
  chartComic = new google.visualization.BarChart(document.getElementById('contenedorGraficoComic'));
  chartComic.draw(dataComic, optionsComic);
}

function pieGraf(){
  chartComic = new google.visualization.PieChart(document.getElementById('contenedorGraficoHero'));
  chartComic.draw(dataHero, optionsHero);
  chartComic = new google.visualization.PieChart(document.getElementById('contenedorGraficoComic'));
  chartComic.draw(dataComic, optionsComic);
}
