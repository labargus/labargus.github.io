function startGame() {
    document.getElementById('initial-screen').classList.remove('active');
    document.getElementById('tutorial-screen').classList.add('active');
    document.getElementById('tutorial-screen').focus();
    document.querySelector('.footerCredito').classList.remove('active');
}

function continueToGame() {
    document.getElementById('tutorial-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('jumpTutBt').focus();
}

function showCredits() {
    alert('Credits: Game developed by Your Name');
}