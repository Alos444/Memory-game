
const playerName = localStorage.getItem("playerName") || "Player";
document.querySelector("#greeting").textContent = `Hello ${playerName}`;


const cardBoard = document.querySelector("#cardBoard");
const resultDisplay = document.querySelector("#result");
const timerDisplay = document.querySelector("#timer");

const cardImages = [
    "Australia.jpg",
    "Brazil.jpeg",
    "UK.jpg",
    "Egypt.jpg",
    "Jordan.jpg",
    "Paris.jpg",
    "Rome.jpg",
    "Spain.jpg"
];

let cardDeck = [...cardImages, ...cardImages];
let shuffledDeck = shuffle(cardDeck);
let selectedCards = [];
let matchedPairs = 0;
let totalPairs = cardImages.length;
let playerScore = 0;
let timeLeft = 180;

Board();
startTimer();

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function Board() {
    cardBoard.innerHTML = "";
    shuffledDeck.forEach((image, index) => {
        const card = createCard(image, index);
        cardBoard.appendChild(card);
    });
}

function createCard(image, index) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "col-md-3 col-sm-4 col-xs-6 mb-4 card-container";
    cardContainer.dataset.card = image;
    cardContainer.dataset.index = index;

    const card = document.createElement("div");
    card.className = "card bg-light text-dark border-dark h-100";

    const coverImg = document.createElement("img");
    coverImg.src = "../images/Cover.jpg";
    coverImg.className = "card-img-top card-cover";
    coverImg.alt = "Cover";

    const cardImg = document.createElement("img");
    cardImg.src = `../images/${image}`;
    cardImg.className = "card-img-top card-image";
    cardImg.alt = "Landmark";
    cardImg.style.display = "none";

    card.appendChild(coverImg);
    card.appendChild(cardImg);
    cardContainer.appendChild(card);

    return cardContainer;
}

cardBoard.addEventListener("click", event => {
    const cardContainer = event.target.closest(".card-container");
    if (cardContainer && selectedCards.length < 2 && !cardContainer.classList.contains("flipped") && !cardContainer.classList.contains("matched")) {
        flipCard(cardContainer);
        selectedCards.push(cardContainer);
        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
});

function flipCard(cardContainer) {
    const cover = cardContainer.querySelector(".card-cover");
    const image = cardContainer.querySelector(".card-image");
    cover.style.display = "none";
    image.style.display = "block";
    cardContainer.classList.add("flipped");
}

function flipCardBack(cardContainer) {
    const cover = cardContainer.querySelector(".card-cover");
    const image = cardContainer.querySelector(".card-image");
    cover.style.display = "block";
    image.style.display = "none";
    cardContainer.classList.remove("flipped");
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.card === card2.dataset.card) {
        matchedPairs++;
        card1.classList.add("matched");
        card2.classList.add("matched");
        playerScore++;
        selectedCards = [];

        setTimeout(() => {
            card1.remove();
            card2.remove();
            if (matchedPairs === totalPairs) {
                Winner();
            }
        }, 500);
    } else {
        setTimeout(() => {
            flipCardBack(card1);
            flipCardBack(card2);
            selectedCards = [];
        }, 1000);
    }
}

function Winner() {
  
    resultDisplay.textContent = `${playerName} you are the winner!!`;
    clearInterval(timerInterval);
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resultDisplay.textContent = `${playerName} loses. Time's up!`;
            cardBoard.removeEventListener("click", event => { });
        }

        if (matchedPairs === totalPairs) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
