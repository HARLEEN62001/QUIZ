const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('time');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const scoreDisplay = document.getElementById('score-display');
const explanationEl = document.getElementById('explanation');
const categorySelector = document.getElementById('category');
const difficultySelector = document.getElementById('difficulty');

let filteredQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let answered = false;

function startQuiz() {
  score = 0;
  currentIndex = 0;
  filterQuestions();
  showQuestion();
}

function filterQuestions() {
  const category = categorySelector.value;
  const difficulty = difficultySelector.value;

  filteredQuestions = questions.filter(q =>
    (category === 'all' || q.category === category) &&
    (difficulty === 'all' || q.difficulty === difficulty)
  );

  if (filteredQuestions.length === 0) {
    questionEl.textContent = "No questions found for this filter.";
    answersEl.innerHTML = "";
    explanationEl.classList.remove('visible');
  }
}

function showQuestion() {
  clearTimer();
  resetState();
  const q = filteredQuestions[currentIndex];
  if (!q) return;

  questionEl.textContent = q.question;
  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.classList.add('answer-btn');
    btn.addEventListener('click', () => selectAnswer(btn, answer.correct, q.explanation));
    answersEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(button, isCorrect, explanation) {
  if (answered) return;
  answered = true;

  Array.from(answersEl.children).forEach(btn => btn.disabled = true);

  if (isCorrect) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('wrong');
  }

  explanationEl.textContent = explanation;
  explanationEl.classList.add('visible');
}

function showNextQuestion() {
  if (currentIndex < filteredQuestions.length - 1) {
    currentIndex++;
    showQuestion();
  }
}

function showPreviousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

function showResult() {
  clearTimer();
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = "";
  explanationEl.classList.remove('visible');
  scoreDisplay.classList.remove('hidden');
  document.getElementById('score').textContent = `${score} / ${filteredQuestions.length}`;
}

function resetState() {
  answered = false;
  answersEl.innerHTML = '';
  explanationEl.classList.remove('visible');
}

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearTimer();
      autoFail();
    }
  }, 1000);
}

function clearTimer() {
  if (timer) clearInterval(timer);
}

function autoFail() {
  Array.from(answersEl.children).forEach(btn => btn.disabled = true);
  explanationEl.textContent = "⏰ Time’s up!";
  explanationEl.classList.add('visible');
  answered = true;
}

categorySelector.addEventListener('change', () => {
  filterQuestions();
  currentIndex = 0;
  showQuestion();
});

difficultySelector.addEventListener('change', () => {
  filterQuestions();
  currentIndex = 0;
  showQuestion();
});

nextBtn.addEventListener('click', showNextQuestion);
prevBtn.addEventListener('click', showPreviousQuestion);
submitBtn.addEventListener('click', showResult);

// Initialize quiz on page load
window.addEventListener('DOMContentLoaded', startQuiz);
