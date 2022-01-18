"use strict";

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const deductScore = function () {
  return Number(scoreSelector.textContent) - 1;
};

let answer = getRandomInt(1, 101);
const bodySelector = document.body;
const answerBoxSelector = document.querySelector(".answer-box");
const numberInputSelector = document.querySelector(".number-input");
const checkAnswerSelector = document.querySelector(".check-answer");
const hintSelector = document.querySelector(".hint");
const playAgainSelector = document.querySelector(".play-again");
const feedbackSelector = document.querySelector(".feedback");
const scoreSelector = document.querySelector(".score");
const highScoreSelector = document.querySelector(".highscore");

playAgainSelector.style.display = "none";

let guess;
checkAnswerSelector.addEventListener("click", function () {
  guess = Number(numberInputSelector.value);
  if (guess < 1 || guess > 1000) {
    feedbackSelector.textContent = "Invalid number";
    scoreSelector.textContent = deductScore();
  } else if (guess < answer) {
    feedbackSelector.textContent = "Too low!";
    scoreSelector.textContent = deductScore();
  } else if (guess > answer) {
    feedbackSelector.textContent = "Too high!";
    scoreSelector.textContent = deductScore();
  } else {
    bodySelector.style.backgroundColor = "#60b347";
    answerBoxSelector.textContent = answer;
    checkAnswerSelector.style.display = "none";
    hintSelector.style.display = "none";
    playAgainSelector.style.display = "inline-block";
    feedbackSelector.textContent = "Correct Number";
    if (
      Number(scoreSelector.textContent) > Number(highScoreSelector.textContent)
    ) {
      highScoreSelector.textContent = Number(scoreSelector.textContent);
    }
  }
});

playAgainSelector.addEventListener("click", function () {
  answer = getRandomInt(1, 101);
  bodySelector.style.backgroundColor = "#222";
  answerBoxSelector.textContent = "?";
  numberInputSelector.value = "";
  checkAnswerSelector.style.display = "inline-block";
  hintSelector.style.display = "inline-block";
  playAgainSelector.style.display = "none";
  feedbackSelector.textContent = "Start guessing...";
  scoreSelector.textContent = "100";
});
