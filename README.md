# The Donald Comes

A quick Twitter bot that brings C̭̟͈̤̩̤̗̭͉̣̺̱̲̺͚͎͂ͨ͗͑̈́̎ͬ͒͋̈ͧͥ͛Ȟ̦̻͇̘̰̻̣̦͓͔͛ͬ̌̌̓̆̐̓̈́ͪͨͯͥͧA̩̯̞̥ͦ͗̓ͤ̐ͯ̀͑ͨ̾̆͊ͮ̒O̦͙͈̬̔̅̃ͬ͌Ŝ̟͖ͮͫ̂́͑ͨ̂͛ͅ.

Lives at: https://twitter.com/TheDonaldComes

Collaboration with [@Bekkhilde](https://twitter.com/bekkhilde).

## Running locally with Docker

If using docker-machine, unset any docker-machine variables with:

```bash
eval $(docker-machine env -u)
```

Then run locally with:

```bash
docker-compose up
```

To actually make the bot tweet, first create a `.env` file with the creditials for a Twitter app, stored in the variables `CONSUMER_KEY`, `CONSUMER_SECRET`, `ACCESS_TOKEN`, `ACCESS_TOKEN_SECRET`. Also, set the env variable `LIVE` to any value.

## Running on a Raspberry Pi with Docker

[Set up a Raspberry Pi env with docker-machine](https://gist.github.com/calebbrewer/c41cab61216d8845b59fcc51f36343a7). Set the env variables with:

```bash
eval $(docker-machine env <MACHINE_NAME>)
```

Next, build and run the container with:

```bash
docker-compose -f docker-compose.yml -f docker-compose.pi.yml up --build -d
```

The Raspberry Pi version runs in live mode by default.
