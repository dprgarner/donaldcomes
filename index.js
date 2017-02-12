const fs = require('fs');

const _ = require('lodash');

const SOURCE_WORDS = 'words.txt';
const SHUFFLED_WORDS = 'words_shuffled.txt';

function shiftShuffledWord() {
  let wordsString = fs.readFileSync(SHUFFLED_WORDS, 'utf8');
  let words = wordsString.split('\n');
  if (!wordsString) {
    words = _.shuffle(fs.readFileSync(SOURCE_WORDS, 'utf8').split('\n'));
  }
  let word = words.shift();
  fs.writeFileSync(SHUFFLED_WORDS, words.join('\n'));
  return word;
}

console.log(shiftShuffledWord())