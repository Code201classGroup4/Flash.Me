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
let cUser = JSON.parse(localStorage.getItem('cUser'));


let datalist = document.getElementById('user-name-list');
let users = User.loadAllUsers();
for (let u of users){
  let option = document.createElement('option');
  option.value = u.name;
  datalist.appendChild(option);
}

let form = document.getElementById('user-name-form');
form.addEventListener('submit', handleSubmit);

if (cUser){
  cUser = User.load(cUser);
  logIn(cUser, false);
}

function handleSubmit(event){
  event.preventDefault();
  let username = event.target['user-name-input'].value;
  for (let user of users){
    if (user.name === username){
      user.save();
      logIn(user, false);
      return;
    }
  }
  let newUser = new User(username);
  newUser.save();
  User.addUserToAllUsers(newUser);
  logIn(newUser, true);
}

function logIn(user, isNew){
  let ux = new UserInterface(user, null);
  let h1 = document.querySelector('div > h1');
  if (isNew){
    h1.textContent = `User ${user.name} Created and Logged In`;
  }
  else {
    h1.textContent = `Previous User ${user.name} is Logged In.`;
  }
  ux.chooseDeck(document.getElementById('chooseDeck'));
}