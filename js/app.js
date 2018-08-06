let time, interval, moves;
//const stars = document.querySelectorAll('.stars li i');
//let interval;
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

let stars = document.querySelectorAll('.stars li i');
let starCount = 3;


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

  moves = 0;
  //moveCounter.innerText = moves;
  deck.innerHTML = cardHTML.join('');

  //Set time to zero
  time = 0;
  //let interval;
  const timer = document.querySelector('.timer');

  //set initial timer text
  timer.innerText = `${time} seconds`;

  resetStars();
  startTimer();
  gamePlay();

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



function gamePlay() {


//Select all the cards
const allCards = document.querySelectorAll('.card');
//Define array for the open cards
let openCards = [];

//Set number of moves to zero
//let moves = 0;
const moveCounter = document.querySelector('.moves');
moveCounter.innerText = moves;

//Loop through the cards and add an event listener for a mouse click to flip over a card

  allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {

      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
          openCards.push(card);
          card.classList.add('open', 'show');
          console.log(openCards.length);
          //console.log('Open cards:', openCards.length);

          //start timer on first card flip
          //if (openCards.length === 1) {

          //}

//PRevent more than 2 cards being selected at a time
        //  if(openCards.length < 2) {

            //only allows 2 cards to be flipped
            if (openCards.length == 2) {
              // Temporarily prevent any further card selection, to prevent
              // the case where you can actually click 3 cards whilst
              // processing the results.
              document.body.style.pointerEvents='none';
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
                // Allow cards to be selected again.
                document.body.style.pointerEvents='auto';
              } else {

                //hides the cards if they don't match
                setTimeout(function() {
                  openCards.forEach(function(card) {
                    card.classList.remove('open', 'show');
                  });
                  // Temporarily prevent cards being clicked
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

    //      } else {
    //        return false;
    //      }
        }
      });
    });
}

//completed Game
function gameComplete () {
  let matchedCards = document.querySelectorAll('ul.deck li.match');

  if (matchedCards.length == 16) {
    //console.log('Game over!');
    //window.alert("Game over!");
    stopTimer();
    showModal();
  }
};

/******     Reset button     ******/

  //reset button
  const restartBtn = document.querySelector('.restart');

  restartBtn.addEventListener('click', function() {
    stopTimer();
    initGame();
    //moves = 0;
    //time = 0;
    console.log('restart activated');
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
  //moves = 0;
  //time = 0;
  console.log('restart activated');
  modal.classList.toggle('show-modal');
});

// Modal ok button, to close modal window.
const okBtn = document.querySelector('#modal-ok');

okBtn.addEventListener('click', function() {
  modal.classList.toggle('show-modal');
})

//timer functionionality, increment by 1 sec
//time = 0;

/******     Timer     ******/

// Timer operation, count in seconds.
function incrementTimer() {
const timer = document.querySelector('.timer');
  //let time = 0;
  time++;
  timer.innerHTML = `${time} seconds`;
  console.log(time);
}

//start timer
//let interval;

// Start the timer.
function startTimer() {
  //let interval;
  interval = setInterval(incrementTimer, 1000);
}

// Stop the timer.
function stopTimer() {
  clearInterval(interval);
}

/******     Star rating     ******/

// Decrease the star rating as the game progresses
function starChange() {

console.log('starChange accessed');
console.log(`moves: ${moves}`);
//let stars = document.querySelectorAll('.stars li i');

  if (moves > 10 && moves < 20) {
    stars[2].classList.remove('active');
    starCount = 2;
  } else if (moves > 21 && moves < 30) {
    stars[1].classList.remove('active');
    starCount = 1;
  } else if (moves > 31) {
    stars[0].classList.remove('active');
    starCount = 0;

  }
}

// Reset the number of stars to 3.
function resetStars() {
  //let stars = document.querySelectorAll('.stars li i');
    for (i=0; i < 3; i++) {
      stars[i].classList.add('active');
    starCount = 3;
    }
}
