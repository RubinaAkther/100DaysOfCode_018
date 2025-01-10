const questions = [
  {
    question: 'Which is the largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue Whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Rome', correct: false },
    ],
  },
  {
    question: 'Who wrote "Hamlet"?',
    answers: [
      { text: 'Mark Twain', correct: false },
      { text: 'William Shakespeare', correct: true },
      { text: 'Charles Dickens', correct: false },
      { text: 'Jane Austen', correct: false },
    ],
  },
  {
    question: 'What is the boiling point of water?',
    answers: [
      { text: '50°C', correct: false },
      { text: '100°C', correct: true },
      { text: '150°C', correct: false },
      { text: '200°C', correct: false },
    ],
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: false },
      { text: 'Jupiter', correct: true },
      { text: 'Saturn', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for gold?',
    answers: [
      { text: 'Go', correct: false },
      { text: 'Au', correct: true },
      { text: 'Ag', correct: false },
      { text: 'Pt', correct: false },
    ],
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Claude Monet', correct: false },
    ],
  },
  {
    question: 'What is the smallest unit of life?',
    answers: [
      { text: 'Tissue', correct: false },
      { text: 'Cell', correct: true },
      { text: 'Organ', correct: false },
      { text: 'Organism', correct: false },
    ],
  },
  {
    question: 'What is the currency of Japan?',
    answers: [
      { text: 'Dollar', correct: false },
      { text: 'Euro', correct: false },
      { text: 'Yen', correct: true },
      { text: 'Won', correct: false },
    ],
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    answers: [
      { text: 'Gold', correct: false },
      { text: 'Iron', correct: false },
      { text: 'Diamond', correct: true },
      { text: 'Platinum', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btn');
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
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Start Quiz Again';
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
