/** References:
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let scorePlayer = 0;
    scoreComputer = 0;

// HTML References

const btnGet = document.querySelector('#btnGet');
const scoresHtml = document.querySelectorAll('small');
const cardsPlayer = document.querySelector('#player-cards');
const cardsComputer = document.querySelector('#computer-cards');

const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push( i + tipo )
        }
    }
    
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo )
        }
    }


    deck = _.shuffle( deck )

    return deck;
}

crearDeck();

const pedirCarta = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();

    return carta;
}

// pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor) ) ?
    ( valor === 'A' ) ? 11 : 10
    : valor * 1;
}


const valor = valorCarta( pedirCarta() );

// Eventos

btnGet.addEventListener('click', () => {
    const card = pedirCarta();
    
    scorePlayer = scorePlayer + valorCarta(card);
    scoresHtml[0].innerHTML = scorePlayer;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/img/cards-game/${ card }.png`;
    imgCard.classList.add('card');
    cardsPlayer.append( imgCard );

    if(scorePlayer > 21){
        btnGet.disabled = true;
        console.log('Perdiste perro hp');
    } else if ( scorePlayer === 21 ) {
        console.log('21');
    }

});



