"use strict";

// Get elements
const bodyEl = document.body;
const answerBoxEl = document.querySelector(".answer-box");
const numberInputEl = document.querySelector(".number-input");
const checkAnswerEl = document.querySelector(".check-answer");
const hintEl = document.querySelector(".hint");
const playAgainEl = document.querySelector(".play-again");
const feedbackEl = document.querySelector(".feedback");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// Define a function to get a secrect number
const getSecrectNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// Define a function to display/hide check answer, hint, and play again buttons
const displayButtons = function (checkAnswer, hint, playAgain) {
  checkAnswerEl.style.display = checkAnswer;
  hintEl.style.display = hint;
  playAgainEl.style.display = playAgain;
};

// Define a function to change the text content of an element
const changeTextContent = function (element, text) {
  element.textContent = text;
};

// Define a function to close the hint modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Get a random number between 1 and 100 (inclusive)
let answer = getSecrectNumber(1, 101);

// Initialize score and highscore
let score = 100;
let highscore = 0;
playAgainEl.style.display = "none";

// Implement the check button
checkAnswerEl.addEventListener("click", function () {
  // Get number provided by player
  const guess = Number(numberInputEl.value);

  // No number is provided
  if (!guess) {
    changeTextContent(feedbackEl, "🚫 No number!");

    // Number out of range is provided
  } else if (guess < 1 || guess > 100) {
    changeTextContent(feedbackEl, "❌ Invalid number");

    // Valid number, but not correct
  } else if (guess !== answer) {
    changeTextContent(
      feedbackEl,
      guess < answer ? "📉 Too low!" : "📈 Too high!"
    );

    // Deduct score if score > 1
    if (score > 1) {
      score--;
      changeTextContent(scoreEl, score);

      // Lose game
    } else {
      changeTextContent(feedbackEl, "😞 You lost the game");
      changeTextContent(scoreEl, 0);
      displayButtons("none", "none", "inline-block");
    }

    // Player provided the correct number
  } else {
    bodyEl.style.backgroundColor = "#60b347";
    changeTextContent(answerBoxEl, answer);
    displayButtons("none", "none", "inline-block");
    changeTextContent(feedbackEl, "🎉 Correct Number");

    // Update highscore
    if (score > highscore) {
      highscore = score;
      changeTextContent(highscoreEl, highscore);
    }
  }
});

// Implement play again button
playAgainEl.addEventListener("click", function () {
  answer = getSecrectNumber(1, 101);
  score = 100;
  bodyEl.style.backgroundColor = "#222";
  changeTextContent(answerBoxEl, "?");
  numberInputEl.value = "";
  displayButtons("inline-block", "inline-block", "none");
  changeTextContent(feedbackEl, "Start guessing...");
  changeTextContent(scoreEl, "100");
});

// Show hint modal
hintEl.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// Close hint modal
btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
