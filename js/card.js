'use strict';
/*
app.js will be included first on every page

localStorage key: allCards - an array of Card objects representing all cards added so far
localStorage key: allDecks - an array of CardDeck objects representing all decks saved so far
localStorage key: allUsers - an arra of User objects representing all users created so far
localStorage key: cUser - the current loaded user
localStorage key: cDeck - the current loaded deck

Card(question, answer, categories)
CardDeck(category)
User(name)
UserInterface(user, deck)
*/

//TO DO: load the cDeck
//TO DO: load the cUser
//TO DO: create UserInterface Object
//TO DO: check if there is a current user and current deck, if not, return to homepage
//TO DO: using the CDeck's getMultipleRandomCards() function, make a list of of cards to answer in random order
//TO DO: display the first card in the list (should probably make a displayCard(card) method for UserInterface)
//TO DO: using the CDeck's getMultipleRandomCards() function, generate 3 answers in addition to the correct one
// Should probably make a method in UserInterface to do this (see above)
//TO DO: display the 4 possible answers as options for the user to click (will need event handlers on elements)
//TO DO: use the CDeck's Current Card's isCorrect function to determine if the chosen answer was correct or not
//TO DO: user the cUser's record() function to record the results for that card
//TO DO: remove the card from the randomly generated list, repeat for next one



let ux = new UserInterface(User.load(JSON.parse(localStorage.getItem('cUser'))), CardDeck.loadDeck(JSON.parse(localStorage.getItem('cDeck'))));

UserInterface.prototype.askQuestions = function(cardStack){
  if (cardStack.length === 0){
    return;
  }
  let card = cardStack.pop();
  let answerStack = this.deck.getMultipleRandomCards(3);
  let aUser = this.user;

  let cardFront = document.getElementById('card-front');
  let a1 = document.getElementById('answer1');
  let a2 = document.getElementById('answer2');
  let a3 = document.getElementById('answer3');
  let a4 = document.getElementById('answer4');
  cardFront.textContent = card.question;
  a1.textContent = card.answer;
  a2.textContent = answerStack[0].answer;
  a3.textContent = answerStack[1].answer;
  a4.textContent = answerStack[2].answer;
  a1.addEventListener('click', handleClick);
  a2.addEventListener('click', handleClick);
  a3.addEventListener('click', handleClick);
  a4.addEventListener('click', handleClick);

  function handleClick(event){
    let clickedAnswer = event.target.textContent;
    if (clickedAnswer === card.answer){
      cardFront.textContent = 'CORRECT';
      aUser.record(card.question, true);
    }
    else {
      cardFront.textContent = 'INCORRECT';
      aUser.record(card.question, false);
    }
    a1.removeEventListener('click', handleClick);
    a2.removeEventListener('click', handleClick);
    a3.removeEventListener('click', handleClick);
    a4.removeEventListener('click', handleClick);

  }

  function nextButton(event){
    
  }
};

UserInterface.prototype.ask = function(){
  let cardStack = this.deck.getMultipleRandomCards(7);
  this.askQuestions(cardStack);
};

ux.ask();
