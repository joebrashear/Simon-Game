var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var hasStarted = false;

var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  if (checkAnswer(userClickedPattern.length - 1)) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  makeSound(userChosenColor);
  animatePress(userChosenColor);
});

$("body").keypress(function (event) {
  if (!hasStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    hasStarted = true;
  }
});

function makeSound(file) {
  var audio = new Audio("sounds/" + file + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  console.log(currentColor);
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    return true;
  } else {
    return false;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  hasStarted = false;
  userClickedPattern = [];
}
