const questions = [
  { question: "What is the capital of India?", options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"], correct: 0 },
  { question: "Who built the Taj Mahal?", options: ["Shah Jahan", "Akbar", "Babur", "Aurangzeb"], correct: 0 },
  { question: "Which city is known as the Pinkcity?", options: ["Mumbai", "Jaipur", "Kolkata", "Chennai"], correct: 1 },
  { question: "What is the National anthem of india?", options: ["Vande Matram", "Jan Gan Man", "AE mere watan", "Saraswati vandana"], correct: 1 },
  { question: "How many Union territories are there in India?", options: ["4", "6", "5", "7"], correct: 3},
  { question: "Who wrote 'Vande matram'?", options: ["Rabindra nath tagore", "Bankim chandra chaterjee", "Rajendra prasad", "Chandra shekhar azad"], correct: 1 },
  { question: "Which country is not a Neighbour of India?", options: ["China", "Pakistan", "Nepal", "New Zealand"], correct: 3 },
  { question: "How many colours are there in Indian flag?", options: ["4", "6", "5", "3"], correct: 3},
  { question: "Which state has the highest population in India?", options: ["Uttar Pradesh", "Delhi", "Maharashtra", "Andhra pradesh"], correct: 0},
  { question: "Who wrote 'Discovery of India'?", options: ["Dr-Rajendra Prasad", "Jawahar lal nehru", "Rabindra nath tagore", "B.R.Ambedkar"], correct: 1},
  { question: "Which IPL team has never won the winning title?", options: ["SRH", "CSK", "RCB", "MI"], correct: 2},
  { question: "When did India gain Independence?", options: ["1950", "1949", "1947", "2014"], correct: 2},
  { question: "Who is known as the Iron-man of india?", options: ["Bhagat singh", "Mahatma gandhi", "Subhash chandra bose", "Sardar vallabhbhai patel"], correct: 3},
  { question: "Which state is known as the ''Fruit bowl''of India?", options: ["Himachal pradesh", "Bengaluru", "Mumbai", "Kolkata"], correct: 0},
  { question: "Which Indian state has the smallest coastline?", options: ["Maharashtra", "Goa", "Tamilnadu", "Arunachal pradesh"], correct: 1},
  { question: "Who was the first person in India to recieve a nobel prize?", options: ["Rabindra nath tagore", "Bankim chandra chaterjee", "Rajendra prasad", "Chandra shekhar azad"], correct: 0},

  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 30;
  let timerInterval;
  let playerName = "";
  let answerSelected = false;
  let lifelinesUsed = { fiftyFifty: false, swapQuestion: false };
  
  // DOM Elements
  const welcomeContainer = document.getElementById("welcome-container");
  const quizContainer = document.getElementById("quiz-container");
  const leaderboardContainer = document.getElementById("leaderboard-container");
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options");
  const timerElement = document.getElementById("time-left");
  const nextBtn = document.getElementById("next-btn");
  const finalScore = document.getElementById("final-score");
  
  // Timer Function
  function startTimer() {
    timer = 30;
    timerElement.textContent = timer;
  
    timerInterval = setInterval(() => {
      timer--;
      timerElement.textContent = timer;
  
      if (timer <= 0) {
        clearInterval(timerInterval);
        nextQuestion();
      }
    }, 1000);
  }
  
  // Clear Timer
  function clearTimer() {
    clearInterval(timerInterval);
  }
  
  // Load Question
  function loadQuestion() {
    answerSelected = false; // Reset the flag
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsList.innerHTML = "";
  
    question.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => handleAnswer(index));
      optionsList.appendChild(li);
    });
  
    startTimer(); // Start the timer for the new question
  }
  
  // Handle Answer
  function handleAnswer(selectedIndex) {
    if (answerSelected) return;
    answerSelected = true;
    clearTimer();
  
    const question = questions[currentQuestionIndex];
    const optionElements = optionsList.children;
  
    for (let i = 0; i < optionElements.length; i++) {
      if (i === question.correct) {
        optionElements[i].classList.add("correct");
      } else {
        optionElements[i].classList.add("incorrect");
      }
    }
  
    if (selectedIndex === question.correct) {
      score++;
    }
  
    setTimeout(nextQuestion, 2000); // Automatically move to the next question after 2 seconds
  }
  
  // Move to Next Question
  function nextQuestion() {
    clearTimer();
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
    } else {
      loadQuestion();
    }
  }
  
  // Finish Quiz
  function finishQuiz() {
    clearTimer();
    quizContainer.classList.add("hidden");
    leaderboardContainer.classList.remove("hidden");
    finalScore.textContent = `${playerName}, your final score is: ${score}`;
  }
  
  // Start Quiz
  document.getElementById("start-btn").addEventListener("click", () => {
    playerName = document.getElementById("username").value;
    if (!playerName) return alert("Please enter your name!");
  
    welcomeContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  });
  
  // Lifeline: 50-50
  function useFiftyFifty() {
    if (lifelinesUsed.fiftyFifty) return alert("You already used this lifeline!");
  
    const question = questions[currentQuestionIndex];
    let incorrectOptions = [];
    question.options.forEach((option, index) => {
      if (index !== question.correct) incorrectOptions.push(index);
    });
  
    while (incorrectOptions.length > 2) {
      incorrectOptions.splice(Math.floor(Math.random() * incorrectOptions.length), 1);
    }
  
    const optionElements = optionsList.children;
    incorrectOptions.forEach((index) => {
      optionElements[index].style.visibility = "hidden";
    });
  
    lifelinesUsed.fiftyFifty = true;
  }
  
  document.getElementById("fifty-fifty-btn").addEventListener("click", useFiftyFifty);
  
  // Lifeline: Swap Question
  function swapQuestion() {
    if (lifelinesUsed.swapQuestion) return alert("You already used this lifeline!");
  
    lifelinesUsed.swapQuestion = true; // Mark as used
    clearTimer();
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
    } else {
      loadQuestion();
    }
  }
  
  document.getElementById("swap-btn").addEventListener("click", swapQuestion);
  
