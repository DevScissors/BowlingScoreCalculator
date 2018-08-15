/*
  DnBowling is starting a bowling club. To help with the club, we have engaged
  you to program a scoring system. Create one which takes in an array of bowls
  and returns the correct score. Insert your function into the test to validate
  the proper scores.

  The features of the system are:
  - One player only
  - In each frame, the bowler has 2 tries to knock down all the pins
  - After 2 tries, if the bowler fails to knock down all the pins, their score
  is the sum of the number of pins they've knocked down in the 2 attempts.

        E.g, if a bowler rolls, 4,4, then their score in the frame is 8.

  - After 2 tries, if the bowler knocks down all the pins, it is a spare. The
  scoring of a spare is the sum of the number of pins knocked down plus the
  number of pins knocked down in the next bowl.

        E.g, if a bowler rolls, 4,6 | 5,0, then their score in 
          the frame is 20 = (4 + 6 + 5) + (5 + 0).

  - After one try, if the bowler knocks down all the pins, it is a strike. The
  scoring of a strike is the sum of the number of pins knocked down plus the
  number of pins knocked down in the next two bowls.

        E.g, if a bowler rolls, 10 | 5, 4, then their score in the frame
        is 28 = (10 + 5 + 4) + (5 + 4).

  - There are 2 rolls in a frame
  - There are 10 frames in a round
  - Don't worry about validating the number of rolls in a frame

  Note:
  If you cannot get the code to work properly, make comments where you think the
  problem is, and where possible describe what you would need to do to fix it.
*/

var chai = require('chai');
var assert = chai.assert;


// Function that deteremines whether the player got a spare, strike, or missed some pins altogether
function bowlingScore(bowls) {
  var bowlsArr = bowls;  // Sets variable to bowls array from Test function
  var overallScore = 0;
  var frameScore = 0;
  var frame = 1;
  var ballNum = 1;
  
  for(var i = 0; frame <= 10; i++) { 
    if(!Number.isInteger(bowlsArr[i])) { // Checking to make sure test data is an integer
       throw "Number must be an integer between 0 and 10. Invalid test data." + "\nTest data: " + bowlsArr[i] + "\n";
    }
    
    if(bowlsArr[i] < 0 || bowlsArr[i] > 10){ // Checks to make sure the test data is between 0 and 10
       throw "Invalid test data. Pins need to be between 0-10." + "\nFrame #: " + frame + "\nNumber of pins: " + bowlsArr[i] + "\n";
    }
    
    if((frameScore + bowlsArr[i]) > 10) { // Checks to make sure the framescore is not more than 10 which would result in invalid data
        throw "Invalid test data. Frame score can't be greater than 10." + "\nFrame score: " + (frameScore + bowlsArr[i]) + "\n";
    }

    if((ballNum === 1) && (bowlsArr[i] === 10)) { // Checks if ball is a strike
      frame++;
      ballNum = 1; // Resetting ball to 1 since frame is over with a strike on first throw
      overallScore += bowlsArr[i] + (bowlsArr[i + 1] + bowlsArr[i + 2]); // Add the next 2 balls thrown to overall score since player got a strike
      frameScore = 0;
      // console.log("Nice strike!");
      // console.log(overallScore);
    }
    else if(frameScore + bowlsArr[i] === 10) { // Checks if ball 1 + ball 2 = 10; a spare
      frame++;
      ballNum = 1; // Resetting ballNum to 1 since frame is over with ball 1 + ball 2 equalling a spare
      overallScore += bowlsArr[i] + bowlsArr[i + 1]; // Adding the next ball to overall score since player got a spare
      frameScore = 0;
      // console.log("Nice spare!");
      // console.log(overallScore);
    }
    else { // This ball is not a strike but could be the 1st half of a spare
      frameScore += bowlsArr[i]; // Adds the current ball score to the frameScore
      // console.log("Frame# " + frame + " Ball# " + ballNum);
      if(ballNum === 1){
        ballNum = 2;
        overallScore += bowlsArr[i];  // Adds the current ball score to the overallScore
      }
      else {
        overallScore += bowlsArr[i];
        frame++;
        ballNum = 1;
        frameScore = 0;
      }
      // console.log("Frame score " + frameScore);
      // console.log("Overall score " + overallScore);
    }
  }
  console.log("Your score was " + overallScore + "\nGame over")
  if(overallScore === 300){
    console.log("You bowled a perfect game! Congrats!\n")
  }
  else if (overallScore > 100) {
    console.log("You had a pretty good game.\n");        
  }
  else {
    console.log("I think you can do better. Keep practicing and you will.\n");
  }
  return overallScore;
}
  
function test() {
  let games = [
    { 
      "bowls": [3,8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], // Spoke to Dutch and deleted extra bowl with his consent
      "expected": 65
    },
    {
      "bowls": ['A', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Perfect score should be 300
      "expected": 300 
    },
    {
      "bowls": [2,6,5,5,8,2,10,7,2,6,2,11,6,4,3,0,7,2], // This test case adds up correctly
      "expected": 127
    }
  ]
  
  games.forEach(function(game) {

    try {
    let score =  bowlingScore(game.bowls); /* fun(game.bowls) --> replace fun with your function call */
    assert.equal(score, game.expected);
    }
    catch (e) {
        console.log(e);
    }
  })
  
  
}
console.log(""); // Added new line for readability
test();
                
  
