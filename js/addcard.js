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


// shows the username and current deck ONLY if p loads //
if (p) { p.textContent = `User: ${ux.user.name}. Current Deck: ${ux.user.currentDeck.name}.`
;}

ux.chooseDeck(document.getElementById('chooseForm'));

let form = document.getElementById('addCard');
form.addEventListener('submit', handleAddCard);

function handleAddCard(event){
  event.preventDefault();
  let q = event.target.elements['question'].value;
  let a = event.target.elements['answer'].value;
  let c = event.target.elements['category'].value;
  let newCard = new Card(q, a, c);
  ux.user.currentDeck.addCard(newCard);
  ux.user.save();
  alert(`${newCard.question} added to ${ux.user.currentDeck.name}.`);
  location.reload();
}
