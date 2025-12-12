
const memoryGame = document.getElementById('memory-game');

const movesCountElement = document.getElementById('moves-count');

const restartButton = document.getElementById('restart-button');

let cardsArray = []; 
const numPairs = 24;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesFound = 0; 
let moves = 0; 


const cardImages = [
    "img/img1.jpg",
    "img/img1.png",
    "img/img2.jpg",
    "img/img2.png",
    "img/img3.jpg",
    "img/img3.png",
    "img/img4.jpg",
    "img/img4.png",
    "img/img5.jpg",
    "img/img5.png",
    "img/img6.jpg",
    "img/img6.png",
         
];

function initializeGame() {
    cardsArray = []; 
    matchesFound = 0; 
    moves = 0;
    movesCountElement.textContent = moves; 
    memoryGame.innerHTML = ''; 


    for (let i = 0; i < numPairs; i++) {
        cardsArray.push({ id: i, image: cardImages[i] }); 
        cardsArray.push({ id: i, image: cardImages[i] }); 
    }

    shuffleCards(cardsArray);

    
    cardsArray.forEach(card => {
        
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.id = card.id; 

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = card.image; 
        frontFace.alt = 'Card Front'; 

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');

        backFace.src = '/img/flip card.png';
        backFace.alt = 'card back';

        memoryCard.appendChild(frontFace);
        memoryCard.appendChild(backFace);

        memoryCard.classList.remove('flip', 'match');
        
        memoryCard.addEventListener('click', flipCard);

        memoryGame.appendChild(memoryCard);
    });
}


function shuffleCards(array) {
    
    for (let i = array.length - 1; i > 0; i--) {
    
        const j = Math.floor(Math.random() * (i + 1));
        
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    
    this.classList.add('flip');

    if (!hasFlippedCard) {
    
        hasFlippedCard = true;
        firstCard = this;
        return; 
    }

    
    secondCard = this; 
    moves++;
    movesCountElement.textContent = moves;

    checkForMatch();
}


function checkForMatch() {
    
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        disableCards(); 
    } else {
        unflipCards();
    }
}


function disableCards() {
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    matchesFound++;

    if (matchesFound === numPairs) {
    
        setTimeout(() => {
            alert(`Parabéns! Você encontrou todos os pares em ${moves} movimentos!`);
        }, 500);
    }

    resetBoard();
}


function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard(); 
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]; 
    [firstCard, secondCard] = [null, null]; 
}


restartButton.addEventListener('click', initializeGame);


initializeGame();