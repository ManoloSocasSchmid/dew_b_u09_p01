var publicKey ="9b8c3db2d6574a3a29d54d9bd42042eb";


var cont = 0;
var comicVotado;
var personajeVotado;
var comics;
var personajes;
var votos;


function datosComic(){
  var url ='https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=9b8c3db2d6574a3a29d54d9bd42042eb';
  var ts = new Date().getTime();


  $.ajax({
    url:url,
    type:"GET",
    datatype: "json",
    before:function(){
      $(".spinner").show();
    },
    success: function(json){
      comics = json.data.results;
      writeComics();
      paginateComics();
    },
    error:function(){
      alert("Los comics no han alcanzado un numero suficiente de ventas y han sido quemados. Por lo tanto no han podido ser cargados");
    },
    complete:function(){
      $(".spinner").hide();
    }
  });//  url typr fatatype before send succes error complete

  var url ='https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=9b8c3db2d6574a3a29d54d9bd42042eb';
  var ts = new Date().getTime();

  $.ajax({
    url:url,
    type:"GET",
    datatype: "json",
  //  before:{
  //    $("#spinner").show();
  //  },
    success: function(json){
      personajes = json.data.results;
      writePersonajes();
      paginatePersonajes();
    },
    error:function(){
      alert("Los superheroes se han cansado de rescatar a la gente apesar de que no les pagan y estan de huelga por lo tanto no han podido aparecer por aqui.");
    }
  });

}

function loadVotos(){
  var arrayVotos = load("listaVotos");
  if(arrayVotos == null){
    votos = [];
  }
  else{
  votos = arrayVotos;
  }
}

$(document).ready(function(){
  loadVotos();
  datosComic();

})

function writeComics(){
  for (var i = 0; i < comics.length; i++) {

  var peliCuerpo = $("<div class='comics'>");
  var divEntremedio = $("<div aria-labelledby='arenaLabel' tabindex='-1'></div>");
  var nombrePeli= $("<h3 class='titulos'>"+comics[i].title+"</h3>");
  var descripPeli= $("<span class='text'>"+comics[i].description+"</span>");
  var imgPath = comics[i].thumbnail.path+ '/standard_xlarge.'+comics[i].thumbnail.extension;
  cont ++;
  var imagenPeli = $("<img src='"+imgPath+"' alt='' tabindex='0' class='imgsComics first' />");
  var botton = $("<div><button type='button' value='Votar Comic' class='btVotar btn btn-primary' aria-label='Pulse enter para votar este Comic' onclick='votarComic("+comics[i].id+")'> Votar</button></div>");
  divEntremedio.append(imagenPeli,nombrePeli,botton,descripPeli);
  //var modal = crearModal(peli);
  peliCuerpo.append(divEntremedio);
  $("#pills-profile").append(peliCuerpo);

  }
    twentyLetterWorks();
}

function writePersonajes(){
  var text = "";
  for (var i = 0; i < personajes.length; i++) {
    var peliCuerpo = $("<div class='comics'>");
    var divEntremedio = $("<div aria-labelledby='arenaLabel' tabindex='-1'></div>");
    var nombrePeli= $("<h3 class='titulos'>"+personajes[i].name+"</h3>");


    var descripPeli= $("<span class='text'>"+personajes[i].description+"</span>");
    var imgPath = personajes[i].thumbnail.path+ '/standard_xlarge.'+personajes[i].thumbnail.extension;
    cont ++;
    var imagenPeli = $("<img src='"+imgPath+"' alt='' tabindex='0' class='imgsComics first' />");
    var botton = $("<div><button type='button' value='Votar Comic' class='btVotar btn btn-primary' aria-label='Pulse enter para votar este Comic'  onclick='votarHero("+personajes[i].id+")'> Votar</button></div>");
    divEntremedio.append(imagenPeli,nombrePeli,botton,descripPeli);
    //var modal = crearModal(peli);
    peliCuerpo.append(divEntremedio);
    $("#pills-home").append(peliCuerpo);

  }

}

function twentyLetterWorks(){
  var showChar = 20;  // How many characters are shown by default
   var ellipsestext = "...";
   var moretext = "Show more >";
   var lesstext = "Show less";


   $('.text').each(function() {
       var content = $(this).html();

       if(content.length > showChar) {

           var c = content.substr(0, showChar);
           var h = content.substr(showChar, content.length - showChar);

           var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

           $(this).html(html);
       }

   });

   $(".morelink").click(function(){
       if($(this).hasClass("less")) {
           $(this).removeClass("less");
           $(this).html(moretext);
       } else {
           $(this).addClass("less");
           $(this).html(lesstext);
       }
       $(this).parent().prev().toggle();
       $(this).prev().toggle();
       return false;
   });
}

function paginatePersonajes(){

  $(function($) {
               var items = $("#pills-home .comics");

               var numItems = personajes.length;
               var perPage = 10;

               // Only show the first 2 (or first `per_page`) items initially.
               items.slice(perPage).hide();

               // Now setup the pagination using the `#pagination` div.
               $("#pills-home .pagination").pagination({
                   items: numItems,
                   itemsOnPage: perPage,
                   cssStyle: "light-theme",

                   // This is the actual page changing functionality.
                   onPageClick: function(pageNumber) {
                       // We need to show and hide `tr`s appropriately.
                       var showFrom = perPage * (pageNumber - 1);
                       var showTo = showFrom + perPage;

                       // We'll first hide everything...
                       items.hide()
                            // ... and then only show the appropriate rows.
                            .slice(showFrom, showTo).show();
                   }
               });
           });
}

function paginateComics(){

  $(function($) {
               var items = $("#pills-profile .comics");

               var numItems = personajes.length;
               var perPage = 10;

               // Only show the first 2 (or first `per_page`) items initially.
               items.slice(perPage).hide();

               // Now setup the pagination using the `#pagination` div.
               $("#pills-profile .pagination").pagination({
                   items: numItems,
                   itemsOnPage: perPage,
                   cssStyle: "light-theme",

                   // This is the actual page changing functionality.
                   onPageClick: function(pageNumber) {
                       // We need to show and hide `tr`s appropriately.
                       var showFrom = perPage * (pageNumber - 1);
                       var showTo = showFrom + perPage;

                       // We'll first hide everything...
                       items.hide()
                            // ... and then only show the appropriate rows.
                            .slice(showFrom, showTo).show();
                   }
               });
           });
}

function votarComic(id){
 comics.map(function(comic){
   if(comic.id == id){
     comicVotado = comic;
   }
 })
 var voto = {tipo:"comic" , nombre: comicVotado.title};
 save(voto,'voto');
 saveVotos(voto);
 location.href = "html/data.html";
}

function votarHero(id){
 personajes.map(function(hero){
   if(hero.id == id){
     personajeVotado = hero;
   }
 })
 var voto = {tipo:"personaje" , nombre: personajeVotado.name};
 save(voto,'voto');
 saveVotos(voto);
 location.href = "html/data.html";
}

function saveVotos(voto){
  votos.push(voto);
  save(votos,'listaVotos');
}
