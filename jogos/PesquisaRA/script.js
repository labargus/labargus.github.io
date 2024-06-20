document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "What's your name?", type: "text" },
        { question: "How old are you?", type: "number" },
        { question: "What's your favorite color?", type: "text" }
    ];

    let currentQuestionIndex = 0;
    const answers = [];

    const surveyContainer = document.getElementById('survey-container');
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    function renderQuestion(index) {
        surveyContainer.innerHTML = `
            <div class="question active">
                <h2 class="title">${questions[index].question}</h2>
                <input class="input" type="${questions[index].type}" value="${answers[index] || ''}">
            </div>
        `;

        backButton.style.display = index === 0 ? 'none' : 'inline-block';
    }

    function nextQuestion() {
        const input = surveyContainer.querySelector('input');
        answers[currentQuestionIndex] = input.value;

        const currentQuestion = surveyContainer.querySelector('.question');
        currentQuestion.classList.remove('active');
        currentQuestion.classList.add('outgoing');

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                renderQuestion(currentQuestionIndex);
            } else {
                surveyContainer.innerHTML = '<h2 class="title">Thank you for completing the survey!</h2>';
                nextButton.style.display = 'none';
                backButton.style.display = 'none';
            }
        }, 500);
    }

    function previousQuestion() {
        const input = surveyContainer.querySelector('input');
        answers[currentQuestionIndex] = input.value;

        const currentQuestion = surveyContainer.querySelector('.question');
        currentQuestion.classList.remove('active');
        currentQuestion.classList.add('outgoing');

        setTimeout(() => {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex);
        }, 500);
    }

    nextButton.addEventListener('click', nextQuestion);
    backButton.addEventListener('click', previousQuestion);

    // Render the first question
    renderQuestion(currentQuestionIndex);
});
