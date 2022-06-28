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

/*
Card Object
Description: Represents an  individual flash-card
  q : string. A question to be asked.
  a : string. The correct answer to the question.
  c: array of strings. A list of categories the card could belong to (e.g. ['web programming', 'javascript', 'loops'])
*/
function Card(q, a, c){
  this.question = q;
  this.answer = a;
  this.categories = c;
}

//check a given answer and return true if correct
Card.prototype.isCorrect = function(usersAnswer){
  if (this.answer.toLowerCase() === usersAnswer.toLowerCase()){
    return true;
  }
  else return false;
};

//add a category to a card
Card.prototype.addCategory = function(category){
  this.categories.push(category);
};

//check if a card has a given category
Card.prototype.hasCategory = function(category){
  for(let cat of this.categories){
    if (cat === category){
      return true;
    }
  }
  return false;
};

//turn a JSON.parsed card string back into a Card object
Card.loadCard = function(parsedCard){
  return new Card(parsedCard.question, parsedCard.answer, parsedCard.categories);
};

// check local storage for cards, if none use default cards; remember to clear local storage if changing default cards.
Card.loadAllCards = function(){
  let allCards = [];
  if (localStorage.getItem('allCards')){
    for(let card of JSON.parse(localStorage.getItem('allCards'))){
      allCards.push(Card.loadCard(card));
    }
  }
  else {
    allCards =
    [
      new Card('What does CSS stand for?','Cascading Style Sheet', ['css']),
      new Card('What is a CSS selector?', 'Specifies which elements are to be influenced by the style rule', ['css']),
      new Card('How do you make a comment in CSS?', '/* comment */', ['css']),
      new Card('What is a property in CSS?', 'The style attribute you want to change', ['css']),
      new Card('What is a value in CSS?', 'Suggests how the property should be formatted', ['css']),
      new Card('What does the symbol # select in CSS?','the id attribute', ['css']),
      new Card('Which selector matches the name of any element type?', 'The Universal Selector', ['css']),
      new Card('How do we create a function in JS', 'function newFunction()', ['js']),
      new Card('How do we write the logical ‘and’?', '&&', ['js']),
      new Card('What code typically begins a for loop?', '(let i = 0; i < array.length; i++)', ['js']),
      new Card('How do you make a comment in javaScript', '// comment', ['js']),
      new Card('How do you create a variable in JavaScript?', 'let newVariable =', ['js']),
      new Card('Which HTML element is used to input JavaScript?', '<script>', ['html']),
      new Card('How do you make a comment in HTML', '<!-- comment -->', ['html']),
      new Card('What does HTML stand for', 'Hyper Text Markup Language', ['html']),
      new Card('What is the largest heading element?', '<h1>', ['html']),
      new Card('the <strong> element will?', 'make text bold', ['html']),
      new Card('How do you multiply in javaScript?', '*', ['js']),
      new Card('What does NaN stands for?', 'Not a Number', ['js']),
      new Card('Which CSS property specifies the right margin of an element?', ':margin-right', ['css']),
      new Card('What symbol is the operator for equals?', '==', ['js']),
      new Card('Which HTML element is used for creating an unordered list?', '<ul>', ['html']),
      new Card('Which HTML element will add a video to your page?', '<video>', ['html']),
      new Card('Which HTML element is used to make a header', '<header>', ['html'])
    ];
  }
  localStorage.setItem('allCards', JSON.stringify(allCards));
  return allCards;
};

Card.getCardsOfCategory = function(category){
  let categoryCards = [];
  for (let card of Card.loadAllCards()){
    if (card.hasCategory(category)){
      categoryCards.push(card);
    }
  }
  return categoryCards;
};

Card.addCardToAllCards = function(card){
  let allCards = Card.loadAllCards();
  allCards.push(card);
  localStorage.setItem('allCards', JSON.stringify(allCards));
};

/*
CardDeck Object
Description: Represents a collection of cards; a deck.
  category : string
  deck : Card array
*/
function CardDeck(category){
  this.category = category;
  this.deck = Card.getCardsOfCategory(category);
}

CardDeck.prototype.chooseRandomCard = function(){
// TO DO: choose a random card from this.deck and return it
};

CardDeck.prototype.getMultipleRandomCards = function(howMany){
// TO DO: choose 'howMany' random cards from this.deck and return them as an array / list

// return [cards]
};

CardDeck.prototype.addCard = function(card){
  //add a card to this deck and the 'all cards' list in local storage
  this.deck.push(card);
  Card.addCardToAllCards(card);
};

CardDeck.prototype.save = function(){
  localStorage.setItem('cDeck', JSON.stringify(this));
};

//turn JSON.parsed deck back into a CardDeck object
CardDeck.loadDeck = function(parsedDeck){
  let newDeck = new CardDeck();
  newDeck.category = parsedDeck.category;

  for (let card of parsedDeck.deck){
    newDeck.deck.push(Card.loadCard(card));
  }
  return newDeck;
};

CardDeck.loadAllDecks = function() {
  if (localStorage.getItem('allDecks')){
    let decks = JSON.parse(localStorage.getItem('allDecks'));
    let output = [];
    for (let d of decks){
      output.push(CardDeck.loadDeck(d));
    }
    return output;
  }
  else {
    return [];
  }
};

CardDeck.addDeckToAllDecks = function(deck){
  let decks = CardDeck.loadAllDecks();
  decks.push(deck);
  localStorage.setItem('allDecks', decks);
};

/*
User Object
Description: Represents a User
*/
function User(name){
  this.name = name;
  this.history = {};
}

User.prototype.record = function(card, correctOrNot){
  let key = card.question;
  if (!this.history[key]){
    this.history[key] = [correctOrNot];
  }
  else {
    this.history[key].push(correctOrNot);
  }
};

User.prototype.save = function(){
  localStorage.setItem('cUser', this);
};

User.load = function(parsedUser){
  let user = new User(parsedUser.name);
  user.history = parsedUser.history;
  return user;
};

User.loadAllUsers = function(){
  if (localStorage.getItem('allUsers')) {
    let allUsers = [];
    for(let user in JSON.parse(localStorage.getItem('allUsers'))){
      allUsers.push(User.load(user));
    }
    return allUsers;
  }
  else{
    return [];
  }
};

User.addUserToAllUsers = function(user){
  //TO DO
};

/*
 UserInterfaceObject
*/
function UserInterface(user, deck){
  this.user = user;
  this.deck = deck;
}

UserInterface.prototype.displayCard = function(){
  //TO DO
};

UserInterface.prototype.handleClick = function(event){
  //TO DO
};

////////////////////////////////////////////////////////////////




