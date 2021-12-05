var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

//Click

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);


  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
  // console.log(userClickedPattern);

});


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Succes");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {

          nextSequence();
            }, 1000);


    }

  } else {
    var wrong= new Audio("sounds/wrong.mp3")
    wrong.play();
    var gameOver = $("body").addClass("game-over");
    setTimeout(function(){

      gameOver.removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }



}

//Keyboard press
$(document).keypress(function() {

  if (!started) {


    $("#level-title").text("Level 0")
    nextSequence();
    started = true;


  }



})


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);





}

function animatePress(currentColor) {
  var activeButt = $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    activeButt.removeClass("pressed");




  }, 100)

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;



}
