const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "shark", correct:false},
            { text: "Bluw whale", correct:true},
            { text: "Elephant", correct:false},
            { text: "Giraffe", correct:false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri lanka", correct: false},
        ]
    },
    {
        question: "which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Austrila", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "which is the largest desert in the world?",
        answers: [
            { text: "kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startquiz(){
    currentQuestionIndex =0
    score =0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + " " + currentQuestion.question

    currentQuestion.answers.forEach( answer =>{
        const button = document.createElement("button");
        button.classList.add("btn")
        button.innerHTML = answer.text;
        answerButtons.appendChild(button)
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showscore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = " Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startquiz();
    }
})
startquiz();