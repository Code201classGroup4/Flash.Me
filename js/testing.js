//BEGIN CARD TESTING



//END CARD TESTING

//BEGIN CARD DECK TESTING

let d1 = new CardDeck('js');

//END CARD DECK TESTING

//BEGIN USER TESTING

let u1 = new User('Josh');
u1.record(d1.deck[0], false);
u1.record(d1.deck[0], false);
u1.record(d1.deck[0], true);
u1.record(d1.deck[0], false);
u1.record(d1.deck[1], true);
u1.record(d1.deck[2], false);
u1.record(d1.deck[1], true);

let stringifiedUser = JSON.stringify(u1);
let parsedUser = JSON.parse(stringifiedUser);
console.log(u1);
console.log(User.load(parsedUser));
console.log(d1);

//END USER TESTING

