const cardsArray = [
    '❤️', '❤️', '🍎', '🍎', '🐶', '🐶', '🍕', '🍕', '🌟', '🌟', '🚗', '🚗', '🌺', '🌺', '🎵', '🎵'
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timeLeft = 120; // 2 минути
let timerInterval;

// Шафлај ги картите
function shuffleCards() {
    cards = [...cardsArray];
    cards.sort(() => Math.random() - 0.5);  // Шафлај
}

// Додај ги картите на страната
function generateBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Преврти ја картата
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    const cardId = this.getAttribute('data-id');
    this.classList.add('flipped');
    this.textContent = cards[cardId];

    flippedCards.push({ card: this, id: cardId });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Проверка дали картите се совпаѓаат
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    
    if (cards[firstCard.id] === cards[secondCard.id]) {
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            clearInterval(timerInterval); // Стопирај го тајмерот
            setTimeout(() => alert("Честитки! Победивте!"), 500);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            firstCard.card.textContent = '';
            secondCard.card.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Времетраење
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Game Over! Времето истече.");
            resetGame();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById("timer").textContent = `Тиме: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
}

// Рестартирај ја играта
document.getElementById('restart-button').addEventListener('click', resetGame);

// Рестартирање на играта
function resetGame() {
    matchedPairs = 0;
    flippedCards = [];
    timeLeft = 120;  // Рестартирај времето на 2 минути
    clearInterval(timerInterval); // Престани го старото време
    startTimer(); // Почни нов тајмер
    shuffleCards();
    generateBoard();
}

// Почни ја играта
resetGame();

