
const startForm = document.querySelector('#startForm');
const inputName = document.querySelector("#playerName");
const errorContainer = document.querySelector("#errorContainer");

startForm.addEventListener('submit', startGame);

function startGame(e) {
    e.preventDefault(); 

    const playerName = inputName.value.trim();

    if (!playerName) {
        errorContainer.innerHTML = "<p>Please enter your name!</p>"; 
    } else {
        errorContainer.innerHTML = ""; 
        inputName.value = ""; 
        localStorage.setItem("playerName", playerName);
        window.location.href = 'indexSecond.html'; 
    }
}