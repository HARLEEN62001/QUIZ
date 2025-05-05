const quizData = [
  {
    question: "What is the capital of France?",
    a: "London",
    b: "Berlin",
    c: "Paris",
    d: "Madrid",
    correct: "c"
  },
  {
    question: "Who wrote 'Hamlet'?",
    a: "Shakespeare",
    b: "Charles Dickens",
    c: "J.K. Rowling",
    d: "Mark Twain",
    correct: "a"
  },
  {
    question: "Which is the largest planet?",
    a: "Earth",
    b: "Jupiter",
    c: "Mars",
    d: "Venus",
    correct: "b"
  }
];

let currentQuiz = 0;


const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const current = quizData[currentQuiz];
  questionEl.innerText = current.question;
  a_text.innerText = current.a;
  b_text.innerText = current.b;
  c_text.innerText = current.c;
  d_text.innerText = current.d;
}

function deselectAnswers() {
  answersEls.forEach(el => el.checked = false);
}

function getSelected() {
  let answer;
  answersEls.forEach(el => {
    if (el.checked) answer = el.id;
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
        <h2>You scored ${score}/${quizData.length} 🎉</h2>
        <button onclick="location.reload()">Play Again</button>
      `;
    }
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
