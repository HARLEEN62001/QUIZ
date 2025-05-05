// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        
        starsContainer.appendChild(star);
    }
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random movement
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        // Random animation duration
        particle.style.setProperty('--duration', `${10 + Math.random() * 20}s`);
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createParticles();
    startQuiz();
});

// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correct: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the main component of the Sun?",
        options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
        correct: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["gold", "Silver", "Oxygen", "Osmium"],
        correct: 2
    }
];

<<<<<<< HEAD
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
=======
let currentQuiz = 0;

>>>>>>> ffaee96cf6c0894aadc83efb1cdf6d6c712d1f1f

// DOM Elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const resultModal = document.getElementById('result-modal');
const finalScoreElement = document.getElementById('final-score');

// Start the quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = score;
    showQuestion();
}

// Display current question
function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    nextButton.disabled = true;
    startTimer();
    updateProgressBar();
}

// Handle option selection
function selectOption(selectedIndex) {
    clearInterval(timer);
    const options = optionsContainer.children;
    const correctIndex = questions[currentQuestion].correct;
    
    for (let option of options) {
        option.disabled = true;
    }
<<<<<<< HEAD
    
    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[correctIndex].classList.add('correct');
    }
    
    nextButton.disabled = false;
}

// Start timer for current question
function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectOption(-1); // Time's up
        }
    }, 1000);
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show next question or end quiz
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Show final result
function showResult() {
    finalScoreElement.textContent = score;
    resultModal.style.display = 'flex';
}

// Restart quiz
function restartQuiz() {
    resultModal.style.display = 'none';
    startQuiz();
}

// Event Listeners
nextButton.addEventListener('click', nextQuestion); 
=======
  }
});


const questionsBank = {
  maths: [
    {
      question: "What is 8 × 7?",
      answers: [
        { text: "56", correct: true },
        { text: "64", correct: false },
        { text: "49", correct: false },
        { text: "42", correct: false }
      ]
    },
    {
      question: "What is the square root of 144?",
      answers: [
        { text: "11", correct: false },
        { text: "12", correct: true },
        { text: "14", correct: false },
        { text: "13", correct: false }
      ]
    },
    {
      question: "What is the value of π (pi) up to 2 decimal places?",
      answers: [
        { text: "3.14", correct: true },
        { text: "3.15", correct: false },
        { text: "3.13", correct: false },
        { text: "3.10", correct: false }
      ]
    }
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
        { text: "Venus", correct: false }
      ]
    },
    {
      question: "What is the chemical symbol for water?",
      answers: [
        { text: "O2", correct: false },
        { text: "CO2", correct: false },
        { text: "H2O", correct: true },
        { text: "HO", correct: false }
      ]
    },
    {
      question: "What part of the cell contains DNA?",
      answers: [
        { text: "Nucleus", correct: true },
        { text: "Mitochondria", correct: false },
        { text: "Cytoplasm", correct: false },
        { text: "Cell membrane", correct: false }
      ]
    }
  ]
};

const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("category") || "maths"; // default to maths

let questions = questionsBank[category.toLowerCase()] || [];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, correct) {
  if (correct) {
    button.style.backgroundColor = "#2ecc71";
    score++;
  } else {
    button.style.backgroundColor = "#e74c3c";
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (questions[currentQuestionIndex].answers.find(a => a.correct).text === btn.innerText) {
      btn.style.backgroundColor = "#2ecc71";
    }
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
>>>>>>> ffaee96cf6c0894aadc83efb1cdf6d6c712d1f1f
