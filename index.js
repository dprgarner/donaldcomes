const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const Twit = require('twit');

const zalgo = require('./zalgo');

const WORDS_DIR = process.env.WORDS_DIR || '.';
const SOURCE_WORDS = 'words.txt';
const SHUFFLED_WORDS = path.join(WORDS_DIR, 'words_shuffled.txt');

const LIVE = !!(process.env.LIVE || '').trim();
const client =
  LIVE &&
  new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

function shiftShuffledWord() {
  let wordsString;
  if (!fs.existsSync(SHUFFLED_WORDS)) {
    wordsString = '';
  } else {
    wordsString = fs.readFileSync(SHUFFLED_WORDS, 'utf8');
  }
  let words = wordsString.split('\n');
  if (!wordsString) {
    words = _.shuffle(fs.readFileSync(SOURCE_WORDS, 'utf8').split('\n'));
  }
  let word = words.shift();
  fs.writeFileSync(SHUFFLED_WORDS, words.join('\n'));
  return word;
}

function constructTweetText(word) {
  // If the Zalgo'ed tweet is too long, don't try and tweet it.
  for (let i = 0; i < 20; i++) {
    let trialText = zalgo(`MAKE AMERICA ${word.toUpperCase()} AGAIN`);
    if (trialText.length <= 140) return trialText;
  }
}

function updateStatus(params) {
  if (!LIVE) return;

  return new Promise((resolve, reject) => {
    client.post('statuses/update', params, function(err, data, response) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function waitFor(msUntilTime) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, msUntilTime);
  });
}

function waitUntilDueTime() {
  // Wait until the next hour.
  let tweetInterval = 1000 * 60 * 60;
  let msUntilTime = tweetInterval - (Date.now() % tweetInterval) - 1000 * 15;
  console.log('Waiting for next tweet time...');
  return waitFor(LIVE ? msUntilTime : 5000);
}

function waitAndTweet() {
  let status, word;

  // Probably only topical for a couple of weeks
  const covfefeTime = 1496120760000;
  const daysAfterCovfefe = (new Date() - covfefeTime) / (1000 * 60 * 60 * 24);
  if (Math.random() > daysAfterCovfefe / 14 && Math.random() > 0.5) {
    word = 'covfefe';
    status = constructTweetText('covfefe');
  }
  while (!status) {
    word = shiftShuffledWord();
    status = constructTweetText(word);
  }
  return waitUntilDueTime()
    .then(() => updateStatus({ status }))
    .then(() => {
      console.log(`MAKE AMERICA ${word.toUpperCase()} AGAIN`);
      return waitFor(LIVE ? 1000 * 60 : 0);
    })
    .then(() => waitAndTweet());
}

waitAndTweet().catch(err => {
  console.error(err);
  process.exit(1);
});
