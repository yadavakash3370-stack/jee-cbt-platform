/* =========================================
   JEE CBT - MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   QUESTIONS
   ========================================= */

const questions = [

  {
    subject: "Physics",
    question:
      "A particle starts from rest and moves with constant acceleration. Its velocity after 5 seconds is 20 m/s. What is its acceleration?",

    options: [
      "2 m/s²",
      "4 m/s²",
      "5 m/s²",
      "10 m/s²"
    ],

    answer: 1
  },


  {
    subject: "Physics",
    question:
      "A body is moving with a velocity of 10 m/s. If its acceleration is 2 m/s², what will be its velocity after 5 seconds?",

    options: [
      "15 m/s",
      "20 m/s",
      "25 m/s",
      "30 m/s"
    ],

    answer: 1
  },


  {
    subject: "Physics",
    question:
      "The SI unit of force is:",

    options: [
      "Joule",
      "Watt",
      "Newton",
      "Pascal"
    ],

    answer: 2
  },


  {
    subject: "Chemistry",
    question:
      "The atomic number of carbon is:",

    options: [
      "4",
      "6",
      "8",
      "12"
    ],

    answer: 1
  },


  {
    subject: "Chemistry",
    question:
      "Which of the following is a noble gas?",

    options: [
      "Oxygen",
      "Nitrogen",
      "Chlorine",
      "Neon"
    ],

    answer: 3
  },


  {
    subject: "Chemistry",
    question:
      "The pH of a neutral solution at 25°C is:",

    options: [
      "0",
      "5",
      "7",
      "14"
    ],

    answer: 2
  },


  {
    subject: "Mathematics",
    question:
      "If x² = 25, then the possible values of x are:",

    options: [
      "5 only",
      "-5 only",
      "±5",
      "25"
    ],

    answer: 2
  },


  {
    subject: "Mathematics",
    question:
      "What is the derivative of x² with respect to x?",

    options: [
      "x",
      "2x",
      "x²",
      "2"
    ],

    answer: 1
  },


  {
    subject: "Mathematics",
    question:
      "The value of sin 90° is:",

    options: [
      "0",
      "1",
      "-1",
      "1/2"
    ],

    answer: 1
  },


  {
    subject: "Mathematics",
    question:
      "What is the value of 2³ × 2²?",

    options: [
      "16",
      "24",
      "32",
      "64"
    ],

    answer: 2
  }

];


/* =========================================
   VARIABLES
   ========================================= */

let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

let reviewQuestions = new Array(questions.length).fill(false);

let visitedQuestions = new Array(questions.length).fill(false);

let timeLeft = 30 * 60;

let timerInterval;


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(pageId) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });


  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (pageId === "cbt") {
    initializeCBT();
  }

}


/* =========================================
   START TEST
   ========================================= */

function startTest() {

  currentQuestion = 0;

  userAnswers = new Array(questions.length).fill(null);

  reviewQuestions = new Array(questions.length).fill(false);

  visitedQuestions = new Array(questions.length).fill(false);

  timeLeft = 30 * 60;


  showPage("cbt");

}


/* =========================================
   INITIALIZE CBT
   ========================================= */

function initializeCBT() {

  visitedQuestions[currentQuestion] = true;

  renderQuestion();

  renderPalette();

  updateAnsweredCount();

  startTimer();

}


/* =========================================
   RENDER QUESTION
   ========================================= */

function renderQuestion() {

  const q = questions[currentQuestion];

  const questionElement =
    document.getElementById("question");

  const questionNumber =
    document.getElementById("questionNumber");

  const questionLabel =
    document.getElementById("questionLabel");

  const optionsContainer =
    document.getElementById("options");


  if (!questionElement || !optionsContainer) {
    return;
  }


  questionElement.textContent = q.question;


  questionNumber.textContent =
    currentQuestion + 1;


  questionLabel.textContent =
    currentQuestion + 1;


  optionsContainer.innerHTML = "";


  q.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.className = "option";


    if (userAnswers[currentQuestion] === index) {
      button.classList.add("selected");
    }


    const key = document.createElement("span");

    key.className = "option-key";

    key.textContent =
      String.fromCharCode(65 + index);


    const text = document.createElement("span");

    text.textContent = option;


    button.appendChild(key);

    button.appendChild(text);


    button.onclick = function () {

      selectAnswer(index);

    };


    optionsContainer.appendChild(button);

  });


  renderPalette();

}


/* =========================================
   SELECT ANSWER
   ========================================= */

function selectAnswer(index) {

  userAnswers[currentQuestion] = index;

  visitedQuestions[currentQuestion] = true;

  renderQuestion();

  updateAnsweredCount();

}


