// Permite que um elemento seja solto em uma área de destino
function allowDrop(event) {
    event.preventDefault();
}

// Inicia o processo de arrastar, armazenando o ID do elemento arrastado
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Lida com o evento de soltar, movendo o elemento arrastado para a nova área de destino
function drop(event) {

    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const answer = document.getElementById(data);
    const dropzone = event.target;

    // Verifica se a área de destino é válida
    if (dropzone.classList.contains('dropzone')) {

        // Troca as respostas caso ja tenha uma
        if (dropzone.children.length > 0) {
            const existingAnswer = dropzone.children[0];
            const originalParent = answer.parentElement;

            // Move a resposta existente para o lugar que a nova resposta estava
            if (originalParent.classList.contains('dropzone')) {
                originalParent.appendChild(existingAnswer);
                originalParent.classList.remove('filled'); // Remove a classe filled da dropzone original, para que ele fique 60x e nao uma linha
            } else {
                document.querySelector('.alternativas').insertBefore(existingAnswer, document.getElementById('verificar'));
            }
        }
        // Adicionando a nova resposta a área
        dropzone.appendChild(answer);
        dropzone.classList.add('filled'); // Adiciona a classe filled à nova dropzone
    
    } else if (dropzone.classList.contains('answer')) {

        // Permite que a alternativa seja retirada ou modificada
        const originalParent = answer.parentElement;
        const targetParent = dropzone.parentElement;

        // Permitir a troca das resposta entre as opções
        originalParent.appendChild(dropzone);
        targetParent.appendChild(answer);
        originalParent.classList.add('filled'); // Adiciona a classe filled à dropzone original
        targetParent.classList.add('filled'); // Adiciona a classe filled à nova dropzone
    }

    // Verifica se a dropzone está vazia e remove a classe filled
    const dropzones = document.querySelectorAll('.dropzone');

    dropzones.forEach(dz => {

        if (dz.children.length === 0) {
            dz.classList.remove('filled');
        }
    });

    // Reposiciona o botão "Verificar" no final da lista de alternativas, tentativa de prevenir bug
    const alternativas = document.querySelector('.alternativas');
    alternativas.appendChild(document.getElementById('verificar'));
}

// Inicia o jogo, ocultando a introdução e exibindo a área de jogo
function startGame() {

    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
}

// Verifica as respostas do usuário e exibe os resultados
function verificarRespostas() {

    const correctAnswers = {
        q1: 'a4',
        q2: 'a3',
        q3: 'a2',
        q4: 'a1'
    };

    const questionTexts = {
        q1: 'A - Ah, se a maioria acha que é verdade, então deve mesmo ser verdade!',
        q2: 'B - Você viu aquela atriz famosa que fez propaganda daquele hidratante? Com certeza deve ser ótimo!',
        q3: 'C - Professora, por favor, preciso passar de ano! Eu não fui bem na prova aquele dia porque eu tive um pesadelo! Você já teve um pesadelo? Viu como é horrível?  Então! Eu preciso de nota, professora, por favor!',
        q4: 'D - Se você não concordar comigo eu vou te bater, ouviu bem?'
    };

    let score = 0;
    let resultContent = '';
    let allAnswered = true;

    // Verifica cada resposta e atualiza a pontuação e o conteúdo do resultado
    for (const [questionId, answerId] of Object.entries(correctAnswers)) {

        const question = document.getElementById(questionId);
        const dropzone = question.querySelector('.dropzone');
        const answer = dropzone.querySelector('.answer');
        const questionText = questionTexts[questionId];
        
        if (!answer) {
            allAnswered = false;
            dropzone.style.backgroundColor = 'lightcoral';
        } else if (answer.id === answerId) {
            score++;
            dropzone.style.backgroundColor = 'lightgreen';
            resultContent += `<p>${questionText} <br> <span style="color: green;">Correto! (${answer.textContent})</span></p>`;
        } else {
            dropzone.style.backgroundColor = 'lightcoral';
            const correctAnswer = document.getElementById(answerId).textContent;
            resultContent += `<p>${questionText} <br> <span style="color: red;">Incorreto. Resposta correta: ${correctAnswer}</span></p>`;
        }
    }

    if (!allAnswered) {

        alert('Por favor, arraste todas as respostas antes de verificar.');
        return;
    }

    // Exibe os resultados
    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result-content').innerHTML = resultContent;
}

// Reinicia o jogo, redefinindo todas as áreas e alternativas
function restartGame() {

    document.getElementById('result').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('intro').style.display = 'block';

    const dropzones = document.querySelectorAll('.dropzone');
    dropzones.forEach(dropzone => {
        dropzone.innerHTML = '';
        dropzone.style.backgroundColor = '#f0f0f0';
        dropzone.classList.remove('filled'); // Remove a classe filled ao reiniciar, para evitar que ja considere preenchida
    });

    const alternativas = document.querySelector('.alternativas');
    alternativas.innerHTML = `
        <h2>ALTERNATIVAS</h2>
        <div class="answer" draggable="true" id="a1" ondragstart="drag(event)" style="background-color: #ffcccc;">1 - Recurso à força.</div>
        <div class="answer" draggable="true" id="a2" ondragstart="drag(event)" style="background-color: #ccffcc;">2 - Argumento por apelo à piedade.</div>
        <div class="answer" draggable="true" id="a3" ondragstart="drag(event)" style="background-color: #ccccff;">3 - Recurso à autoridade.</div>
        <div class="answer" draggable="true" id="a4" ondragstart="drag(event)" style="background-color: #ffffcc;">4 - Argumento por apelo ao povo.</div>
        <button id="verificar" onclick="verificarRespostas()">VERIFICAR</button>
    `;
}

// Exibe os créditos do autor
function showCredits() {

    document.getElementById('credits-popup').style.display = 'flex';
}

function closeCredits() {
    
    document.getElementById('credits-popup').style.display = 'none';
}
