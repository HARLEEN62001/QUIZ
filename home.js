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
  explanationEl.textContent = "⏰ Time's up!";
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

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#e96d71'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#e96d71',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Animate statistics numbers
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    function slide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        slider.scrollTo({
            left: testimonials[currentIndex].offsetLeft,
            behavior: 'smooth'
        });
    }
    
    // Auto slide every 5 seconds
    setInterval(slide, 5000);
}

// Smooth scroll for category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!card.classList.contains('coming-soon')) {
            e.preventDefault();
            const target = card.getAttribute('href');
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        }
    });
});

// Add hover effect to start button
const startButton = document.querySelector('.start-button');
startButton.addEventListener('mouseover', () => {
    startButton.style.transform = 'translateY(-3px)';
    startButton.style.boxShadow = '0 5px 20px rgba(233, 109, 113, 0.4)';
});

startButton.addEventListener('mouseout', () => {
    startButton.style.transform = 'translateY(0)';
    startButton.style.boxShadow = 'none';
});

// Initialize animations when page loads
window.addEventListener('load', () => {
    animateNumbers();
    initTestimonialSlider();
    
    // Add fade-in animation to elements
    document.querySelectorAll('.welcome-card > *').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Initialize animal positions
    randomizeAnimalPositions();
    
    // Add hover effect to animals
    document.querySelectorAll('.animal').forEach(animal => {
        animal.style.cursor = 'pointer';
    });
});

// Animal interaction
document.querySelectorAll('.animal').forEach(animal => {
    animal.addEventListener('mouseover', () => {
        animal.style.transform = 'scale(1.2)';
        animal.style.transition = 'transform 0.3s ease';
    });

    animal.addEventListener('mouseout', () => {
        animal.style.transform = 'scale(1)';
    });
});

// Random movement for animals
function randomizeAnimalPositions() {
    const animals = document.querySelectorAll('.animal');
    animals.forEach(animal => {
        const randomX = Math.random() * (window.innerWidth - 100);
        const randomY = Math.random() * (window.innerHeight - 100);
        animal.style.left = `${randomX}px`;
        animal.style.top = `${randomY}px`;
    });
}

// Call randomizeAnimalPositions every 30 seconds
setInterval(randomizeAnimalPositions, 30000);

// DOM Elements
const homeWrapper = document.querySelector('.home-wrapper');
const features = document.querySelectorAll('.feature');
const startBtn = document.querySelector('.start-btn');
const animals = document.querySelectorAll('.animal');
const bubbles = document.querySelectorAll('.floating-bubble');

// Initialize animations
function initAnimations() {
    // Add entrance animation to home wrapper
    homeWrapper.style.opacity = '0';
    homeWrapper.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        homeWrapper.style.transition = 'all 0.8s ease';
        homeWrapper.style.opacity = '1';
        homeWrapper.style.transform = 'translateY(0)';
    }, 100);

    // Animate features with delay
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });

    // Add hover effect to start button
    startBtn.addEventListener('mouseenter', () => {
        startBtn.style.transform = 'translateY(-5px) scale(1.05)';
    });

    startBtn.addEventListener('mouseleave', () => {
        startBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Parallax effect for animals
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        animals.forEach((animal, index) => {
            const speed = 0.1 + (index * 0.05);
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            animal.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Animate bubbles
function animateBubbles() {
    bubbles.forEach((bubble, index) => {
        const duration = 15 + (index * 5);
        const delay = index * 2;
        
        bubble.style.animation = `floatBubble ${duration}s infinite linear ${delay}s`;
    });
}

// Add click effect to features
features.forEach(feature => {
    feature.addEventListener('click', () => {
        feature.style.transform = 'scale(0.95)';
        setTimeout(() => {
            feature.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add confetti effect when clicking start button
function createConfetti() {
    const colors = ['#a8edea', '#fed6e3', '#ffd3b6', '#ffaaa5'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createConfetti();
    setTimeout(() => {
        window.location.href = 'quiz.html';
    }, 1000);
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initParallax();
    animateBubbles();
});
