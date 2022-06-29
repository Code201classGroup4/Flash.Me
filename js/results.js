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
let questionsArray =[];
let correctArray = [];
let incorrectArray = [];

let aUser = User.load(JSON.parse(localStorage.getItem('cUser')));

function renderChart(){
  for(let question in aUser.history){
    let answers = aUser.history[question];
    let wrongAnswers = 0;
    let rightAnswers = 0;
    for(let i =0; i < answers.length; i++){
      if (answers[i] === true){
        rightAnswers++;
      }
      else{
        wrongAnswers++;
      }
    }
    questionsArray.push(question);
    correctArray.push(rightAnswers);
    incorrectArray.push(wrongAnswers);
  }
}

renderChart();
let ctx = document.getElementById('myChart');

Chart.defaults.font.size = 18;
Chart.defaults.color = "white"


new Chart(ctx, {
  type: 'bar',
  backgroundColor:'red',
  data: {
    labels: questionsArray,
    font: {
      color: 'white',
      size: 20,
    },
    
    datasets: [{
      label: '# of correct answers',
      
      data: correctArray,
      backgroundColor: '#FCD023',
      
    }, {
      label: '# of incorrect answers',
      data: incorrectArray,
      backgroundColor: '#2531DB',
    }],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: {
        ticks: { color: 'white', beginAtZero: true, },
        yAxes: [{
          ticks: {
            fontSize: 50,
          }
        }]
      },
      x: {
        ticks: { color: 'white', beginAtZero: true }
      }
    }
  }
});

