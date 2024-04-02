const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];

let score = 0;
let questionIndex = 0;
let secondsLeft = 76;
let holdInterval = 0;
const penalty = 10;

const currentTime = document.querySelector("#currentTime");
const timer = document.querySelector("#startTime");
const questionsDiv = document.querySelector("#questionsDiv");

function renderQuestion() {
    const question = questions[questionIndex];
    questionsDiv.innerHTML = `<h2>${question.title}</h2>`;
    
    const choicesList = document.createElement("ul");
    question.choices.forEach(choice => {
        const listItem = document.createElement("li");
        const answerButton = document.createElement("button");
        answerButton.textContent = choice;
        answerButton.classList.add("answer-btn"); // Add class for answer buttons
        listItem.appendChild(answerButton);
        choicesList.appendChild(listItem);
        answerButton.addEventListener("click", () => compareAnswer(choice));
    });
    
    questionsDiv.appendChild(choicesList);
}

function startTimer() {
    timer.addEventListener("click", function () {
        if (holdInterval === 0) {
            holdInterval = setInterval(function () {
                secondsLeft--;
                currentTime.textContent = "Time: " + secondsLeft;

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    allDone();
                    currentTime.textContent = "Time's up!";
                }
            }, 1000);
        }
        renderQuestion();
    });
}

function compareAnswer(choice) {
    if (choice === questions[questionIndex].answer) {
        score++;
        renderQuestion();
    } else {
        secondsLeft -= penalty;
        if (secondsLeft < 0) secondsLeft = 0;
        renderQuestion();
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        clearInterval(holdInterval);
        allDone();
    }
}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    const createH1 = document.createElement("h1");
    createH1.textContent = "All Done!";
    questionsDiv.appendChild(createH1);

    const createP = document.createElement("p");
    createP.textContent = "Your final score is: " + secondsLeft;
    questionsDiv.appendChild(createP);

    const createLabel = document.createElement("label");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);

    const createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    questionsDiv.appendChild(createInput);

    const createSubmit = document.createElement("button");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        const initials = createInput.value.trim();
        if (initials !== "") {
            const finalScore = {
                initials: initials,
                score: secondsLeft
            };
            const allScores = JSON.parse(localStorage.getItem("allScores")) || [];
            allScores.push(finalScore);
            localStorage.setItem("allScores", JSON.stringify(allScores));
            window.location.href = "./HighScores.html";
        }
    });
}

function initQuiz() {
    startTimer();
}

initQuiz();

