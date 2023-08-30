// Variable assignment

const topText = document.querySelector("h1");
const rollButton = document.querySelector(".roll");
const resetButton = document.querySelector(".reset");
const diceDisplays = document.getElementsByClassName("diceImg");
const rollsRemainingText = document.querySelector(".rollsRemaining");
const yourScoreText = document.querySelector(".yourScore");
const highScoreText = document.querySelector(".highScore");
const resultText = document.querySelector(".resultText");

let yourScore = 0;
let highScore = 0;
let rollsRemaining = 3;
let dieval = [1, 1, 1, 1, 1];
diceDisplays[0].src = "images/dice3.png";



function diceRoll()
{
    if (rollsRemaining > 0){

        for (let i = 0; i < 5; i++)
        {
            dieval[i] = (Math.floor(Math.random() * 6))+1;
            diceDisplays[i].src = "images/dice" + dieval[i] + ".png";
           
        }
        rollsRemaining--;
        updateRollsRemaining();
        var thisRoundScore = calculateScore();
        yourScore += thisRoundScore;
        updateScore();
        if (rollsRemaining===0){
            topText.innerText = "Game Over!"
        }
    } 
}

function resetGame()
{
    if (yourScore > highScore) {
        highScore = yourScore;
        updateHighScore();
    }
    topText.innerText = "Good Luck!";
    yourScore = 0;
    updateScore();
    rollsRemaining = 3;
    updateRollsRemaining();
}

function calculateScore()
{
    let pipCount = [0, 0, 0, 0, 0, 0];
    let highestCount = 0;
    let highCountPips = 0;
    for (let i=0; i<5; i++)
    {
        (pipCount[dieval[i]-1])++;
        if (pipCount[dieval[i]-1]>highestCount) {
            highestCount = pipCount[dieval[i]-1];
            highCountPips = dieval[i];
        }
    }
    if (highestCount===5) {
        topText.innerText = "Notzeee!";
        resultText.innerText = "In the last roll, your NOTZEE received 100 points"
        return 100;
    }
    else if (highestCount===4) {
        topText.innerText = "Good Luck!";
        let score = 50 + (highCountPips * 5);
        resultText.innerText = "In the last roll, your FOUR-OF-A-KIND received " + score + " points"
        return score;
    }
    else if (highestCount===3&&pipCount.includes(2)) {
        topText.innerText = "Good Luck!";
        let score = 30 + (highCountPips * 5);
        resultText.innerText = "In the last roll, your FULL HOUSE received " + score + " points"
        return score;
    }
    else if (highestCount===3) {
        topText.innerText = "Good Luck!";
        let score = 25 + (highCountPips * 4);
        resultText.innerText = "In the last roll, your THREE-OF-A-KIND received " + score + " points"
        return score;
    }
    else if (highestCount===2) {
        let counter = 0;
        for (let i =1; i<=6; i++){
            if (pipCount[i]===2) {counter++;}
        }
        if (counter===2){
            topText.innerText = "Good Luck!";
            let score = 20 + (highCountPips * 3);
            resultText.innerText = "In the last roll, your TWO PAIR received " + score + " points"
            return score;
        }
        else {
            topText.innerText = "Good Luck!";
            let score = 10 + (highCountPips * 2);
            resultText.innerText = "In the last roll, your ONE PAIR received " + score + " points"
            return score;
        }
    }
    else {
    topText.innerText = "Good Luck!";
    let score = dieval[0]+dieval[1]+dieval[2]+dieval[3]+dieval[4];
    resultText.innerText = "In the last roll, your roll received " + score + " points"
    resultText.style.fontFamily = "Indie Flower";
    return score;
    }
}

function updateScore()
{
    yourScoreText.innerHTML="Your score: " + yourScore;
}

function updateHighScore()
{
    highScoreText.innerHTML = "High Score: " + highScore;
}

function updateRollsRemaining()
{
    rollsRemainingText.innerHTML = "Rolls remaining: " + rollsRemaining;
}

