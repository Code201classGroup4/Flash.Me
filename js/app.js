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

//add a category tag to a card
Card.prototype.addCategory = function(category){
  this.categories.push(category);
};

//check if a card has a given category tag
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
  for (let c of allCards) {
    if (c.question === card.question){
      return;
    }
  }
  allCards.push(card);
  localStorage.setItem('allCards', JSON.stringify(allCards));
};

/*
CardDeck Object
Description: Represents a collection of cards; a deck.
  category : string
  deck : Card array
*/
function CardDeck(name, category){
  this.name = name;
  this.categories = [category];
  this.deck = Card.getCardsOfCategory(category);
}

CardDeck.prototype.getRandomCard = function(){
  let length = this.deck.length;
  let randomIndex = Math.floor(Math.random() * length);
  let randomCard = this.deck[randomIndex];
  return randomCard;
};

CardDeck.isInDeck = function(card, deck){
  for (let c of deck){
    if(c.question === card.question){
      return true;
    }
  }
  return false;
};

CardDeck.prototype.getMultipleRandomCards = function(howMany){
  let cards = [];
  while (cards.length < howMany && cards.length < this.deck.length){
    let card = this.getRandomCard();
    if (CardDeck.isInDeck(card, cards)){
      continue;
    }
    else{
      cards.push(card);
    }
  }
  return cards;
};

CardDeck.prototype.addCard = function(card){
  //add a card to this deck and the 'all cards' list in local storage
  this.deck.push(card);
  Card.addCardToAllCards(card);
};

CardDeck.prototype.addCategory = function(category){
  for (let card of Card.getCardsOfCategory(category)){
    this.push(card);
  }
  this.categories.push(category);
};

/* CardDeck.prototype.save = function(){
  localStorage.setItem('cDeck', JSON.stringify(this));
}; */

//turn JSON.parsed deck back into a CardDeck object
CardDeck.load = function(parsedDeck){
  let newDeck = new CardDeck();
  newDeck.name = parsedDeck.name;
  newDeck.categories = parsedDeck.categories;

  for (let card of parsedDeck.deck){
    newDeck.deck.push(Card.loadCard(card));
  }
  return newDeck;
};

CardDeck.combineDecks = function(anArrayOfDecks){
  let newDeck = new CardDeck('Combined','html');
  newDeck.deck = [];
  for (let d of anArrayOfDecks){
    newDeck.name = newDeck.name + ' + ' + d.name;
    for (let cat of d.categories){
      newDeck.categories.push(cat);
    }
    for (let c of d.deck){
      newDeck.deck.push(c);
    }
  }
  return newDeck;
};

