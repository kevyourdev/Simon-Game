var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];
let level = 0;
let started = false;
// track first key press
$(document).ready(function () {
  // var isFirstKeyPress = true;
  // // start condition
  // $(document).keydown(function (event) {
  //   if (isFirstKeyPress) {
  //     // Call nextSequence() on the first key press
  //     started = true;
  //     nextSequence();
  //     // Set isFirstKeyPress to false to prevent further calls to nextSequence()
  //     isFirstKeyPress = false;
  //   }
  // });
  $(document).keypress(function () {
    if (!started) {
      $('#level-title').text('Level ' + level);
      nextSequence();
      started = true;
    }
  });

  $('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    let lastIndex = userClickedPattern.length - 1;
    console.log(lastIndex);
    checkAnswer(lastIndex);
    // TODO: 沒有跑進來
    // nextSequence();
  });
});

function nextSequence() {
  // next level
  level += 1;
  $('#level-title').text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  gamePattern.push(randomChosenColour);

  // Code before the timeout

  setTimeout(function () {
    // Code to be executed after the timeout (1 second in this case)
    console.log('One second has passed.');
    // You can perform any actions here
  }, 1000); // 1000 milliseconds = 1 second

  // Code after the timeout
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {
  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $('#' + currentColor).addClass('pressed');

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  // Check if the most recent user answer matches the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Success');
    if (userClickedPattern.length === gamePattern.length) {
      // Delay calling nextSequence() by 1000 milliseconds (1 second)
      setTimeout(function () {
        nextSequence();
      }, 1000);

      // Reset the userClickedPattern array for the next level
      userClickedPattern = [];
    }
  } else {
    console.log('Wrong');

    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();

    $('body').addClass('game-over');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 100);

    $('#level-title').text(`Game Over, Press Any Key to Restart`);

    startOver();
  }
}

function startOver() {
  level = 0; // Reset the level to 0
  gamePattern = []; // Clear the game pattern array
  started = false; // Set started back to false (assuming you have a started variable)
}
