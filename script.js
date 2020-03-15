
var countdownDisplay = document.getElementById("countdown");
var startButton = document.getElementById("start");
var displayQuestionEl = document.getElementById("title");
var gameTimer = 100;
var button1;
var button2;
var button3;
var button4;
var i=0;

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Which is not one of words JSON stands for?",
    choices: ["Java", "Script", "Jason", "Object"],
    answer: "Jason"
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
];


function timer() {
  var timerInterval = setInterval(function() {
    gameTimer--;
    countdownDisplay.textContent=gameTimer;
    if(gameTimer === 0)
    // or if there are no more questions 
    {
      clearInterval(timerInterval);
    //display score and show userInitial field.
    }
  }, 1000);
}

function displayQuest() {
  displayQuestionEl.textContent=questions[i].title;
}

function displayChoices() {
  button1.textContent = "1. "+questions[i].choices[0];
  button2.textContent = "2. "+questions[i].choices[1];
  button3.textContent = "3. "+questions[i].choices[2];
  button4.textContent = "4. "+questions[i].choices[3];
}

startButton.addEventListener("click",function() {
  event.preventDefault();
  countdownDisplay.textContent=gameTimer;
  timer();
  displayQuest();
  startButton.setAttribute("style","display:none");
  document.getElementById("text").setAttribute("style","display:none");

  button1 = document.createElement("button");
  button1.textContent = "1. "+questions[i].choices[0];
  button1.className = "button";
  document.body.append(button1);
  button2 = document.createElement("button");
  button2.textContent = "2. "+questions[i].choices[1];
  button2.className = "button";
  document.body.append(button2);
  button3 = document.createElement("button");
  button3.textContent = "3. "+questions[i].choices[2];
  button3.className = "button";
  document.body.append(button3);
  button4 = document.createElement("button");
  button4.textContent = "4. "+questions[i].choices[3];
  button4.className = "button";
  document.body.append(button4);
  console.log(document.querySelectorAll(".button"))
});

document.getElementByClass("button").addEventListener("click", clickAnswer);

function clickAnswer() {
  console.log("clicked an answer")
    event.preventDefault();
    if (event.target.textContent===questions[i].answer) {
          i++;
          displayQuest();
          displayChoices();
    }
    else{
          gameTimer-10;
    }
}

console.log(countdownDisplay);
console.log(questions[0].title);
console.log(startButton);
console.log(questions[1].answer);

function printScores() {

  var highscores = JSON.parse(window.localStorage.getItem("scores")) || [];


  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    var olEl = document.getElementById("scores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("scores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run function when page loads
printScores();
