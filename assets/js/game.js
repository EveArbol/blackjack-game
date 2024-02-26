/** References:
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

const myModule = (() => {
  'use strict';
  
  // Create a deck of cards
  let   deck     = [];
  const types    = ["C", "D", "H", "S"],
        specials = ["A", "J", "Q", "K"];
  
  // Players' scores
  let scoresPlayers = [];
  
  // HTML References
  const btnGet  = document.querySelector("#btnGet"),
  btnStop = document.querySelector("#btnStop"),
  btnNew  = document.querySelector("#btnNew");
  
  const scoresHtml    = document.querySelectorAll("small"),
  divPlayersCards = document.querySelectorAll(".divCards");
  
  // This function initialises the game
  const initialiseGame = (playersNumber = 2) => {
    deck = createDeck();

    scoresPlayers = [];
    for( let i = 0; i < playersNumber; i++ ) {
      scoresPlayers.push(0);
    }
    scoresHtml.forEach( e => e.innerText = 0 );
    divPlayersCards.forEach( e => e.innerText = '' );

    btnGet.disabled  = false;
    btnStop.disabled = false;

  }
  
  // Function to create a deck of cards
  const createDeck = () => {
    
    deck = [];
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
    return _.shuffle(deck);
  };
  
  // Function to get a card from the deck
  const GetCard = () => {
    if (deck.length === 0) {
      throw "No cards in the deck";
    }
    return deck.pop();
  }
  
  // Function to get the value of a card
  const valueCard = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };
  
  const scoresAccumulation = (card, turn) => {
    scoresPlayers[turn] = scoresPlayers[turn] + valueCard(card);
    scoresHtml[turn].innerText = scoresPlayers[turn];
    return scoresPlayers[turn];
  }
  
  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/img/cards-game/${card}.png`;
    imgCard.classList.add("card");
    divPlayersCards[turn].append(imgCard);
  }
  
  const winPlayer = () => {
    
    const [ minPts, computerScore ] = scoresPlayers;
    
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
  
  
  
  // Computer Turn
  const computerTurn = (minPts) => {
    let computerScore = 0;
    do {
      const card = GetCard();
      computerScore = scoresAccumulation( card, scoresPlayers.length -1 );
      createCard( card, scoresPlayers.length -1 );
      
    } while ( (computerScore < minPts) && (minPts <= 21));
    
    winPlayer();
  }
  
  // Events
  btnGet.addEventListener("click", () => {
    
    const card = GetCard();
    const playerScore = scoresAccumulation(card, 0);
    
    createCard( card, 0 );
    
    
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
    
    computerTurn(scoresPlayers[0]);
  });
  
  btnNew.addEventListener("click", () => {
  
    initialiseGame();
  });
  return {
    newGame: initialiseGame
  };


})();
