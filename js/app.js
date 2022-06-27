'use strict';
/* app.js will be included on every page */


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

Card.prototype.isCorrect = function(usersAnswer){
  if (this.answer.toLowerCase() === usersAnswer.toLowerCase()){
    return true;
  }
  else return false;
};

/*
CardDeck Object
Description: Represents a collection of cards; a deck.
- currentCard : the currently selected card for displaying to and quizzing the user
- allCards : all cards created so far (could be stored in local storage)
*/
function CardDeck(){
  this.currentCard;
  this.currentDeck = [];
  this.allCards = [];
}

CardDeck.prototype.buildDeck = function(category, listOfAllCards){
  //TO DO: Fill this.currentDeck with cards from "listOfAllCards" that have the "category" in their list of categories.
};

CardDeck.prototype.chooseCard = function(){
  //TO DO: randomly select a card from this.currentDeck and assign it to this.currentCard
};

/*
User Object
Description: Represents a User
*/
function User(name){
  this.name = name;
  this.history = {};
}

this.prototype.record = function(card, correctOrNot){
//record the user's result
//card:  the Card the user attempted to answer
//correctOrNot: true if user was correct, false if user was wrong
//TO DO: add this.history[card]  =  [correct, date]
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






