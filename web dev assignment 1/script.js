const quizData = [
    {
        question: "What is the name of the main character in GTA Vice City?",
        choices: ["Tommy Vercetti", "Carl Johnson", "Niko Bellic", "Claude Speed"],
        answer: "Tommy Vercetti"
    },
    {
        question: "Which year was GTA Vice City released?",
        choices: ["2001", "2002", "2003", "2004"],
        answer: "2002"
    },
    {
        question: "Which fictional city is Vice City based on?",
        choices: ["Los Santos", "Liberty City", "Las Venturas", "Miami"],
        answer: "Miami"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    currentQuestion.choices.forEach(choice => {
        const choiceElement = document.createElement('div');
        choiceElement.textContent = choice;
        choiceElement.className = 'choice';
        choiceElement.onclick = () => selectChoice(choiceElement, choice);
        choicesContainer.appendChild(choiceElement);
    });
}

function selectChoice(choiceElement, choice) {
    const choicesContainer = document.getElementById('choices');
    for (let i = 0; i < choicesContainer.children.length; i++) {
        choicesContainer.children[i].style.backgroundColor = '#f0f0f0';
    }
    choiceElement.style.backgroundColor = '#d0d0d0';
    choiceElement.dataset.selected = 'true';
}

function submitAnswer() {
    const selectedChoiceElement = document.querySelector('.choice[data-selected="true"]');
    if (!selectedChoiceElement) {
        alert('Please select an answer!');
        return;
    }

    const selectedChoice = selectedChoiceElement.textContent;
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedChoice === currentQuestion.answer) {
        score++;
        document.getElementById('feedback').textContent = 'Correct!';
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').textContent = `Wrong! The correct answer is: ${currentQuestion.answer}`;
        document.getElementById('feedback').style.color = 'red';
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(() => {
            document.getElementById('feedback').textContent = '';
            loadQuestion();
        }, 2000);
    } else {
        setTimeout(() => {
            showFinalScore();
        }, 2000);
    }
}

function showFinalScore() {
    document.getElementById('quiz-container').innerHTML = `<p>Your final score is ${score} out of ${quizData.length}.</p>`;
}


window.onload = loadQuestion;
