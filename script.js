document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---

const homePage = document.getElementById('home-page');
    const quizSetup = document.getElementById('quiz-setup');
    const loading = document.getElementById('loading');
    const quizPlaying = document.getElementById('quiz-playing');
    const result = document.getElementById('result');
    const errorAlert = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    const goToSetupBtn = document.getElementById('go-to-setup-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const setupForm = document.getElementById('setup-form');
    const topicSelect = document.getElementById('topic');
    const difficultySelect = document.getElementById('difficulty');
    const countSelect = document.getElementById('count');
    const startQuizBtn = document.getElementById('start-quiz-btn');

    const progressBar = document.getElementById('progress-bar');
    const questionCounter = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const finishQuizBtn = document.getElementById('finish-quiz-btn');

    const resultIcon = document.getElementById('result-icon');
    const scorePercentage = document.getElementById('score-percentage');
    const scoreDetails = document.getElementById('score-details');
    const feedbackMessage = document.getElementById('feedback-message');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    // --- State Variables ---
    let currentQuizState = 'home'; // home, setup, loading, playing, result
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let isAnswered = false;
    let totalQuestions = 0;

    // --- Predefined Data ---
    const QuizTopics = ["General Knowledge", "Science", "Mathematics", "Geography", "History"];
    const mockQuestions = {
        "General Knowledge": {
            "Easy": [
                { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
                { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
                { question: "What color is the sky on a clear day?", options: ["Green", "Blue", "Red", "Yellow"], correctAnswer: "Blue" },
                { question: "How many days are in a week?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
                { question: "What sound does a cat make?", options: ["Woof", "Meow", "Oink", "Moo"], correctAnswer: "Meow" }
            ],
            "Medium": [
                { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Leo Tolstoy"], correctAnswer: "William Shakespeare" },
                { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], correctAnswer: "H2O" },
                { question: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Makalu", "Mount Everest"], correctAnswer: "Mount Everest" },
                { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
                { question: "What currency is used in Japan?", options: ["Dollar", "Euro", "Yen", "Won"], correctAnswer: "Yen" }
            ],
            "Hard": [
                 { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
                 { question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: "1945" },
                 { question: "What is the main component of the sun?", options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon"], correctAnswer: "Hydrogen" },
                 { question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"], correctAnswer: "Leonardo da Vinci" },
                 { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: "Nile" } // Often debated, but Nile is traditionally cited
            ]
        },
        "Science": {
           "Easy": [
                { question: "What do plants need to grow?", options: ["Sunlight & Water", "Rocks & Wind", "Sugar & Salt", "Moonlight & Soda"], correctAnswer: "Sunlight & Water" },
                { question: "How many legs does a spider have?", options: ["4", "6", "8", "10"], correctAnswer: "8" },
                { question: "What force pulls objects towards the Earth?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], correctAnswer: "Gravity" },
                { question: "What is the frozen form of water?", options: ["Steam", "Liquid", "Ice", "Gas"], correctAnswer: "Ice" },
                { question: "Which part of the body pumps blood?", options: ["Lungs", "Brain", "Stomach", "Heart"], correctAnswer: "Heart" }
            ],
            "Medium": [
                { question: "What gas do humans breathe out?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], correctAnswer: "Carbon Dioxide" },
                { question: "What is the center of an atom called?", options: ["Electron", "Proton", "Neutron", "Nucleus"], correctAnswer: "Nucleus" },
                { question: "What process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"], correctAnswer: "Photosynthesis" },
                { question: "What instrument is used to measure temperature?", options: ["Barometer", "Thermometer", "Anemometer", "Hygrometer"], correctAnswer: "Thermometer" },
                { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], correctAnswer: "Diamond" }
            ],
             "Hard": [
                { question: "What is the speed of light in a vacuum (approximate)?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "30,000 km/s"], correctAnswer: "300,000 km/s" },
                { question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Dyna Nucleic Acid", "Deoxyribo Nutrient Additive", "Double Nucleon Arrangement"], correctAnswer: "Deoxyribonucleic Acid" },
                { question: "What is the chemical formula for table salt?", options: ["H2O", "CO2", "NaCl", "C6H12O6"], correctAnswer: "NaCl" },
                { question: "Which law states that for every action, there is an equal and opposite reaction?", options: ["Law of Gravity", "Law of Thermodynamics", "Newton's Third Law", "Ohm's Law"], correctAnswer: "Newton's Third Law" },
                { question: "What type of star is our Sun?", options: ["Red Giant", "White Dwarf", "Blue Supergiant", "Yellow Dwarf (G-type main-sequence)"], correctAnswer: "Yellow Dwarf (G-type main-sequence)" }
             ]
        },
        // Add more topics and questions similarly...
        "Mathematics": {
           "Easy": [
               { question: "What is 5 x 3?", options: ["8", "15", "12", "2"], correctAnswer: "15" },
               { question: "What shape has 3 sides?", options: ["Square", "Circle", "Triangle", "Rectangle"], correctAnswer: "Triangle" },
               { question: "What is 10 - 4?", options: ["5", "6", "7", "14"], correctAnswer: "6" },
               { question: "How many sides does a square have?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
               { question: "Which number comes after 9?", options: ["8", "9", "10", "11"], correctAnswer: "10" }
           ],
           "Medium": [
                { question: "What is 72 / 8?", options: ["7", "8", "9", "10"], correctAnswer: "9" },
                { question: "If a train travels 60 miles in 1 hour, how far does it travel in 3 hours?", options: ["120 miles", "180 miles", "240 miles", "63 miles"], correctAnswer: "180 miles" },
                { question: "What is the perimeter of a square with side length 5cm?", options: ["10cm", "15cm", "20cm", "25cm"], correctAnswer: "20cm" },
                { question: "What is 1/2 + 1/4?", options: ["1/6", "2/6", "3/4", "1/8"], correctAnswer: "3/4" },
                { question: "What is 15% of 100?", options: ["10", "15", "20", "1.5"], correctAnswer: "15" }
           ],
            "Hard": [
                 { question: "Solve for x: 2x + 5 = 17", options: ["5", "6", "7", "11"], correctAnswer: "6" },
                 { question: "What is the area of a circle with radius 3? (Use π ≈ 3.14)", options: ["9.42", "18.84", "28.26", "3.14"], correctAnswer: "28.26" },
                 { question: "What is the Pythagorean theorem?", options: ["a²+b²=c²", "E=mc²", "F=ma", "PV=nRT"], correctAnswer: "a²+b²=c²" },
                 { question: "What is the next prime number after 13?", options: ["14", "15", "16", "17"], correctAnswer: "17" },
                 { question: "Simplify the expression: 3(x + 2) - 2x", options: ["x + 6", "5x + 6", "x + 2", "x - 6"], correctAnswer: "x + 6" }
            ]
        },
         "Geography": {
            "Easy": [
                { question: "Which is the largest continent?", options: ["Africa", "Asia", "North America", "Europe"], correctAnswer: "Asia" },
                { question: "What is the name of the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" },
                { question: "Which country is famous for the pyramids?", options: ["Greece", "Egypt", "Mexico", "Italy"], correctAnswer: "Egypt" },
                { question: "Is the North Pole hot or cold?", options: ["Hot", "Cold", "Warm", "Depends on season"], correctAnswer: "Cold" },
                { question: "What large body of water surrounds islands?", options: ["River", "Lake", "Ocean", "Pond"], correctAnswer: "Ocean" }
            ],
            "Medium": [
                 { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctAnswer: "Canberra" },
                 { question: "Which desert is the largest hot desert in the world?", options: ["Gobi", "Kalahari", "Sahara", "Arabian"], correctAnswer: "Sahara" },
                 { question: "Mount Fuji is located in which country?", options: ["China", "Korea", "Japan", "Vietnam"], correctAnswer: "Japan" },
                 { question: "Through which continent does the Amazon River primarily flow?", options: ["Africa", "Asia", "North America", "South America"], correctAnswer: "South America" },
                 { question: "What is the imaginary line dividing Earth into Northern and Southern Hemispheres?", options: ["Prime Meridian", "Equator", "Tropic of Cancer", "Arctic Circle"], correctAnswer: "Equator" }
            ],
             "Hard": [
                { question: "What is the highest waterfall in the world?", options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"], correctAnswer: "Angel Falls" },
                { question: "Which strait separates Asia from North America?", options: ["Strait of Gibraltar", "Bering Strait", "Strait of Malacca", "English Channel"], correctAnswer: "Bering Strait" },
                { question: "What is the term for a body of land completely surrounded by water?", options: ["Peninsula", "Isthmus", "Island", "Archipelago"], correctAnswer: "Island" },
                { question: "Which mountain range forms a natural border between France and Spain?", options: ["Alps", "Andes", "Pyrenees", "Himalayas"], correctAnswer: "Pyrenees" },
                { question: "What is Timbuktu?", options: ["A mountain", "A river", "A city in Mali", "A type of food"], correctAnswer: "A city in Mali" }
            ]
        },
         "History": {
            "Easy": [
                { question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], correctAnswer: "George Washington" },
                { question: "In what country did the Olympic Games originate?", options: ["Rome", "Egypt", "Greece", "China"], correctAnswer: "Greece" },
                { question: "What were the pyramids in Egypt built for?", options: ["Houses", "Temples", "Tombs for Pharaohs", "Markets"], correctAnswer: "Tombs for Pharaohs" },
                { question: "What invention is Thomas Edison most famous for (related to light)?", options: ["Telephone", "Radio", "Light Bulb", "Airplane"], correctAnswer: "Light Bulb" },
                { question: "Who discovered America in 1492?", options: ["Marco Polo", "Ferdinand Magellan", "Christopher Columbus", "Leif Erikson"], correctAnswer: "Christopher Columbus" }
            ],
            "Medium": [
                 { question: "Who was the leader of the Soviet Union during World War II?", options: ["Lenin", "Stalin", "Khrushchev", "Gorbachev"], correctAnswer: "Stalin" },
                 { question: "The Magna Carta was signed in which country?", options: ["France", "Germany", "England", "Spain"], correctAnswer: "England" },
                 { question: "What event started World War I?", options: ["Bombing of Pearl Harbor", "Invasion of Poland", "Assassination of Archduke Franz Ferdinand", "Boston Tea Party"], correctAnswer: "Assassination of Archduke Franz Ferdinand" },
                 { question: "Who led the Civil Rights Movement in the United States in the 1960s?", options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "Frederick Douglass"], correctAnswer: "Martin Luther King Jr." },
                 { question: "What ancient civilization built Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Roman"], correctAnswer: "Inca" }
            ],
             "Hard": [
                { question: "In what year did the Berlin Wall fall?", options: ["1987", "1989", "1991", "1993"], correctAnswer: "1989" },
                { question: "Who wrote 'The Communist Manifesto'?", options: ["Adam Smith", "Karl Marx & Friedrich Engels", "Vladimir Lenin", "John Locke"], correctAnswer: "Karl Marx & Friedrich Engels" },
                { question: "What was the name of the ship that carried the Pilgrims to America in 1620?", options: ["Santa Maria", "Mayflower", "Discovery", "Nina"], correctAnswer: "Mayflower" },
                { question: "The Battle of Waterloo marked the final defeat of which French leader?", options: ["Louis XVI", "Robespierre", "Napoleon Bonaparte", "Charlemagne"], correctAnswer: "Napoleon Bonaparte" },
                { question: "What ancient wonder was located in Alexandria, Egypt?", options: ["Hanging Gardens of Babylon", "Great Pyramid of Giza", "Lighthouse of Alexandria", "Colossus of Rhodes"], correctAnswer: "Lighthouse of Alexandria" }
            ]
        }
        // Add more extensive questions for all topic/difficulty combos
    };

    // --- Functions ---

    function showError(message) {
        errorText.textContent = message;
        errorAlert.style.display = 'block';
    }

    function hideError() {
        errorAlert.style.display = 'none';
    }

    function updateUI() {
        hideError();
        // Hide all sections first
        homePage.style.display = 'none';
        quizSetup.style.display = 'none';
        loading.style.display = 'none';
        quizPlaying.style.display = 'none';
        result.style.display = 'none';

        // Show the current section
        switch (currentQuizState) {
            case 'home':
                homePage.style.display = 'block';
                break;
            case 'setup':
                quizSetup.style.display = 'block';
                break;
            case 'loading':
                loading.style.display = 'block';
                break;
            case 'playing':
                quizPlaying.style.display = 'block';
                displayQuestion();
                break;
            case 'result':
                result.style.display = 'block';
                displayResult();
                break;
        }
    }

    function populateTopics() {
        QuizTopics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicSelect.appendChild(option);
        });
    }

    // Mock AI question generation
    function generateMockQuestions(topic, difficulty, count) {
        console.log(`Generating ${count} mock questions for ${topic} (${difficulty})`);
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const availableQuestions = mockQuestions[topic]?.[difficulty];
                if (!availableQuestions || availableQuestions.length === 0) {
                    console.error(`No mock questions found for ${topic} - ${difficulty}`);
                    reject(new Error(`Sorry, we don't have ${difficulty} questions for ${topic} right now.`));
                    return;
                }

                // Shuffle and select 'count' questions
                const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, count);

                if (selected.length < count) {
                     console.warn(`Requested ${count} questions, but only found ${selected.length} for ${topic} - ${difficulty}.`);
                     if (selected.length === 0) {
                         reject(new Error(`Could not find enough questions for your selection. Please try fewer questions or a different topic/difficulty.`));
                         return;
                     }
                }
                console.log("Generated questions:", selected);
                resolve(selected);

            }, 1000); // 1 second delay
        });
    }


    async function handleStartQuiz(event) {
        event.preventDefault();
        hideError();
        currentQuizState = 'loading';
        updateUI();
        startQuizBtn.disabled = true;
        startQuizBtn.textContent = 'Generating...';

        const topic = topicSelect.value;
        const difficulty = difficultySelect.value;
        const count = parseInt(countSelect.value, 10);

        try {
            // Replace with actual API call if backend exists
            // const generatedQuestions = await fetchQuizQuestions(topic, difficulty, count);
            const generatedQuestions = await generateMockQuestions(topic, difficulty, count);

            if (generatedQuestions && generatedQuestions.length > 0) {
                questions = generatedQuestions;
                totalQuestions = questions.length; // Update total questions based on actual received count
                currentQuestionIndex = 0;
                score = 0;
                selectedAnswer = null;
                isAnswered = false;
                currentQuizState = 'playing';
            } else {
                throw new Error("No questions were generated. Please try again.");
            }
        } catch (err) {
            console.error("Failed to generate quiz:", err);
            showError(err.message || "An unknown error occurred while generating the quiz.");
            currentQuizState = 'setup'; // Go back to setup on error
        } finally {
            startQuizBtn.disabled = false;
            startQuizBtn.textContent = 'Start Quiz';
            updateUI(); // Update UI regardless of success or failure
        }
    }

    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            currentQuizState = 'result';
            updateUI();
            return;
        }

        isAnswered = false;
        selectedAnswer = null;
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion || !currentQuestion.question || !Array.isArray(currentQuestion.options)) {
            console.error("Invalid question data:", currentQuestion);
            showError("Error loading the current question. Skipping or restarting might be needed.");
             // Option: Skip to next question or end quiz
             handleNextQuestion(); // Attempt to move to the next question
            return;
        }


        questionText.textContent = currentQuestion.question;
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

        // Update progress bar
        const progressPercent = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
        progressBar.style.width = `${progressPercent}%`;

        optionsContainer.innerHTML = ''; // Clear previous options
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('button', 'option-button');
            button.onclick = () => handleAnswerSelect(option, button);
            optionsContainer.appendChild(button);
        });

        submitAnswerBtn.disabled = true;
        submitAnswerBtn.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
        finishQuizBtn.style.display = 'none';
    }

    function handleAnswerSelect(answer, buttonElement) {
        if (isAnswered) return;

        selectedAnswer = answer;

        // Remove 'selected' from all buttons
        const allOptionButtons = optionsContainer.querySelectorAll('.option-button');
        allOptionButtons.forEach(btn => btn.classList.remove('selected'));

        // Add 'selected' to the clicked button
        buttonElement.classList.add('selected');
        submitAnswerBtn.disabled = false;
    }

    function handleSubmitAnswer() {
        if (!selectedAnswer || isAnswered) return;

        isAnswered = true;
        submitAnswerBtn.disabled = true; // Disable after submitting

        const currentQuestion = questions[currentQuestionIndex];
        const allOptionButtons = optionsContainer.querySelectorAll('.option-button');
        const correct = selectedAnswer === currentQuestion.correctAnswer;

        if (correct) {
            score++;
        }

        // Visual feedback
        allOptionButtons.forEach(btn => {
            btn.disabled = true; // Disable all options
             btn.classList.add('answered'); // General answered state
            const optionText = btn.textContent;
            if (optionText === currentQuestion.correctAnswer) {
                btn.classList.add('correct');
                btn.innerHTML += '<span class="icon"></span>'; // Add icon placeholder
            } else if (optionText === selectedAnswer && !correct) {
                btn.classList.add('incorrect');
                btn.innerHTML += '<span class="icon"></span>'; // Add icon placeholder
            } else {
                 btn.classList.add('disabled'); // Style non-selected, non-correct answers
            }
             btn.classList.remove('selected'); // Ensure selected style is removed
        });

         // Show next/finish button after a short delay
        setTimeout(() => {
             submitAnswerBtn.style.display = 'none';
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestionBtn.style.display = 'block';
            } else {
                finishQuizBtn.style.display = 'block';
            }
        }, 500); // Delay to allow user to see feedback
    }

     function handleNextQuestion() {
        currentQuestionIndex++;
         if (currentQuestionIndex < questions.length) {
            currentQuizState = 'playing'; // Ensure state is correct
            updateUI(); // This will call displayQuestion
        } else {
             handleFinishQuiz(); // Should not happen if finish button is used, but as a fallback
        }
    }

    function handleFinishQuiz() {
         currentQuizState = 'result';
         updateUI(); // This will call displayResult
    }


    function displayResult() {
        const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        let feedback = "";
        let icon = "🤔";
        let cssClass = "practice"; // Default class

        if (percentage >= 80) {
            feedback = "Excellent Work!";
            icon = "🏆";
            cssClass = "excellent";
        } else if (percentage >= 50) {
            feedback = "Good Job!";
            icon = "👍";
            cssClass = "good";
        } else {
            feedback = "Keep Practicing!";
            icon = "📚";
             cssClass = "practice";
        }

        scorePercentage.textContent = `${percentage}%`;
        scoreDetails.textContent = `You answered ${score} out of ${totalQuestions} questions correctly.`;
        feedbackMessage.textContent = feedback;
        resultIcon.textContent = icon; // Update icon

        // Apply dynamic class for styling
        scorePercentage.className = `score-percentage ${cssClass}`;
        feedbackMessage.className = `feedback-message ${cssClass}`;
        resultIcon.className = `result-icon ${cssClass}`;

    }

    function handleRestartQuiz() {
        // Reset state variables
        questions = [];
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        isAnswered = false;
        totalQuestions = 0;

        // Go back to setup screen
        currentQuizState = 'setup';
        updateUI();
    }

    // --- Event Listeners ---
    goToSetupBtn.addEventListener('click', () => {
        currentQuizState = 'setup';
        updateUI();
    });

    backToHomeBtn.addEventListener('click', () => {
        currentQuizState = 'home';
        updateUI();
    });

    setupForm.addEventListener('submit', handleStartQuiz);
    submitAnswerBtn.addEventListener('click', handleSubmitAnswer);
    nextQuestionBtn.addEventListener('click', handleNextQuestion);
    finishQuizBtn.addEventListener('click', handleFinishQuiz);
    restartQuizBtn.addEventListener('click', handleRestartQuiz);


    // --- Initialization ---
    populateTopics();
    updateUI(); // Show the initial state (home)
     
    });
