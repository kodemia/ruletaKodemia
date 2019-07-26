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
    "Fácil",
    "Medio",
    "Difícil"
]

var questionScore;
var totalScore = 0;

function toggleRandom(button) {
    if ($(button).hasClass("active")) {
        $(".category-img-wrapper").removeClass("randomized");
        $(button).removeClass("active").text("Iniciar");
        var random = Math.floor(Math.random() * (+11 - +0)) + +0;
        console.log(random)
        var randomCategory = categoryArray[random];
        console.log(randomCategory)
        switch (randomCategory) {
            case "html":
                $(".category-img-wrapper").removeClass("icon-html icon-css icon-bs icon-kode");
                $(".category-img-wrapper").addClass("icon-html");
                break;

            case "css":
                $(".category-img-wrapper").removeClass("icon-html icon-css icon-bs icon-kode");
                $(".category-img-wrapper").addClass("icon-css");
                break;

            case "bs":
                $(".category-img-wrapper").removeClass("icon-html icon-css icon-bs icon-kode");
                $(".category-img-wrapper").addClass("icon-bs");
                break;

            case "kode":
                $(".category-img-wrapper").removeClass("icon-html icon-css icon-bs icon-kode");
                $(".category-img-wrapper").addClass("icon-kode");
                questionScore = 300
                break;
            default:
                // code block
        }

        var randomD = Math.floor(Math.random() * (+3 - +0)) + +0;
        console.log(randomD);
        console.log(difficultyArray[randomD])

        $(".difficulty-wrapper").text(difficultyArray[randomD])

        if(difficultyArray[randomD] == "Fácil" && randomCategory != "kode"){
        	questionScore = 50;
        }

		else if(difficultyArray[randomD] == "Medio" && randomCategory != "kode"){
        	questionScore = 100;
        }   

        else if(difficultyArray[randomD] == "Difícil" && randomCategory != "kode"){
        	questionScore = 200;
        }

        if(randomCategory == "kode"){
        	questionScore = 350;
        	$(".difficulty-wrapper").text("¡Kode!")
        }     

        console.log(questionScore)

    } else {
        $(".category-img-wrapper").addClass("randomized");
        $(button).addClass("active").text("Detener")
    }
}

function addScore(button){
	var currentInput = $(button).closest(".team-wrapper").find(".team-score");
	var currentScore = parseInt(currentInput.val());
	var updatedScore = currentScore + questionScore;
	currentInput.val(updatedScore)
    totalScore = totalScore + questionScore;
    $(".total-score").text(totalScore); 
}

function removeScore(button){
    var currentInput = $(button).closest(".team-wrapper").find(".team-score");
    var currentScore = parseInt(currentInput.val());
    var updatedScore = currentScore - (questionScore/2);
    currentInput.val(updatedScore)
    totalScore = totalScore - (questionScore/2)
    $(".total-score").text(totalScore);
}