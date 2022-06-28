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
function renderChart(){

  
}

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: allCards,
    datasets: [{
      label: 'Questions',
      data: questionSeen,
      backgroundColor: '#04b3d5'
    }, {
      label: '# of correct answers',
      data: answeredCorrect,
      backgroundColor: '#ffcc85'
    }],
  }
});