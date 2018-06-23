/*
 * Create a list that holds all of your cards
 */

//array of different cards available
let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-bicycle', 'fa-bicycle',
            'fa-leaf', 'fa-leaf',
            'fa-bomb', 'fa-bomb'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//generate HTML for each card
function generateCard(card) {
  return `<li class='card' data-card='${card}'><i class='fa ${card}'></i></li>`;
}

//generate the cards
function initGame() {
  const deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}

//start the game
initGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




//Select all the cards
const allCards = document.querySelectorAll('.card');
//Define array for the open cards
let openCards = [];

//Loop through the cards and add an event listener for a mouse click to flip over a card
allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        openCards.push(card);
        card.classList.add('open', 'show');
        console.log('Open cards:', openCards.length);



        //only allows 2 cards to be flipped
        if (openCards.length == 2) {
          //check if cards match
          if (openCards[0].dataset.card == openCards[1].dataset.card){
            openCards[0].classList.add('match');
            openCards[0].classList.add('open');
            openCards[0].classList.add('show');

            openCards[1].classList.add('match');
            openCards[1].classList.add('open');
            openCards[1].classList.add('show');

            //clear array
            openCards = [];
          } else {

            //hides the cards if they don't match
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove('open', 'show');
              });

              //clear array
              openCards = [];
            }, 1000);
          }
        }
      }
    });
  });
