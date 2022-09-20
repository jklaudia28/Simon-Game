

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var startOfTheGame = false;



$(document).keypress(function() {
  if (!startOfTheGame) {
    $("#level-title").text("Level" + level);
    nextSequence();
    startOfTheGame = true;
}
});



$(".btn").click(function() {

  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){nextSequence()}, 1000);}

  } else {

    console.log("wrong");

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
      setTimeout(function() {$("body").removeClass("game-over")}, 200);

      $("h1").text("Game Over,Press any key to restart.");

      startOver();
  }

}


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var colourElement = $("#" + randomChosenColour);

  colourElement.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {$("#" + currentColour).removeClass("pressed")}, 100);
  };




function startOver() {

  level = 0;
  gamePattern = [];
  startOfTheGame = false;

}