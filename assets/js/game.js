/** References:
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

// Create a deck of cards
let deck = [];
const types = ['C','D','H','S'];
const specials = ['A','J','Q','K'];

// Players' scores
let scorePlayer = 0;
let scoreComputer = 0;

// HTML References

const btnGet = document.querySelector('#btnGet');
const scoresHtml = document.querySelectorAll('small');
const cardsPlayer = document.querySelector('#player-cards');
const cardsComputer = document.querySelector('#computer-cards');

// Function to create a deck of cards
const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for(let type of types){
            deck.push( i + type )
        }
    }
    
    for(let type of types){
        for(let esp of specials){
            deck.push( esp + type )
        }
    }


    deck = _.shuffle( deck )

    return deck;
}

crearDeck();

// Function to get a card from the deck
const GetCard = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop();

    return card;
}

// Function to get the value of a card
const valueCard = ( carta ) => {
    const value = carta.substring(0, carta.length - 1);
    return ( isNaN(value) ) ?
    ( value === 'A' ) ? 11 : 10
    : value * 1;
}

// Get the value of a card
const value = valueCard( GetCard() );

// Event when clicking the button to get a card

btnGet.addEventListener('click', () => {
    const card = GetCard();
    
    scorePlayer = scorePlayer + valueCard(card);
    scoresHtml[0].innerHTML = scorePlayer;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/img/cards-game/${ card }.png`;
    imgCard.classList.add('card');
    cardsPlayer.append( imgCard );

    // Check if the player has lost 
    if(scorePlayer > 21){
        btnGet.disabled = true;
        console.log('Perdiste perro hp');
    } else if ( scorePlayer === 21 ) {
        console.log('21, great!');
    }

});



