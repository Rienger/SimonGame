let userClickedPattern = []
let gamePattern = []

let buttonColors = ['red', 'blue', 'green', 'yellow']
let started = false;
let level = 0;



$(document).keypress(function(){
  if(!started){
  nextSequence()
  $('h1').html('level '+ level)
  started = true;
}
})



$('.btn').click(function(){
  let userChosenColor  = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})



function nextSequence(){

  let randomNumber = Math.round(Math.random()*3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern)


  setTimeout(function(){$('#'+randomChosenColor).fadeOut(200).fadeIn(100)},400);


  level++;
  userClickedPattern = [];
  $('h1').text('level '+level);

}

function  checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log('success')

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound('wrong');

    $('h1').text('Game Over, Press Any Key to Restart')

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver()
  }

}






function playSound(name){

  let audio = new Audio('sounds/'+name+'.mp3')
  audio.play()
  audio.volume = 0.05;
}




function animatePress(currentColor){

  $('#'+currentColor).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColor).removeClass('pressed')
  },100);


}



function startOver(){

  level=0;
  gamePattern = [];
  started = false;
}






// if(gamePattern[gamePattern.length]==userClickedPattern[userClickedPattern.length])
// function tester(){
// console.log(gamePattern[gamePattern.length])
// console.log(userClickedPattern[userClickedPattern.length])
// }
