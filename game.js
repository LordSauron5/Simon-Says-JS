//colours of each button
var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
];

//sequence of random buttons generated
var gamePattern = [];

//game started bool
var started = false;

//initialize level
var level = 0;

$(document).keypress(function () {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//sequence of buttons clicked by user
var userClickedPattern = [];

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){

    userClickedPattern = [];

    level++; //every time the next sequence starts, new level goes up
    $("#level-title").text("Level " + level)
    var randomNumber =  Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //jQuery to make button flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length){
            //call next sequence after a 1s delay
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
}



