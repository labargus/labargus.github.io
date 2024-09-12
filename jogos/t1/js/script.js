// Vetor de perguntas do quiz
const questions = [

    {
        question: "Ah, se a maioria acha que é verdade, então deve mesmo ser verdade!",
        options: [
            { text: "Recurso à força", value: "1" },
            { text: "Argumento por apelo à piedade", value: "2" },
            { text: "Recurso à autoridade", value: "3" },
            { text: "Argumento por apelo ao povo", value: "4" }
        ],
        correct: "4",
        explanation: "Este é um exemplo de 'Argumento por apelo ao povo', onde a verdade de uma afirmação é baseada na crença da maioria."
    },
    {
        question: "Você viu aquela atriz famosa que fez propaganda daquele hidratante? Com certeza deve ser ótimo!",
        options: [
            { text: "Recurso à força", value: "1" },
            { text: "Argumento por apelo à piedade", value: "2" },
            { text: "Recurso à autoridade", value: "3" },
            { text: "Argumento por apelo ao povo", value: "4" }
        ],
        correct: "3",
        explanation: "Este é um exemplo de 'Recurso à autoridade', onde a qualidade de um produto é baseada na opinião de uma celebridade."
    },
    {
        question: "Professora, por favor, preciso passar de ano! Eu não fui bem na prova aquele dia porque eu tive um pesadelo! Você já teve um pesadelo? Viu como é horrível? Então! Eu preciso de nota, professora, por favor!",
        options: [
            { text: "Recurso à força", value: "1" },
            { text: "Argumento por apelo à piedade", value: "2" },
            { text: "Recurso à autoridade", value: "3" },
            { text: "Argumento por apelo ao povo", value: "4" }
        ],
        correct: "2",
        explanation: "Este é um exemplo de 'Argumento por apelo à piedade', onde se tenta ganhar um argumento apelando para a compaixão ou piedade."
    },
    {
        question: "Se você não concordar comigo eu vou te bater, ouviu bem?",
        options: [
            { text: "Recurso à força", value: "1" },
            { text: "Argumento por apelo à piedade", value: "2" },
            { text: "Recurso à autoridade", value: "3" },
            { text: "Argumento por apelo ao povo", value: "4" }
        ],
        correct: "1",
        explanation: "Este é um exemplo de 'Recurso à força', onde se usa ameaças ou força para ganhar um argumento."
    }
];

// Variáveis para controlar o estado do quiz
let currentQuestionIndex = 0; // Índice da pergunta atual
let score = 0; // Pontuação do usuário
const userAnswers = []; // Respostas do usuário

function startQuiz() {

    // Esconde a seção inicial e mostra a seção do quiz
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion(); // Mostra a primeira pergunta
}

// Função para mostrar a pergunta atual
function showQuestion() {

    const questionContainer = document.getElementById('question-container');
    const currentQuestion = questions[currentQuestionIndex];

    // Adiciona a pergunta e as opções de resposta ao contêiner
    questionContainer.innerHTML = `
        <p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
        ${currentQuestion.options.map(option => `
            <label><input type="radio" name="q${currentQuestionIndex}" value="${option.value}"> ${option.text}</label>
        `).join('')}
    `;
}

// Função para enviar a resposta do usuário
function submitAnswer() {

    const form = document.getElementById('quiz-form');
    const userAnswer = form.elements[`q${currentQuestionIndex}`].value;

    if (!userAnswer) {
        alert("Por favor, selecione uma resposta antes de enviar.");
        return;
    }

    userAnswers.push(userAnswer); // Armazena a resposta do usuário

    // Verifica se a resposta está correta e atualiza a pontuação
    if (userAnswer === questions[currentQuestionIndex].correct) {
        score++;
    }

    // Passa para a próxima pergunta
    currentQuestionIndex++; 

    // Verifica se há mais perguntas ou mostra a página de resultados
    if (currentQuestionIndex < questions.length) {

        showQuestion();
    } else {
        showResultPage();
    }
}

// Função para mostrar a página de resultados
function showResultPage() {

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    const resultDiv = document.getElementById('result');
    
    // Adiciona os resultados ao contêiner de resultados
    resultDiv.innerHTML = `
        <p>Você acertou ${score} de ${questions.length} questões.</p>
        ${questions.map((question, index) => `
            <div class="question-result">
                <p>${index + 1}. ${question.question}</p>
                <p class="${userAnswers[index] === question.correct ? 'correct' : 'incorrect'}">
                    Sua resposta: ${question.options.find(option => option.value === userAnswers[index]).text}
                </p>
                ${userAnswers[index] !== question.correct ? `
                    <p class="correct">
                        Resposta correta: ${question.options.find(option => option.value === question.correct).text}
                    </p>
                    <p class="explanation">${question.explanation}</p>
                ` : ''}
            </div>
        `).join('')}
    `;
}

// Função para reiniciar o quiz
function retryQuiz() {
    currentQuestionIndex = 0; // Reinicia o índice da pergunta
    score = 0; // Reinicia a pontuação
    userAnswers.length = 0; // Limpa as respostas do usuário
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Mostra a primeira pergunta ao carregar a página
showQuestion();
