let multiplayerMode;

let turnOfFirstPlayer = true;

let player1Score = 0;
let player2Score = 0;

let player1Name;
let player2Name;

let player1Selection;
let player2Selection;

let totalRound = 0;

let playerTurn;



document.addEventListener('click', (e) => {

    if (e.target.classList.contains("unmarked")) {


        if (multiplayerMode) {

            if (turnOfFirstPlayer) {
                const player1 = new Players.player(player1Name, Number(player1Selection));
                player1.renderPlayerChoices(e.target)
                turnOfFirstPlayer = false;

                playerTurn[1].style.fontSize = "50px";
                playerTurn[0].style.fontSize = "40px";

               

            } else {

                const player2 = new Players.player(player1Name, Number(player2Selection));
                player2.renderPlayerChoices(e.target)
                turnOfFirstPlayer = true;

                playerTurn[0].style.fontSize = "50px";
                playerTurn[1].style.fontSize = "40px";

            }

            getWinners.displayWinner()
        }
        else {

            const player1 = new Players.player(player1Name, Number(player1Selection))
            const botIndex = player1.index === 1 ? 0 : 1

            player1.renderPlayerChoices(e.target);

            setTimeout(() => {
                player1.bot(botIndex);
                getWinners.displayWinner();
            }, 200);
        }

    }


})

const Gameboard = (() => {

    const symbols = ["O", "X"]

    function gettingGameBoard() {
        const row1El = document.querySelectorAll(".row1")
        const row2El = document.querySelectorAll(".row2")
        const row3El = document.querySelectorAll(".row3")

        const gameboardBoxes = []

        gameboardBoxes.push(Array.from(row1El))
        gameboardBoxes.push(Array.from(row2El))
        gameboardBoxes.push(Array.from(row3El))


        return gameboardBoxes;

    }

    return { symbols, gettingGameBoard }

})();


const getWinners = (() => {

    function checkMatchingRows(gameboardBoxes) {

        //diagnol
        if (gameboardBoxes[0][0].textContent != "") {
            if (gameboardBoxes[0][0].textContent === gameboardBoxes[1][1].textContent
                && gameboardBoxes[0][0].textContent === gameboardBoxes[2][2].textContent) {

                if (gameboardBoxes[0][0].textContent === "O") {

                    return "0";
                }

                return "1";
            }
        }

        //opposite diagnol
        if (gameboardBoxes[1][1].textContent != "") {
            if (gameboardBoxes[1][1].textContent === gameboardBoxes[0][2].textContent
                && gameboardBoxes[1][1].textContent === gameboardBoxes[2][0].textContent) {

                if (gameboardBoxes[1][1].textContent === "O") {

                    return "0";
                }

                return "1";
            }
        }

        //for row
        for (let i = 0; i < gameboardBoxes.length; i++) {

            for (let j = 0; j < gameboardBoxes[i].length; j++) {

                let firstElement = gameboardBoxes[i][0].textContent

                if (firstElement != '') {

                    if (firstElement === gameboardBoxes[i][1].textContent &&
                        firstElement === gameboardBoxes[i][2].textContent) {

                        if (firstElement === "O") {
                            return "0"
                        }

                        return "1"
                    }
                }

                break;
            }

        }


    }


    function transpose(arr) {

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < i; j++) {
                const tmp = arr[i][j];
                arr[i][j] = arr[j][i];
                arr[j][i] = tmp;
            };
        }

        return arr;
    }

    const findWinner = () => {

        let gameboardBoxesRow = Gameboard.gettingGameBoard();


        let winner1 = checkMatchingRows(gameboardBoxesRow);

        if (winner1) {
            return winner1
        }

        let gameboardBoxesColumn = transpose(gameboardBoxesRow)
        let winner2 = checkMatchingRows(gameboardBoxesColumn);


        if (winner2) {
            return winner2;
        }

        const emptyBoxes = document.querySelectorAll(".unmarked")

        if (emptyBoxes.length === 0) {
            return "Draw"
        }
    }

    const displayWinner = () => {

        let winner = findWinner()
        let winnerPlayer;

        if (winner) {

            totalRound++;

            if (player1Selection === winner) {
                player1Score++;
                winnerPlayer = player1Name;
            }
            else if (player2Selection === winner) {
                player2Score++;

                if (multiplayerMode) {
                    winnerPlayer = player2Name;
                } else {
                    winnerPlayer = "BOT";
                }
            }
            else {
                winnerPlayer = winner;
            }

            UIComponents.displayScorecardAsPerMode();

            setTimeout(() => {
                alert(winnerPlayer);
                reset();

                if (totalRound === 3) {
                    totalRound = 0;

                    if (window.confirm("Do you want to play again?")) {
                        player1Score = 0;
                        player2Score = 0;
                    } else {
                        location.reload()
                    }

                    UIComponents.displayScorecardAsPerMode();
                }

            }, 500);
        }
    }

    return { displayWinner }
})();


