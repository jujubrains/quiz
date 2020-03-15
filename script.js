var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var gameTimer = 100;
var timerId;
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

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  displayQuest();
}

function displayQuest() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function clickQuestion() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    end();
  } else {
    displayQuest();
  }
}

function end() {

  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function highscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {

    var scores =
      JSON.parse(window.localStorage.getItem("scores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    scores.push(newScore);
    window.localStorage.setItem("scores", JSON.stringify(scores));
    window.location.href = "scores.html";
  }
}

function scoreListener(event) {
  if (event.key === "Enter") {
    highscore();
  }
}
submitBtn.onclick = highscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = scoreListener;

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

printScores();
