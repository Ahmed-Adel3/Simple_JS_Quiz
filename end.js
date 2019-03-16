const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const score = localStorage.getItem("score");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const finalSocre = document.getElementById("finalScore");

finalSocre.innerText = score;

username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled = !username.value;
});

saveScore = e=>{
    //to prevent default action of forms of submitting in a new page with values in the query string 
    e.preventDefault();
    const scoreObj = {
        score:score,
        name:username.value
    }
    highScores.push(scoreObj)
    highScores.sort( (a,b)=> b.score - a.score )
    highScores.splice(5);
    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign("/");
}