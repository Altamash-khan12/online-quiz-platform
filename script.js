// script.js

const questions = [
  { question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correct: 0 },
  { question: "Who built the Taj Mahal?", options: ["Shah Jahan", "Akbar", "Babur", "Aurangzeb"], correct: 0 },
  { question: "Which city is known as the Pinkcity?", options: ["Mumbai", "Jaipur", "Kolkata", "Chennai"], correct: 1 },
  { question: "What is the National anthem of india?", options: ["Vande Matram", "Jan Gan Man", "AE mere watan", "Saraswati vandana"], correct: 1 },
  { question: "How many Union territories are there in India?", options: ["4", "6", "5", "7"], correct: 3},
  { question: "Who wrote 'Vande matram'?", options: ["Rabindra nath tagore", "Bankim chandra chaterjee", "Rajendra prasad", "Chandra shekhar azad"], correct: 1 },
  { question: "Which country is not a Neighbour of India?", options: ["China", "Pakistan", "Nepal", "New Zealand"], correct: 3 },
  
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 30;
let timerInterval;
let playerName = "";

// DOM Elements
const welcomeContainer = document.getElementById("welcome-container");
const quizContainer = document.getElementById("quiz-container");
const leaderboardContainer = document.getElementById("leaderboard-container");

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const timerElement = document.getElementById("time-left");
const nextBtn = document.getElementById("next-btn");

// Timer Function
function startTimer() {
  timer = 30;
  timerElement.textContent = timer;
  timerInterval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      nextQuestion(); // Automatically move to the next question when time runs out
    }
  }, 1000);
}

// Clear Timer
function clearTimer() {
  clearInterval(timerInterval);
}

// Load Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => handleAnswer(index));
    optionsList.appendChild(li);
  });

  nextBtn.classList.add("hidden");
  startTimer(); // Start the timer when a new question is loaded
}

// Handle Answer
function handleAnswer(selectedIndex) {
  clearTimer(); // Stop the timer immediately upon selecting an answer
  const question = questions[currentQuestionIndex];
  const optionElements = optionsList.children;

  for (let i = 0; i < optionElements.length; i++) {
    if (i === question.correct) {
      optionElements[i].classList.add("correct"); // Highlight the correct answer
    } else {
      optionElements[i].classList.add("incorrect"); // Highlight incorrect answers
    }
  }

  if (selectedIndex === question.correct) {
    score++; // Increment score for correct answers
  }

  nextBtn.classList.remove("hidden"); // Show the "Next" button to proceed
}

// Move to Next Question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    finishQuiz(); // End the quiz if all questions are answered
  } else {
    loadQuestion(); // Load the next question
  }
}

// Finish Quiz
function finishQuiz() {
  clearTimer(); // Ensure the timer is stopped when the quiz ends
  quizContainer.classList.add("hidden");
  leaderboardContainer.classList.remove("hidden");
  document.getElementById("final-score").textContent = `Your Score: ${score}`;
}

// Start Quiz
document.getElementById("start-btn").addEventListener("click", () => {
  playerName = document.getElementById("username").value;
  if (!playerName) return alert("Please enter your name!");

  welcomeContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  loadQuestion();
});

// Next Button Listener
nextBtn.addEventListener("click", nextQuestion);
