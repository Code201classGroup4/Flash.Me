'use strict';
/*
app.js will be included first on every page

localStorage key: allCards - an array of Card objects representing all cards added so far
localStorage key: allDecks - an array of CardDeck objects representing all decks saved so far
localStorage key: allUsers - an arra of User objects representing all users created so far
localStorage key: cUser - the current loaded user
localStorage key: cDeck - the current loaded deck

for question of user.history

Card(question, answer, categories)
CardDeck(category)
User(name)
UserInterface(user, deck)
*/
let questionsArray =[]
let correctArray = []
let incorrectArray = []

let aUser = user.load(JSON.parse(localStorage.getItem('cUser')));

function renderChart(){
for(question in aUser.history){
let answers = aUser.history[question]
let wrongAnswers = 0
let rightAnswers = 0
for(let i =0; i < answers.length; i++){
if (answers[i]==true){
  rightAnswers++;
}
else{wrongAnswers++}
}
questionsArray.push(question);
correctArray.push(rightAnswers);
incorrectArray.push(wrongAnswers);
}

};

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: questionsArray,
    datasets: [{
      label: '# of correct answers',
      data: correctArray,
      backgroundColor: '#04b3d5'
    }, {
      label: '# of incorrect answers',
      data: incorrectArray,
      backgroundColor: '#ffcc85'
    }],
  }
});