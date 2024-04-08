const Questions = [{
    question: "What year was the United Nations established?",
    answers: [
        { text: "1946", correct: false },
        { text: "1945", correct: true },
        { text: "1947", correct: false },
        { text: "1950", correct: false }
    ]
}, {
    question: "What is the chemical symbol for Gold?",
    answers: [
        { text: "Gd", correct: false },
        { text: "Au", correct: true },
        { text: "Ag", correct: false },
        { text: "Ca", correct: false }
    ]
}, {
    question: "In what country is the Chernobyl nuclear plant located?",
    answers: [
        { text: "Germany", correct: false },
        { text: "Russia", correct: false },
        { text: "Finland", correct: false },
        { text: "Ukraine", correct: true }
    ]
}, {
    question: "Which planet has the most moons?",
    answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: true },
        { text: "Mars", correct: false }
    ]
}, {
    question: "What country has won the most World Cups?",
    answers: [
        { text: "Brazil", correct: true },
        { text: "Uruguay", correct: false },
        { text: "Argentina", correct: false },
        { text: "Spain", correct: false }
    ]
}];

// DOM elements
const quesElement = document.getElementById("question");
const ansElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const btns = document.getElementById("btns")
let startIndex = 0;
let questionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to display a question and options
function showQuestion() {
    ansElement.innerHTML = "";
    let currQuestion = Questions[questionIndex];
    questionNumber = questionIndex + 1;
    quesElement.innerHTML = questionNumber + "." + Questions[questionIndex].question;
    currQuestion.answers.forEach(function(answer) {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansElement.append(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Function to handle user's answer selection
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    const answerButtons = ansElement.querySelectorAll(".btn");
    answerButtons.forEach(function(button) {
        button.disabled = true;
    });
}

// Function to show final score
function showScore(){
    ansElement.innerHTML="";
    quesElement.innerHTML=`You scored ${score} out of 5`;
    const button = document.createElement("button");
        button.innerHTML = "Exit";
        button.classList.add("exit-btn");
    btns.appendChild(button);

    button.addEventListener("click",exitPage);
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

function startPage(){
    quesElement.innerHTML = "Welcome , Let's Begin !!";
    ansElement.innerHTML =""
    nextButton.innerHTML = "Next"
}

// Function to handle the Next button
function handleNextButton(){
    if(startIndex != 0){
        questionIndex++;
        if(questionIndex < Questions.length){
            showQuestion();
        }
        else{
            showScore();
        }
    }
    else{
        startIndex++;
        showQuestion();
    }
    
}
function exitPage(){
    quesElement.innerHTML = "Thanks for Playing";
    ansElement.innerHTML="";
    nextButton.innerHTML="";
    btns.innerHTML=""
}
// Event listener for Next button
nextButton.addEventListener("click", function() {
    if(questionIndex < Questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
    
});

// Start the quiz
startPage();
