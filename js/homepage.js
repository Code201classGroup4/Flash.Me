'use strict';

/*
app.js will be included first on every page

localStorage key: allCards - an array of Card objects representing all cards added so far
localStorage key: allUsers - an arra of User objects representing all users created so far
localStorage key: cUser - the current loaded user

Card(question, answer, categories)
CardDeck(category)
User(name)
UserInterface(user)
*/
let parsedUser = JSON.parse(localStorage.getItem('cUser'));
let datalist = document.getElementById('user-name-list');
let users = User.loadAllUsers();

for (let u of users){
  let option = document.createElement('option');
  option.value = u.name;
  datalist.appendChild(option);
}

let form = document.getElementById('user-name-form');
form.addEventListener('submit', handleSubmit);

if (parsedUser){
  let user = User.load(parsedUser);
  logIn(user, false);
}

function handleSubmit(event){
  event.preventDefault();
  let username = event.target['user-name-input'].value;
  for (let u of users){
    if (u.name === username){
      u.save();
      logIn(u, false);
      return;
    }
  }
  let newUser = new User(username);
  newUser.save();
  logIn(newUser, true);
}

function logIn(u, isNew){
  let ux = new UserInterface(u);
  let h1 = document.querySelector('div > h1');
  if (isNew){
    h1.textContent = `User ${u.name} Created and Logged In`;
  }
  else {
    h1.textContent = `Previous User ${u.name} is Logged In.`;
  }
  ux.chooseDeckBoxes(document.getElementById('chooseDeck'));

  let p = document.getElementById('login-info');
  if (p){
    p.textContent = `User: ${ux.user.name}. Current Deck: ${ux.user.currentDeck.name}.`;
  }
}
