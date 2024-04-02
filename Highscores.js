const highScore = document.querySelector("#highScore");
const clear = document.querySelector("#clear");
const goBack = document.querySelector("#goBack");

clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

const allScores = JSON.parse(localStorage.getItem("allScores")) || [];

allScores.forEach(score => {
    const createLi = document.createElement("li");
    createLi.textContent = `${score.initials} ${score.score}`;
    highScore.appendChild(createLi);
});

goBack.addEventListener("click", () => {
    window.location.replace("./index.html");
});
