'use strict';
/*
app.js will be included first on every page

localStorage key: allCards - an array of Card objects representing all cards added so far
localStorage key: allUsers - an array of User objects representing all users created so far
localStorage key: cUser - the current loaded user

Card(question, answer, categories)
CardDeck(category)
User(name)
UserInterface(user, deck)
*/

let ux = new UserInterface(User.load(JSON.parse(localStorage.getItem('cUser'))));
let p = document.getElementById('login-info');
if (p){
  p.textContent = `User: ${ux.user.name}. Current Deck: ${ux.user.currentDeck.name}.`;
}


UserInterface.prototype.askQuestions = function(cardStack){
  let cardFront = document.getElementById('card-write');
  let cardcount = document.getElementById('card-counter');
  cardcount.textContent = cardStack.length + ' Cards Left.';
  if (cardStack.length === 0){
    this.user.save();
    let a = document.createElement('a');
    a.textContent = 'Session Complete. Click here to view results.';
    a.href = 'results.html';
    cardFront.textContent = '';
    cardFront.appendChild(a);
    return;
  }
  let card = cardStack.pop();
  let answerStack = this.user.currentDeck.getMultipleRandomCards(3);
  //prevent same answer appearing twice
  while(CardDeck.isInDeck(card, answerStack)){
    for (let i = 0; i < answerStack.length; i++){
      if(answerStack[i].question === card.question){
        answerStack[i] = this.user.currentDeck.getRandomCard();
      }
    }
  }
  let index = Math.floor(Math.random() * answerStack.length);
  answerStack.splice(index, 0, card);


  let aUser = this.user;
  let theUX = this;

  let a1 = document.getElementById('answer1');
  let a2 = document.getElementById('answer2');
  let a3 = document.getElementById('answer3');
  let a4 = document.getElementById('answer4');
  let next = document.getElementById('next-button');
  cardFront.textContent = card.question;
  a1.textContent = answerStack[0].answer;
  a2.textContent = answerStack[1].answer;
  a3.textContent = answerStack[2].answer;
  a4.textContent = answerStack[3].answer;
  a1.addEventListener('click', handleClick);
  a2.addEventListener('click', handleClick);
  a3.addEventListener('click', handleClick);
  a4.addEventListener('click', handleClick);

  function handleClick(event){
    let clickedAnswer = event.target.textContent;
    if (clickedAnswer === card.answer){
      cardFront.textContent = 'CORRECT';
      aUser.record(card, true);
    }
    else {
      cardFront.textContent = `${aUser.name} was INCORRECT. The answer was "${card.answer}".`;
      aUser.record(card, false);
      cardStack.unshift(card);
    }
    a1.removeEventListener('click', handleClick);
    a2.removeEventListener('click', handleClick);
    a3.removeEventListener('click', handleClick);
    a4.removeEventListener('click', handleClick);
    next.addEventListener('click', nextButton);
  }

  function nextButton(event){
    next.removeEventListener('click', nextButton);
    theUX.askQuestions(cardStack);
  }
};

UserInterface.prototype.ask = function(stackSize){
  let cardStack = this.user.currentDeck.getMultipleRandomCards(stackSize);
  this.askQuestions(cardStack);
};

ux.ask(ux.user.currentDeck.deck.length);
