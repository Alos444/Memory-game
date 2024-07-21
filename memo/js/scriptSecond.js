

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
let timerInterval;

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
        toggleCard(cardContainer);
        selectedCards.push(cardContainer);
        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
});


function toggleCard(cardContainer) {
    const cover = cardContainer.querySelector(".card-cover");
    const image = cardContainer.querySelector(".card-image");
    cover.style.display = cover.style.display === "none" ? "block" : "none";
    image.style.display = image.style.display === "none" ? "block" : "none";
    cardContainer.classList.toggle("flipped");
}


function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.card === card2.dataset.card) {
        matchedPairs++;
        card1.classList.add("matched");
        card2.classList.add("matched");
        playerScore++;
        selectedCards = [];

        if (matchedPairs === totalPairs) {
            Winner();
        }
    } else {
        setTimeout(() => {
            toggleCard(card1);
            toggleCard(card2);
            selectedCards = [];
        }, 1000);
    }
}


function Winner() {
    resultDisplay.textContent = `${playerName}, Hooray! You are the winner!`;
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resultDisplay.textContent = `${playerName}, don't worry, you can try again.`;
            cardBoard.removeEventListener("click", handleCardClick);
        }

        if (matchedPairs === totalPairs) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
