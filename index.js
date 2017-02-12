const fs = require('fs');

const _ = require('lodash');

const zalgo = require('./zalgo');

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

function constructTweetText(word) {
  // If the word is too long, don't try and tweet it.
  for (let i = 0; i < 20; i++) {
    let trialText = zalgo(`MAKE AMERICA ${word.toUpperCase()} AGAIN`);
    if (trialText.length <= 140) return trialText;
  }
}

console.log(constructTweetText(shiftShuffledWord()))