/*
User Object
Description: Represents a User
*/
function User(name){
  this.name = name;
  this.history = {};
  this.decks = [new CardDeck(`${name}'s HTML Deck`, 'html'), new CardDeck(`${name}'s CSS Deck`, 'css'), new CardDeck(`${name}'s JavaScript Deck`, 'js')];
  this.currentDeck = this.decks[0];
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

User.load = function(parsedUser){
  let user = new User(parsedUser.name);
  user.history = parsedUser.history;
  user.decks = [];
  for (let d of parsedUser.decks){
    user.decks.push(CardDeck.load(d));
  }
  for (let d of user.decks){
    if (d.name === parsedUser.currentDeck.name){
      user.currentDeck = d;
    }
  }
  return user;
};

User.loadAllUsers = function(){
  let allUsers = JSON.parse(localStorage.getItem('allUsers'));
  if (allUsers){
    let output = [];
    for (let u of allUsers){
      let user = User.load(u);
      output.push(user);
    }
    return output;
  }
  else {
    localStorage.setItem('allUsers',JSON.stringify([]));
    return [];
  }
};

User.addUserToAllUsers = function(user){
  let allUsers = User.loadAllUsers();
  for (let i = 0; i < allUsers.length; i++){
    if(allUsers[i].name.toLowerCase() === user.name.toLowerCase()){
      allUsers[i] = user;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      return;
    }
  }
  allUsers.push(user);
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
};

User.prototype.save = function(){
  localStorage.setItem('cUser', JSON.stringify(this));
  User.addUserToAllUsers(this);
};

/*
 UserInterfaceObject
*/
function UserInterface(user){
  this.user = user;
}

UserInterface.prototype.chooseDeck = function(section){
  section.innerHTML = '';
  let label = document.createElement('label');
  label.textContent = 'Choose a Deck:';
  label.id = "deck-choice-label";
  section.appendChild(label);
  for (let d of this.user.decks){
    let button = document.createElement('button');
    button.textContent = d.name;
    button.addEventListener('click', handleDeckSelect);
    section.appendChild(button);
  }
  let user = this.user;
  function handleDeckSelect(event){
    section.innerHTML = '';
    let deckName = event.target.textContent;
    for (let d of user.decks){
      if (d.name === deckName){
        user.currentDeck = d;
        user.save();
        section.innerHTML = '';
        let h1 = document.createElement('h1');
        h1.textContent = `Current Deck is: ${user.currentDeck.name}`;
        section.appendChild(h1);

        let p = document.getElementById('login-info');
        if (p){
          p.textContent = `User: ${ux.user.name}. Current Deck: ${ux.user.currentDeck.name}.`;
        }
      }
    }
  }
};

UserInterface.prototype.chooseDeckBoxes = function(section){
  //TO DO: make a new choose deck function that creates checkboxes based off of this.user.decks
  // 1. Generate checkboxes from this.user.decks
  section.innerHTML = '';
  let decks = this.user.decks;
  let theUser = this.user;
  let deckNumber = 0;
  let checkboxValues = [];
  for (let d of decks){
    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = `checkbox${deckNumber}`;
    inputElement.name = inputElement.id;
    inputElement.value = d.name;
    checkboxValues.push(inputElement.value);

    let label = document.createElement('label');
    label.textContent = d.name;
    label.for = inputElement.id;
    deckNumber++;
    
    section.appendChild(inputElement);
    section.appendChild(label);
  }
  // 2. Add a button 'Choose Decks'
  let button = document.createElement('button');
  button.textContent = 'Choose Decks';
  // 3. Add an Event Handler to the button
  button.addEventListener('click', handleCheckSelectAdd);
  section.appendChild(button);

  function handleCheckSelectAdd(event){
    button.removeEventListener('click', handleCheckSelectAdd);
    // 4. Write an event handling function for the button:
    //  4.A. Make a list (array) with an entry that is the deck name for each box that was checked
    let checkedBoxNodes = document.querySelectorAll('input:checked');
    let checkedBoxNames = [];
    for (let node of checkedBoxNodes){
      checkedBoxNames.push(node.value);
    }
    //  4.B. Make an empty list (array) to store chosen decks
    let chosenDecks = [];
    //4.C. Loop through the names list
    for (let dName of checkedBoxNames){
      //4.D. For each name in the deck names list, loop through this.user.decks
      for (let d of decks){
        //4.E. if a name in the checked boxes list matches a name in this.user.decks, add the deck to the chosen decks list
        if (d.name === dName){
          chosenDecks.push(d);
        }
      }
    }
    //4.F. after all chosen decks are added to the list, pass the list to the CardDeck.combineDecks(AnArrayOfDecks) method
    let newDeck = CardDeck.combineDecks(chosenDecks);
    //4.G assign the new deck to user current deck and add it to user decks
    theUser.currentDeck = newDeck;
    theUser.decks.push(newDeck);
    //4.H save the user
    theUser.save();

    section.innerHTML = '';
    let h1 = document.createElement('h1');
    h1.textContent = `Current Deck is: ${theUser.currentDeck.name}`;
    section.appendChild(h1);

    let p = document.getElementById('login-info');
    if (p){
      p.textContent = `User: ${ux.user.name}. Current Deck: ${ux.user.currentDeck.name}.`;
    }
  }
}
