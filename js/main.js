var categoryArray = [
    "html",
    "css",
    "bs",
    "html",
    "css",
    "bs",
    "kode",
    "html",
    "css",
    "bs",
    "kode"
]

var difficultyArray = [
    "Alejandra",
    "Ann",
    "Noemi",
    "Erik",
    "Jorge",
    "Carlos",
    "José",
    "Héctor",
    "Agus",
    "Ochoa",
    "Rodo",
    "Lupita",
    "Diana"
]

var questionScore;
var randomActive = false;
var selectedName;
var randomIndex;

var timer;

function toggleRandom(button) {
    if ($(button).hasClass("active")) {
        clearTimeout(timer)
        $(button).removeClass("active").text("Iniciar");
        var choosen = difficultyArray[randomIndex]
        console.log(choosen)
        $(".difficulty-wrapper").text(choosen)
        console.log(difficultyArray);
        console.log(choosen);
        difficultyArray.splice(randomIndex, 1);
        console.log(difficultyArray);
        randomActive = false;
    } else {
        $(button).addClass("active").text("Detener");
        randomActive = true;
        randomizeNames();
    }
}

function addScore(button) {
    var currentInput = $(button).closest(".team-wrapper").find(".team-score");
    var currentScore = parseInt(currentInput.val());
    var updatedScore = currentScore + questionScore;
    currentInput.val(updatedScore)
}

function randomizeNames() {
    if (randomActive == true && $("#randomize").hasClass("active")) {
        timer = setTimeout(function() {
            var randomD = Math.floor(Math.random() * (+difficultyArray.length - +0)) + +0;
            randomIndex = randomD;
            $(".difficulty-wrapper").text(difficultyArray[randomD]);
            selectedName = difficultyArray[randomD];
            randomizeNames()
        }, 20)
    }
}

