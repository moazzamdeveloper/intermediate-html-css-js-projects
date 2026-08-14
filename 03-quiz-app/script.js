const questions = [
  {
    question: "What does 'DOM' stand for?",
    options: ["Document Object Model", "Data Object Model", "Digital Ordinance Model", "Document Oriented Module"],
    answer: 0
  },
  {
    question: "Which method is used to select an element by ID?",
    options: ["querySelector()", "getElementById()", "getElementsByClassName()", "getElementByTag()"],
    answer: 1
  },
  {
    question: "What is the correct way to declare a constant in ES6?",
    options: ["var x = 5", "let x = 5", "const x = 5", "constant x = 5"],
    answer: 2
  },
  {
    question: "Which array method creates a new array with elements that pass a test?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    answer: 2
  },
  {
    question: "What does localStorage store data as?",
    options: ["Objects", "Strings", "Numbers", "Booleans only"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const questionNumber = document.getElementById('question-number');
const timerEl = document.getElementById('timer');
const scoreText = document.getElementById('score-text');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', () => location.reload());

function startQuiz() {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
  questionText.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.classList.add('hidden');

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(index));
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(selected) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll('.option-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === selected) btn.classList.add('wrong');
  });

  if (selected === q.answer) score++;
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1); // auto fail
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}