const highScoresList = document.getElementById("highScoresList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores.map(sc=>{
    return`<li class="highScore">${sc.name} | ${sc.score}`
}).join("");