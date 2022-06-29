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
let user = User.load(JSON.parse(localStorage.getItem('cUser')));
let deck = CardDeck.loadDeck(JSON.parse(localStorage.getItem('cDeck')));
let ux = new UserInterface(user, deck);

ux.chooseDeck(document.getElementById('chooseForm'));

let form = document.getElementById('addCard');
form.addEventListener('submit', handleAddCard);

function handleAddCard(event){
  event.preventDefault();
  let d = CardDeck.loadDeck(JSON.parse(localStorage.getItem('cDeck')));
  let q = event.target.elements['question'].value;
  let a = event.target.elements['answer'].value;
  let c = event.target.elements['category'].value;
  let newCard = new Card(q, a, c);
  d.addCard(newCard);
  d.save();
  alert(`${newCard.question} added to ${d.name}.`);
  location.reload();
}
