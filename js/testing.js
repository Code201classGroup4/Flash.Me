localStorage.removeItem('allUsers');
localStorage.removeItem('allDecks');
localStorage.removeItem('allCards');
localStorage.removeItem('cUser');
localStorage.removeItem('cDeck');

//BEGIN CARD TESTING

/* let cards = Card.loadAllCards();
console.log(cards);
console.log(JSON.parse(localStorage.getItem('allCards')));
let cards2 = Card.loadAllCards();
console.log(cards2);
console.log(JSON.parse(localStorage.getItem('allCards')));
Card.addCardToAllCards(new Card('What does CSS stand for?','Cascading Style Sheet', ['css']));
Card.addCardToAllCards(new Card('Does CSS support animtaions?','yes', ['css']));
console.log(JSON.parse(localStorage.getItem('allCards'))); */

//END CARD TESTING

//BEGIN CARD DECK TESTING

let d1 = new CardDeck('HTML Deck', 'html');
let d2 = new CardDeck('CSS Deck', 'css');
let d3 = new CardDeck('JavaScript Deck', 'js');
console.log(d1.deck);
console.log(d2.deck);
console.log(d3.deck);
d1.save();
let cdeckParsed = JSON.parse(localStorage.getItem('cDeck'));
console.log(d1);
console.log(cdeckParsed);
console.log(CardDeck.loadDeck(cdeckParsed));

console.log(CardDeck.loadAllDecks());
CardDeck.addDeckToAllDecks(d1);
CardDeck.addDeckToAllDecks(d2);
console.log(CardDeck.loadAllDecks());
CardDeck.addDeckToAllDecks(d3);
console.log(CardDeck.loadAllDecks());
CardDeck.addDeckToAllDecks(d3);
console.log(CardDeck.loadAllDecks());


//END CARD DECK TESTING

//BEGIN USER TESTING

/* let u1 = new User('josh');
let u2 = new User('Ari');
let cards = d1.deck;
u1.record(cards[0], false);
u1.record(cards[0], false);
u1.record(cards[0], true);
u1.record(cards[1], false);
u1.record(cards[1], true);

u1.save();

console.log(User.loadAllUsers());
User.addUserToAllUsers(u1);
console.log(User.loadAllUsers());
User.addUserToAllUsers(u2);
console.log(User.loadAllUsers()); */

//END USER TESTING

