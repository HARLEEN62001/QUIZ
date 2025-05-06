// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "London", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who wrote 'To be, or not to be'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        answer: 1
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        answer: 1
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        answer: 2
    },
    {
        question: "What is the main component of the Sun?",
        options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 30;
let timerInterval = null;

const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const questionDiv = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const resultModal = document.getElementById('result-modal');
const finalScoreSpan = document.getElementById('final-score');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreSpan.textContent = score;
    nextBtn.disabled = true;
    resultModal.style.display = 'none';
    updateProgressBar();
    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionDiv.textContent = q.question;
    optionsContainer.innerHTML = '';
    q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(idx);
        optionsContainer.appendChild(btn);
    });
    nextBtn.disabled = true;
}

function selectOption(selectedIdx) {
    const q = questions[currentQuestion];
    const optionButtons = optionsContainer.querySelectorAll('button');
    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
            btn.classList.add('correct');
        }
        if (idx === selectedIdx && idx !== q.answer) {
            btn.classList.add('incorrect');
        }
    });
    if (selectedIdx === q.answer) {
        score += 1;
        scoreSpan.textContent = score;
    }
    nextBtn.disabled = false;
    stopTimer();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        updateProgressBar();
        showQuestion();
        resetTimer();
        startTimer();
    } else {
        endQuiz();
    }
}

function updateProgressBar() {
    const percent = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = percent + '%';
}

function startTimer() {
    timer = 30;
    timerSpan.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerSpan.textContent = timer;
        if (timer <= 0) {
            stopTimer();
            selectOption(-1); // No answer selected
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timer = 30;
    timerSpan.textContent = timer;
}

function endQuiz() {
    stopTimer();
    progressBar.style.width = '100%';
    finalScoreSpan.textContent = score;
    resultModal.style.display = 'block';
}

function restartQuiz() {
    startQuiz();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
    nextBtn.addEventListener('click', nextQuestion);
    
    // Single event listener for restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
});
