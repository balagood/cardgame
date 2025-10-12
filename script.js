// number pairs for the game
const number = ['1','2','3','4'];
let cards = [...number, ...number]; // Duplicate for the pairs

const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

//crreating an array
let flippedCards = [];
let matchedCards = [];

//Shuffle the cards using in the loop
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


//Create the card elements and add them to the board
function createBoard() {
  gameBoard.innerHTML = '';
  //here only the suffle the card when the we click the restart button
  shuffle(cards);
  //looping the card element and add the element and append the child
  //create the element as synamic
  cards.forEach((number, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = number;

    const back = document.createElement('div');
    back.classList.add('card-back');

    const img = document.createElement('img');
    img.src = 'image/card_image.jpg';
    img.alt='Descriptive image';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    back.appendChild(img);
 
    //append the all the div element
    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);

    card.addEventListener('click', () => handleCardClick(card));
  });
}

 
//Handle card click logic
function handleCardClick(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) 
  {
      card.classList.add('flipped');
      flippedCards.push(card);

      //here we can write the logic when the card is same otherwise it is an flipped
      if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.dataset.number === second.dataset.number) {
          matchedCards.push(first, second);
          flippedCards = [];
      } else {
          setTimeout(() => {
          first.classList.remove('flipped');
          second.classList.remove('flipped');
          flippedCards = [];
          }, 1000);
      }
      }
  }
}

//Restart the game
function restartGame() {
  flippedCards = [];
  matchedCards = [];
  createBoard();
}

//Initialize game
restartBtn.addEventListener('click', restartGame);
createBoard();