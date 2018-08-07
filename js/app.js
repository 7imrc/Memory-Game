let time, interval, moves;
const stars = document.querySelectorAll('.stars li i');
let starCount = 3;

/*
 * Create a list that holds all of your cards
 */

// Array of different cards available.
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

// When the game initialises, generate the cards and set default values.
function initGame() {
  const deck = document.querySelector('.deck');

  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');

  // Set initial number of moves.
  moves = 0;
  // Set time to zero.
  time = 0;
  // Set timer clock.
  const timer = document.querySelector('.timer');
  timer.innerText = `${time} seconds`;

  resetStars();
  startTimer();
  gamePlay();

}

// Initialise the game on page load.
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



function gamePlay() {

  // Select all the cards.
  const allCards = document.querySelectorAll('.card');
  // Define array for the open cards.
  let openCards = [];

  //Set up the move counter.
  const moveCounter = document.querySelector('.moves');
  moveCounter.innerText = moves;

  // Loop through the cards and add an event listener for a mouse click to flip over a card.
  allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {

      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
          openCards.push(card);
          card.classList.add('open', 'show');
            // Only allows 2 cards to be flipped.
            if (openCards.length == 2) {
              /*
               * Temporarily prevent any further card selection, to prevent
               * the case where you can actually click 3 cards whilst
               * processing the results.
               */
              document.body.style.pointerEvents='none';
              // Check if cards match.
              if (openCards[0].dataset.card == openCards[1].dataset.card){
                openCards[0].classList.add('match');
                openCards[0].classList.add('open');
                openCards[0].classList.add('show');

                openCards[1].classList.add('match');
                openCards[1].classList.add('open');
                openCards[1].classList.add('show');

                // Clear array.
                openCards = [];
                // Allow cards to be selected again.
                document.body.style.pointerEvents='auto';
              } else {
                // Hides the cards, after short delay, if they don't match.
                setTimeout(function() {
                  openCards.forEach(function(card) {
                    card.classList.remove('open', 'show');
                  });
                  // Allow cards to be selected again.
                  document.body.style.pointerEvents='auto';
                  //clear array
                  openCards = [];
                }, 1000);
              }

              //increment the number of moves
              moves++;
              moveCounter.innerText = moves;

              starChange();
              gameComplete();
            }
        }
      });
    });
}

/******     Completed Game     ******/

function gameComplete () {
  let matchedCards = document.querySelectorAll('ul.deck li.match');

  if (matchedCards.length == 16) {
    stopTimer();
    showModal();
  }
};

/******     Reset button     ******/

const restartBtn = document.querySelector('.restart');

restartBtn.addEventListener('click', function() {
  stopTimer();
  initGame();
});

/******     Game complete modal     ******/

// Display the message at the end of the game.
function showModal() {
  let modal = document.querySelector('.modal');
  let modalTextTime = document.querySelector('#modalTime');
  let modalTextStars = document.querySelector('#modalStars');


  modalTextTime.innerHTML = `Congratulations, you matched all the cards in ${time} seconds!`;
  modalTextStars.innerHTML = `You scored ${starCount} stars!`;
  modal.classList.toggle('show-modal');
}

// Modal play again button.
const playAgainBtn = document.querySelector('#modal-restart');
let modal = document.querySelector('.modal');

playAgainBtn.addEventListener('click', function() {
  initGame();
  modal.classList.toggle('show-modal');
});

// Modal ok button, to close modal window.
const okBtn = document.querySelector('#modal-ok');

okBtn.addEventListener('click', function() {
  modal.classList.toggle('show-modal');
})

/******     Timer     ******/

// Timer operation, count in seconds.
function incrementTimer() {

  const timer = document.querySelector('.timer');
    time++;
    timer.innerHTML = `${time} seconds`;
}

// Start the timer.
function startTimer() {
  interval = setInterval(incrementTimer, 1000);
}

// Stop the timer.
function stopTimer() {
  clearInterval(interval);
}

/******     Star rating     ******/

// Decrease the star rating as the game progresses
function starChange() {

  if (moves > 10 && moves < 20) {
    stars[2].classList.remove('active');
    starCount = 2;
  } else if (moves > 20) {
    stars[1].classList.remove('active');
    starCount = 1;
  }
}

// Reset the number of stars to 3.
function resetStars() {
  for (i=0; i < 3; i++) {
    stars[i].classList.add('active');
  starCount = 3;
    }
}