const reset = () => {

    const topSec = document.querySelector(".top-sec")
    const midSec = document.querySelector(".mid-sec")
    const lastSec = document.querySelector(".last-sec")

    topSec.innerHTML = "";
    midSec.innerHTML = "";
    lastSec.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        topSec.innerHTML += `<button class="unmarked row1"></button>`;
        midSec.innerHTML += `<button class="unmarked row2"></button>`;
        lastSec.innerHTML += `<button class="unmarked row3"></button>`;
    }

}


const Players = (function () {
    function player(playerName, index) {
        this.index = index;
        this.playerName = playerName
    }

    player.prototype.displayName = function () {
        console.log(this.playerName, this.playerChoice)
    }

    player.prototype.renderPlayerChoices = function (tagetElement) {
        tagetElement.textContent = Gameboard.symbols[this.index];
        tagetElement.classList.add(`marked-by-player-${this.index + 1}`);
        tagetElement.classList.remove('unmarked');

        if (this.index === 0) {
            tagetElement.classList.add("color-red")
        } else {
            tagetElement.classList.add("color-blue")
        }
    }

    player.prototype.bot = function (index) {

        let smallBoxes = document.querySelectorAll(".unmarked")

        let randomNum = Math.floor(Math.random() * smallBoxes.length)

        if (smallBoxes.length > 0) {
            smallBoxes[randomNum].textContent = Gameboard.symbols[index]
            smallBoxes[randomNum].classList.add('marked-by-bot');
            smallBoxes[randomNum].classList.remove('unmarked');

            if (index === 0) {
                smallBoxes[randomNum].classList.add("color-red")
            } else {
                smallBoxes[randomNum].classList.add("color-blue")
            }
        }

    }

    return { player }
})();

const UIComponents = (function () {

    const gameTitle = document.querySelector("#game-title")
    const gameModeBtns = document.querySelector(".game-mode-btns")
    const multiplayerModeBtn = document.querySelector("#multiplayer")
    const botMode = document.querySelector("#bot-mode")
    const form = document.querySelector(".name-collection-form")
    const startBtn = document.querySelector("#start")
    const gameBoardUI = document.querySelector("#gameboard-UI")

    const player2InputFields = document.querySelector("#player2-input-fields")

    const player1NameEL = document.querySelector("#player1-name")
    const player1SelectionEL = document.querySelector("#player1-selection")

    const player2NameEL = document.querySelector("#player2-name")
    const player2SelectionEL = document.querySelector("#player2-selection")

    const player1Scorecard = document.querySelector(".player-1")
    const player2Scorecard = document.querySelector(".player-2")



    function setGameMode() {
        gameTitle.style.transform = "translate(-50%, -200%)";
        gameModeBtns.style.display = "none";

        setTimeout(() => { form.style.display = "block"; }, 400)
    }

    function displayScorecard(element, playerName, score) {
        element.innerHTML = `
            <h1 class="player-turn">${playerName}</h1>

            <section>
                ${score}
            </section>
        `
    }

    function displayScorecardAsPerMode() {

        if (multiplayerMode) {
            displayScorecard(player1Scorecard, player1Name, player1Score);
            displayScorecard(player2Scorecard, player2Name, player2Score);
        } else {
            displayScorecard(player1Scorecard, player1Name, player1Score);
            displayScorecard(player2Scorecard, "BOT", player2Score);
        }

        playerTurn = document.querySelectorAll(".player-turn");
    }


    form.style.display = "none";
    gameBoardUI.style.display = "none";


    multiplayerModeBtn.addEventListener("click", () => {
        multiplayerMode = true;
        setGameMode();
    })

    botMode.addEventListener("click", () => {
        multiplayerMode = false;
        player2InputFields.style.display = "none"
        setGameMode();

    })


    startBtn.addEventListener('click', () => {

        player1Name = player1NameEL.value;
        player2Name = player2NameEL.value;

        player1Selection = player1SelectionEL.value;
        player2Selection = player2SelectionEL.value;


        if (player1Selection === player2Selection && multiplayerMode) {
            alert("Both player cannot choose same option")
        }
        else {
            form.style.display = "none";
            gameBoardUI.style.display = "block";

            displayScorecardAsPerMode();
        }


    })


    return { player1Scorecard, player2Scorecard, displayScorecardAsPerMode }
})()










