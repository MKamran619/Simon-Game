var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern=[];
var levelCount=0;
var clickCount=0;

function nextSequence() {
  userPattern=[];
  clickCount=0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var classPick= "."+randomChosenColour;
  $(classPick).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$("body").keypress(function(event){
  if(levelCount<=0){
    levelCounter();
  }
});
$(".start").click(function () {
  if(levelCount<=0){
    levelCounter();
  }
});
setTimeout(function () {
  $("body").click(function(event){
    if(levelCount<=0){
      levelCounter();
    }
  });
}, 80000);

function levelCounter(){
  levelCount++;
  $("h1").html(" level "+levelCount);
  setTimeout(function () {
    nextSequence();
  }, 800);
}

$(".btn").click(function () {
   var userChosenColour= $(this).attr("id");
   userPattern.push(userChosenColour);
   $("#" +userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   clickCount++;
   checkAnswer();
   playSound(userChosenColour);
});


function checkAnswer() {

    if(gamePattern[clickCount-1]==userPattern[clickCount-1]){
       if(levelCount==1){
        setTimeout(function () {
         levelCounter();
        }, 800);
       }
      else if (levelCount==clickCount) {
        setTimeout(function () {
           levelCounter();
         }, 800);
      }
     }
      else {
      gameover();
      }
}
function playSound(name){
  var audio= new Audio("sounds/" + name+ ".mp3")
  audio.play();
}

function gameover() {
  $("h1").html(" Game Over");

   gamePattern=[];
   levelCount=0;
   clickCount=0;
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);

}
