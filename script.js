// Partículas flutuantes
const canvas = document.getElementById("particles-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 50

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.3
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvas.width) this.x = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    if (this.y < 0) this.y = canvas.height
  }

  draw() {
    ctx.fillStyle = `rgba(211, 166, 37, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(animateParticles)
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

initParticles()
animateParticles()

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Quiz
const quizQuestions = [
  {
    question: "Quem fundou a Casa Grifinória?",
    answers: ["Godric Gryffindor", "Salazar Slytherin", "Rowena Ravenclaw", "Helga Hufflepuff"],
    correct: 0,
    explanation:
      "Godric Gryffindor foi um dos quatro fundadores de Hogwarts e criou a casa que leva seu nome, valorizando coragem e bravura.",
  },
  {
    question: "Qual é o fantasma da Grifinória?",
    answers: ["Barão Sangrento", "Frei Gorducho", "Nick Quase Sem Cabeça", "Dama Cinzenta"],
    correct: 2,
    explanation:
      "Sir Nicholas de Mimsy-Porpington, conhecido como Nick Quase Sem Cabeça, é o fantasma residente da Grifinória.",
  },
  {
    question: "Quais são as cores da Grifinória?",
    answers: ["Verde e prata", "Azul e bronze", "Amarelo e preto", "Vermelho e dourado"],
    correct: 3,
    explanation: "Vermelho escarlate e dourado são as cores oficiais da Grifinória, representando coragem e nobreza.",
  },
  {
    question: "Qual animal representa a Grifinória?",
    answers: ["Águia", "Texugo", "Leão", "Serpente"],
    correct: 2,
    explanation: "O leão é o símbolo da Grifinória, representando coragem, força e liderança.",
  },
  {
    question: "Quem é a chefe da Casa Grifinória durante a maior parte da saga?",
    answers: ["Minerva McGonagall", "Pomona Sprout", "Filius Flitwick", "Severus Snape"],
    correct: 0,
    explanation: "A Professora Minerva McGonagall é a chefe da Grifinória e professora de Transfiguração.",
  },
  {
    question: "Qual destes NÃO é um valor da Grifinória?",
    answers: ["Coragem", "Ambição", "Ousadia", "Cavalaria"],
    correct: 1,
    explanation: "Ambição é um valor da Sonserina. A Grifinória valoriza coragem, ousadia, cavalaria e determinação.",
  },
  {
    question: "Onde fica a sala comunal da Grifinória?",
    answers: ["Nas masmorras", "Em uma das torres", "No térreo", "Perto da cozinha"],
    correct: 1,
    explanation:
      "A sala comunal da Grifinória fica em uma das torres mais altas do castelo, acessível através do retrato da Mulher Gorda.",
  },
  {
    question: "Qual objeto mágico pertenceu a Godric Gryffindor?",
    answers: ["O Diadema", "A Taça", "A Espada", "O Medalhão"],
    correct: 2,
    explanation:
      "A Espada de Gryffindor é um artefato mágico que pertenceu ao fundador e só pode ser empunhada por um verdadeiro grifinório.",
  },
]

let currentQuestion = 0
let score = 0
let quizStarted = false

const startQuizBtn = document.getElementById("start-quiz-btn")
const quizIntro = document.getElementById("quiz-intro")
const quizContent = document.getElementById("quiz-content")
const quizResults = document.getElementById("quiz-results")
const questionCounter = document.getElementById("question-counter")
const progressFill = document.getElementById("progress-fill")
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const feedbackContainer = document.getElementById("feedback-container")
const feedbackContent = document.getElementById("feedback-content")
const nextQuestionBtn = document.getElementById("next-question-btn")
const finalScore = document.getElementById("final-score")
const resultsMessage = document.getElementById("results-message")
const restartQuizBtn = document.getElementById("restart-quiz-btn")

startQuizBtn.addEventListener("click", startQuiz)
nextQuestionBtn.addEventListener("click", nextQuestion)
restartQuizBtn.addEventListener("click", restartQuiz)

function startQuiz() {
  quizStarted = true
  currentQuestion = 0
  score = 0
  quizIntro.style.display = "none"
  quizContent.style.display = "block"
  loadQuestion()
}

function loadQuestion() {
  const question = quizQuestions[currentQuestion]

  questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`
  progressFill.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`
  questionText.textContent = question.question

  answersContainer.innerHTML = ""
  feedbackContainer.style.display = "none"

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button")
    button.className = "answer-btn"
    button.textContent = answer
    button.addEventListener("click", () => selectAnswer(index))
    answersContainer.appendChild(button)
  })
}

function selectAnswer(selectedIndex) {
  const question = quizQuestions[currentQuestion]
  const buttons = document.querySelectorAll(".answer-btn")

  buttons.forEach((button) => (button.disabled = true))

  if (selectedIndex === question.correct) {
    score++
    buttons[selectedIndex].classList.add("correct")
    feedbackContent.className = "feedback-content correct"
    feedbackContent.innerHTML = `
            <strong>✓ Correto!</strong><br><br>
            ${question.explanation}
        `
  } else {
    buttons[selectedIndex].classList.add("incorrect")
    buttons[question.correct].classList.add("correct")
    feedbackContent.className = "feedback-content incorrect"
    feedbackContent.innerHTML = `
            <strong>✗ Incorreto!</strong><br><br>
            A resposta correta é: <strong>${question.answers[question.correct]}</strong><br><br>
            ${question.explanation}
        `
  }

  feedbackContainer.style.display = "block"
}

function nextQuestion() {
  currentQuestion++

  if (currentQuestion < quizQuestions.length) {
    loadQuestion()
  } else {
    showResults()
  }
}

function showResults() {
  quizContent.style.display = "none"
  quizResults.style.display = "block"

  const percentage = (score / quizQuestions.length) * 100
  finalScore.textContent = `${score} / ${quizQuestions.length}`

  if (percentage === 100) {
    resultsMessage.textContent =
      "Perfeito! Você é um verdadeiro grifinório! Sua coragem e conhecimento são dignos da espada de Gryffindor!"
  } else if (percentage >= 75) {
    resultsMessage.textContent =
      "Excelente! Você demonstrou grande conhecimento sobre a Grifinória. A coragem corre em suas veias!"
  } else if (percentage >= 50) {
    resultsMessage.textContent =
      "Bom trabalho! Você conhece bem a Grifinória, mas ainda há mais para aprender sobre a casa mais corajosa!"
  } else {
    resultsMessage.textContent =
      "Você precisa estudar mais sobre a Grifinória! Releia os livros e assista aos filmes novamente!"
  }
}

function restartQuiz() {
  quizResults.style.display = "none"
  quizIntro.style.display = "block"
  currentQuestion = 0
  score = 0
}
