const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: [
        { text: "Van Gogh", correct: false },
        { text: "Da Vinci", correct: true },
        { text: "Picasso", correct: false },
        { text: "Michelangelo", correct: false }
      ]
    }
  ];
  
  const questionElement = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      const li = document.createElement('li');
      li.appendChild(button);
      answerButtons.appendChild(li);
    });
  }
  
  function resetState() {
    nextButton.style.display = 'none';
    answerButtons.innerHTML = '';
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === 'true';
  
    if (correct) {
      selectedBtn.classList.add('correct');
      score++;
    } else {
      selectedBtn.classList.add('wrong');
    }
  
    Array.from(answerButtons.children).forEach(li => {
      const btn = li.firstChild;
      if (btn.dataset.correct === 'true') {
        btn.classList.add('correct');
      }
      btn.disabled = true;
    });
  
    nextButton.style.display = 'block';
  }
  
  function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = 'Play Again';
    nextButton.style.display = 'block';
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();