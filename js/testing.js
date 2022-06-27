//BEGIN CARD TESTING

let sampleCards = [
  new Card('Which is preferred for declaring variables, let or var?', 'let'),
  new Card('Is "let var == 4 valid statement?', 'No'),
  new Card('What does CSS stand for?', 'Cascading Style Sheets')
];

console.log(sampleCards[0].isCorrect('let'));
console.log(sampleCards[1].isCorrect('no'));
console.log(sampleCards[2].isCorrect('computers should style'));

//END CARD TESTING