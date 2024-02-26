/** References:
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

(() => {
  'use strict';

  // Create a deck of cards
  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "Q", "K"];
  
  // Players' scores
  let playerScore = 0,
  computerScore = 0;
  
  // HTML References
  
  const btnGet = document.querySelector("#btnGet");
  const btnStop = document.querySelector("#btnStop");
  const btnNew = document.querySelector("#btnNew");
  
  const scoresHtml = document.querySelectorAll("small");
  const cardsPlayer = document.querySelector("#player-cards");
  const cardsComputer = document.querySelector("#computer-cards");
  
  // Function to create a deck of cards
  const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }
    
    for (let type of types) {
      for (let esp of specials) {
        deck.push(esp + type);
      }
    }
    
    deck = _.shuffle(deck);
    return deck;
  };
  
  crearDeck();
  
  // Function to get a card from the deck
  const GetCard = () => {
    if (deck.length === 0) {
      throw "No cards in the deck";
    }
    const card = deck.pop();
    return card;
  };
  
  // Function to get the value of a card
  const valueCard = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };
  
  // Computer Turn
  const computerTurn = (minPts) => {
    do {
      const card = GetCard();
      
      computerScore = computerScore + valueCard(card);
      scoresHtml[1].innerHTML = computerScore;
      
      const imgCard = document.createElement("img");
      imgCard.src = `assets/img/cards-game/${card}.png`;
      imgCard.classList.add("card");
      cardsComputer.append(imgCard);
      
      if (minPts > 21) {
        break;
      }
    } while (computerScore < minPts && minPts <= 21);
    
    setTimeout(() => {
      if (computerScore === minPts) {
        Swal.fire("🔥 ¡Tie! 🔥");
      } else if (minPts > 21) {
        Swal.fire("❌¡Computer Wins!❌");
      } else if (computerScore > 21) {
        Swal.fire("✨ ¡Player Wins! ✨");
      } else {
        Swal.fire("❌ ¡Computer Wins! ❌");
      }
    }, 100);
  };
  
  // Events
  
  btnGet.addEventListener("click", () => {
    const card = GetCard();
    
    playerScore = playerScore + valueCard(card);
    scoresHtml[0].innerHTML = playerScore;
    
    const imgCard = document.createElement("img");
    imgCard.src = `assets/img/cards-game/${card}.png`;
    imgCard.classList.add("card");
    cardsPlayer.append(imgCard);
    
    if (playerScore > 21) {
      btnGet.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore);
    } else if (playerScore === 21) {
      btnGet.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore);
    }
  });
  
  btnStop.addEventListener("click", () => {
    btnGet.disabled = true;
    btnStop.disabled = true;
    
    computerTurn(playerScore);
  });
  
  btnNew.addEventListener("click", () => {
    deck = [];
    deck = crearDeck();
    
    playerScore = 0;
    computerScore = 0;
    
    scoresHtml[0].innerText = 0;
    scoresHtml[1].innerText = 0;
    
    cardsComputer.innerHTML = "";
    cardsPlayer.innerHTML = "";
    
    btnGet.disabled = false;
    btnStop.disabled = false;
  });
})();
