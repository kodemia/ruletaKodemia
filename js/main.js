/*Array que contiene las categorías a seleccionar en la ruleta*/
var categoryArray = ["html", "css", "bs", "kode"];

/*Array que contiene las dificultades de preguntas*/
var difficultyArray = ["Fácil", "Medio", "Difícil"];

var questionScore; /*Almacenamiento del puntaje de la pregunta actual*/
var totalScore = 0; /*Acumulación de puntaje total*/

/*Interacción de la ruleta*/
function toggleRandom(button) {
  if ($(button).hasClass("active")) {
    /*si la ruleta esta activa, detenerla*/
    $(".category-img-wrapper").removeClass("randomized"); /*detener la ruleta*/
    $(button)
      .removeClass("active")
      .text("Iniciar"); /*cambiar el estado del botón*/
    let randomCategoryIndex = Math.floor(
      Math.random() * categoryArray.length
    ); /*generar un número aleatorio para seleccionar una categoría*/
    let randomCategory =
      categoryArray[
        randomCategoryIndex
      ]; /*seleccionar la categoría con base en el número aleatorio*/
    switch (
      randomCategory /*Cambio de estado del logo con base en la categoría seleccionada*/
    ) {
      case "html":
        $(".category-img-wrapper").removeClass(
          "icon-html icon-css icon-bs icon-kode"
        );
        $(".category-img-wrapper").addClass("icon-html");
        break;

      case "css":
        $(".category-img-wrapper").removeClass(
          "icon-html icon-css icon-bs icon-kode"
        );
        $(".category-img-wrapper").addClass("icon-css");
        break;

      case "bs":
        $(".category-img-wrapper").removeClass(
          "icon-html icon-css icon-bs icon-kode"
        );
        $(".category-img-wrapper").addClass("icon-bs");
        break;

      case "kode":
        $(".category-img-wrapper").removeClass(
          "icon-html icon-css icon-bs icon-kode"
        );
        $(".category-img-wrapper").addClass("icon-kode");
        questionScore = 300;
        break;
      default:
      // code block
    }

    let randomDifficultyIndex = Math.floor(
      Math.random() * difficultyArray.length
    ); /*genera un índice aleatorio para seleccionar una dificultad*/

    $(".difficulty-wrapper").text(
      difficultyArray[randomDifficultyIndex]
    ); /*cambia el estado de la etiqueta de dificultad*/

    /*Asignamos la puntuación de la pregunta actual con base en la dificultad*/
    if (
      difficultyArray[randomDifficultyIndex] == "Fácil" &&
      randomCategory != "kode"
    ) {
      questionScore = 50;
    } else if (
      difficultyArray[randomDifficultyIndex] == "Medio" &&
      randomCategory != "kode"
    ) {
      questionScore = 100;
    } else if (
      difficultyArray[randomDifficultyIndex] == "Difícil" &&
      randomCategory != "kode"
    ) {
      questionScore = 200;
    }

    /*Si la categoría es 'kode', se asigna la puntuación y el estado de la etiqueta de categoría*/
    if (randomCategory == "kode") {
      questionScore = 350;
      $(".difficulty-wrapper").text("¡Kode!");
    }
  } else {
    /*si la ruleta esta detenida, iniciarla*/
    $(".category-img-wrapper").addClass("randomized");
    $(button).addClass("active").text("Detener");
  }
}

/*Acumula puntos cuando la respuesta es correcta*/
function addScore(button) {
  /*Encuentra el input del equipo que respondió correctamente*/
  var currentInput = $(button).closest(".team-wrapper").find(".team-score");
  /*Obtiene el score actual del equipo que respondió correctamente*/
  var currentScore = parseInt(currentInput.val());
  /*Acumula el score de la pregunta con el score actual del equipo*/
  var updatedScore = currentScore + questionScore;
  /*Asigna la acumulación de puntos al input del equipo*/
  currentInput.val(updatedScore);
  /*Acumula el puntaje total*/
  totalScore = totalScore + questionScore;
  /*Asigna el puntaje total a la etiqueta de marcador total*/
  $(".total-score").text(totalScore);
}

/*Reduce los puntos cuando la respuesta es incorrecta*/
function removeScore(button) {
  /*Encuentra el input del equipo que respondió incorrectamente*/
  var currentInput = $(button).closest(".team-wrapper").find(".team-score");
  /*Obtiene el score actual del equipo que respondió incorrectamente*/
  var currentScore = parseInt(currentInput.val());
  /*Reduce los puntos correspondientes al puntaje del equipo*/
  var updatedScore = currentScore - questionScore / 2;
  /*Asigna el nuevo puntaje*/
  currentInput.val(updatedScore);
  /*Reduce el puntaje perdido al total*/
  totalScore = totalScore - questionScore / 2;
  /*Asigna el puntaje total a la etiqueta de marcador total*/
  $(".total-score").text(totalScore);
}

let startingMinutes; //  declarando la variable de los minutos que va tener nuestra cuenta atras
let time;
let minutesInput = $(".counter-wrapper input");
// Ingresar los minutos que quiere y cambiar el input a d-none
function setCountDownMinutes(e) {
  if (e.keyCode == 13) {
    startingMinutes = minutesInput.val();
    time = startingMinutes * 60;
    minutesInput.addClass("d-none");
    $("#minutes").removeClass("d-none");
    $("#minutes").text(`${startingMinutes}:00`);
  }
}

$(".counter-wrapper input").keyup(setCountDownMinutes);

// Cambiar al input para ingresar nuevos minutos con doble click
function toggleEditable() {
  $("#minutes").addClass("d-none");
  minutesInput.removeClass("d-none");
}

$("#minutes").on("dblclick", toggleEditable);
//Inicializando nuestro tiempo en el counterDown
let countDown; // Declarando afuera counterDown para usarlos en diferentes funciones
//Hacer el toggle de inicar y pausar  nuestra cuenta atras

function toggleCountDown(button) {
  let alarm = new Audio("sounds/countDownEnd.mp3"); // Inicializando un nuevo audio con nuestra alarma

  if ($(button).hasClass("active")) {
    // Si nuetra cuenta atras esta activa, detenerlo
    $(button).removeClass("active").text("Inicar");
    clearInterval(countDown);
  } else {
    // Si nuestra cuenta atras esta en pausa o sin iniciar, iniciarla
    $(button).addClass("active").text("Pausar");
    countDown = setInterval(() => {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (minutes == 0 && seconds == 00) {
        clearInterval(countDown);
        $("#minutes").text(`${minutes}:${seconds}0`);
        alarm.play();
      } else {
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#minutes").text(`${minutes}:${seconds}`);
        time--;
      }
    }, 1000);
  }
}

/*Resetear mi cuentra atras y regresar el boton del toggle al estado inicial  */
function resetCountDown(button) {
  startingMinutes; // Reseteando los minutos que va tener nuestra cuenta atras
  time = startingMinutes * 60; // Reseteando nuestro tiempo en el counterDown
  let toggleButton = $("#toggleCounter");
  if (toggleButton.hasClass("active")) {
    toggleButton.removeClass("active").text("Inicar"); // Regresar al estado original mi boton de iniciar
    clearInterval(countDown); //para mi cuentra atras
    $("#minutes").html(`${startingMinutes}:00`); // Pintar los mi contador reseteado
    countDown; // llamando de nuevo counterDown para que se reinicie
  }
}
