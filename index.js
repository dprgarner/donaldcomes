const fs = require('fs');

const _ = require('lodash');
const Twit = require('twit');

const {twitterAuth} = require('./auth');
const zalgo = require('./zalgo');

const SOURCE_WORDS = 'words.txt';
const SHUFFLED_WORDS = 'words_shuffled.txt';

const client = new Twit(twitterAuth);

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

function updateStatus(params) {
  return new Promise((resolve, reject) => {
    client.post('statuses/update', params, function (err, data, response) {
      if (err) return reject(err);
      console.log('Updated status');
      resolve(data);
    });
  });
};

function waitUntilDueTime() {
  return new Promise((resolve, reject) => {
    // Wait until the next hour.
    let tweetInterval = 100;// 1000 * 60 * 60;
    let msUntilTime = tweetInterval - (Date.now() % tweetInterval);
    setTimeout(resolve, msUntilTime);
  });
}

function waitAndTweet() {
  let status;
  while (!status) {
    status = constructTweetText(shiftShuffledWord()); 
  }
  return waitUntilDueTime()
  .then(() => updateStatus({status}))
  .then(() => waitAndTweet())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

waitAndTweet();
