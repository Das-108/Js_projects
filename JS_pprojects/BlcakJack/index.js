let cards = []
let isAlive= false;
let hasBlckJack= false;
let message  = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.getElementById("cards-el");

let player = {
    name : "per",
    chips : 145
}

let playerEl= document.getElementById("player-el")
playerEl.textContent = player.name + ": $ " + player.chips

function getRandomCard(){
    let randomCard = Math.floor(Math.random() * 13) +1
     if (randomCard === 1){
        return 11
    }if(randomCard > 10){
        return 10
    }else {
        return randomCard
    }
}

function startGame(){
    isAlive = true
    let firstcard = getRandomCard()
    let secondcard = getRandomCard()
    cards = [firstcard ,secondcard]
    sum = firstcard + secondcard
    renderGame();
}
function renderGame(){
    if(sum <= 20){
        message = "Do you want to draw a new card? "
    }else if (sum === 21) {
        message = "wohoo! you've got Blackjack!"
        hasBlckJack = true ;
    }else {
        message= "You're out of the game!"
        isAlive = false ;
    }
    messageEl.textContent = message;
    sumEl.textContent = "sum: " + sum;
    cardsEl.textContent = "cards: "
    for( let i=0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " "
    }
}

function newcard(){
    if(isAlive == true && hasBlckJack === false){
        let card = getRandomCard();
        sum += card
        cards.push(card)
        renderGame()
    }
}

