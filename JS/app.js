


document.addEventListener('click', (e) => {

    if (e.target.classList.contains("unmarked")) {
        player(e.target)
    }
})

const Gameboard = (() => {

    const symbols = ["O", "X"]

    const bot = () => {

        let smallBoxes = document.querySelectorAll(".unmarked")

        let randomNum = Math.floor(Math.random() * smallBoxes.length)

        if (smallBoxes.length > 0) {
            smallBoxes[randomNum].textContent = symbols[1]
            smallBoxes[randomNum].classList.add('marked-by-bot');
            smallBoxes[randomNum].classList.remove('unmarked');
        }

    }

    return { symbols, bot }

})();

const player = (tagetElement) => {

    if (tagetElement.tagName === "BUTTON") {

        tagetElement.textContent = Gameboard.symbols[0];
        tagetElement.classList.add('marked-by-player');
        tagetElement.classList.remove('unmarked');

        setTimeout(Gameboard.bot, 200);
    }

}

const winner = (who) => {
    const box0 = document.querySelector("[data-index = '0']").innerHTML;
    const box1 = document.querySelector("[data-index = '1']").innerHTML;
    const box2 = document.querySelector("[data-index = '2']").innerHTML;
    const box3 = document.querySelector("[data-index = '3']").innerHTML;
    const box4 = document.querySelector("[data-index = '4']").innerHTML;
    const box5 = document.querySelector("[data-index = '5']").innerHTML;
    const box6 = document.querySelector("[data-index = '6']").innerHTML;
    const box7 = document.querySelector("[data-index = '7']").innerHTML;
    const box8 = document.querySelector("[data-index = '8']").innerHTML;

    //horizontally
    if (box0 === box1 && box0 === box2) {
        alert(who + " Winner")
    }

    if (box3 === box4 && box3 === box5) {
        alert(who + " Winner")
    }

    if (box6 === box7 && box6 === box8) {
        alert(who + " Winner")
    }

    //Vertically
    if (box0 === box3 && box0 === box6) {
        alert(who + " Winner")
    }

    if (box1 === box4 && box1 === box7) {
        alert(who + " Winner")
    }

    if (box2 === box5 && box2 === box8) {
        alert(who + " Winner")
    }


    //diagnolly
    if (box0 === box4 && box0 === box8) {
        alert(who + " Winner")
    }

    if (box6 === box4 && box6 === box2) {
        alert(who + " Winner")
    }

}




