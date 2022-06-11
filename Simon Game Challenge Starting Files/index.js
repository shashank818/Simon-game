var buttonColor=["red","blue","green","yellow"];
var gamePattern=[];

var userClickedPattern=[];
var started=false;

var level=0;
 $(document).keypress(function(){
   if(!started){
     $("level-title").text("Level "+level);
     nextsequence();
     started=true;
   }
 })
function playSound(name){
  var audio= new Audio("sounds/" + name+ ".mp3");
  audio.play();
}

 function startOver(){
   level=0;
   started=false;
   gamePattern=[];
 }
 function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
     //win
     if(gamePattern.length===userClickedPattern.length){
       setTimeout(function(){
         nextsequence();
       },1000);

     }
   }
   else{
     //lose
     playSound("wrong");
     $(document).addClass("game-over");
     setTimeout(function(){
       $(document).removeClass("game-over");
     },200);
     $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
   }
 }
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextsequence(){
  userClickedPattern=[];
  level++;

  $("#level-title").text("Level "+level);

  var randomNumber =Math.floor(Math.random()*4);

  var randomchoose=buttonColor[randomNumber];

  gamePattern.push(randomchoose);

  $("#"+randomchoose).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed");
 setTimeout(function(){
   $("#"+currentColour).removeClass("pressed");
 },100);
}