/* =========================================
   CLEAR ANSWER
   ========================================= */

function clearAnswer() {

  userAnswers[currentQuestion] = null;

  renderQuestion();

  updateAnsweredCount();

}


/* =========================================
   MARK FOR REVIEW
   ========================================= */

function toggleReview() {

  reviewQuestions[currentQuestion] =
    !reviewQuestions[currentQuestion];


  renderPalette();

}


/* =========================================
   NEXT QUESTION
   ========================================= */

function nextQuestion() {

  if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    visitedQuestions[currentQuestion] = true;

    renderQuestion();

  } else {

    submitTest();

  }

}


/* =========================================
   PREVIOUS QUESTION
   ========================================= */

function previousQuestion() {

  if (currentQuestion > 0) {

    currentQuestion--;

    visitedQuestions[currentQuestion] = true;

    renderQuestion();

  }

}


/* =========================================
   QUESTION PALETTE
   ========================================= */

function renderPalette() {

  const palette =
    document.getElementById("palette");


  if (!palette) {
    return;
  }


  palette.innerHTML = "";


  questions.forEach((question, index) => {

    const button =
      document.createElement("button");


    button.className = "q-btn";


    button.textContent =
      index + 1;


    if (userAnswers[index] !== null) {

      button.classList.add("answered");

    }


    if (reviewQuestions[index]) {

      button.classList.add("review");

    }


    if (index === currentQuestion) {

      button.classList.add("current");

    }


    button.onclick = function () {

      currentQuestion = index;

      visitedQuestions[index] = true;

      renderQuestion();

    };


    palette.appendChild(button);

  });


}


/* =========================================
   ANSWERED COUNT
   ========================================= */

function updateAnsweredCount() {

  const answered =
    userAnswers.filter(
      answer => answer !== null
    ).length;


  const element =
    document.getElementById("answeredCount");


  if (element) {

    element.textContent =
      answered + " Answered";

  }

}


/* =========================================
   TIMER
   ========================================= */

function startTimer() {

  clearInterval(timerInterval);


  timerInterval = setInterval(() => {

    timeLeft--;


    if (timeLeft <= 0) {

      timeLeft = 0;

      clearInterval(timerInterval);

      submitTest();

    }


    updateTimer();

  }, 1000);


  updateTimer();

}


/* =========================================
   UPDATE TIMER DISPLAY
   ========================================= */

function updateTimer() {

  const timer =
    document.getElementById("timer");


  if (!timer) {
    return;
  }


  const minutes =
    Math.floor(timeLeft / 60);


  const seconds =
    timeLeft % 60;


  timer.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

}


/* =========================================
   SUBMIT TEST
   ========================================= */

function submitTest() {

  clearInterval(timerInterval);


  let correct = 0;

  let wrong = 0;

  let unattempted = 0;


  questions.forEach((question, index) => {

    if (userAnswers[index] === null) {

      unattempted++;

    }

    else if (
      userAnswers[index] === question.answer
    ) {

      correct++;

    }

    else {

      wrong++;

    }

  });


  /*
    JEE-style simplified scoring:

    Correct = +4
    Wrong   = -1
    Unattempted = 0
  */

  const score =
    (correct * 4) - wrong;


  document.getElementById("finalScore")
    .textContent = score;


  document.getElementById("correct")
    .textContent = correct;


  document.getElementById("wrong")
    .textContent = wrong;


  document.getElementById("unattempted")
    .textContent = unattempted;


  const modal =
    document.getElementById("resultModal");


  modal.classList.add("show");

}


/* =========================================
   CLOSE RESULT
   ========================================= */

function closeResult() {

  const modal =
    document.getElementById("resultModal");


  modal.classList.remove("show");

}


/* =========================================
   KEYBOARD SHORTCUTS
   ========================================= */

document.addEventListener("keydown", function(event) {

  /*
    1-4 = Select option
  */

  if (
    document.getElementById("cbt").classList.contains("active")
  ) {

    if (
      event.key >= "1" &&
      event.key <= "4"
    ) {

      const index =
        Number(event.key) - 1;


      if (
        questions[currentQuestion].options[index]
      ) {

        selectAnswer(index);

      }

    }


    /*
      Arrow Right = Next
    */

    if (event.key === "ArrowRight") {

      nextQuestion();

    }


    /*
      Arrow Left = Previous
    */

    if (event.key === "ArrowLeft") {

      previousQuestion();

    }

  }

});


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================= */

document.addEventListener("click", function(event) {

  const modal =
    document.getElementById("resultModal");


  if (
    event.target === modal
  ) {

    closeResult();

  }

});


/* =========================================
   INITIAL PAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

  showPage("home");

});
