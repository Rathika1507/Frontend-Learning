const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', () => {
    resultContainer.classList.add('hide');
    startGame();
});

function startGame() {
    startButton.classList.add('hide');
    resultContainer.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    setNextQuestion();
    updateScoreDisplay();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answer.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (correct) {
        quizScore++;
    }

    updateScoreDisplay();

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        showFinalResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('right-answers');
    if (scoreDisplay) {
        scoreDisplay.innerText = quizScore;
    }
}

function showFinalResult() {
    questionContainerElement.classList.add('hide');
    resultContainer.classList.remove('hide');
    finalScoreElement.innerText = `You got ${quizScore} out of ${shuffledQuestions.length} correct!`;
}

const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answer: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ],
    },
    {
        question: 'Who is the Prime Minister of India in 2025?',
        answer: [
            { text: 'Narendra Modi', correct: true },
            { text: 'Rahul Gandhi', correct: false },
        ],
    },
    {
        question: 'What is 4 * 3?',
        answer: [
            { text: '6', correct: false },
            { text: '12', correct: true },
        ],
    },
];
