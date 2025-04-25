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
let score = 0;

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
