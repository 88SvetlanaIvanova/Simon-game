
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern =[];
var gamePattern=[];

var started = false;

var level = 0;

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  console.log(gamePattern);
  console.log(userClickedPattern);
  if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]) {
    console.log("success");
     //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if(gamePattern.length === userClickedPattern.length){
      
      setTimeout(function() {
        nextSequence();
        }, 1000);
       
    }
  }
  else{
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    playSound(audio);

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver(); 
  }
}

$(document).keydown (function() {
  //console.log('First keydown detected');
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length -1);
}); 

function nextSequence(){ 
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  
  level++;

  $("h1").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor); 

}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}  

function animatePress(currentColour){
 //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
 $("#" + currentColour).addClass("pressed");

 setTimeout(function() {
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}



