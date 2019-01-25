# desandoval-dot-net

![](https://travis-ci.org/d3sandoval/desandoval-dot-net.svg?branch=master)

This repository contains all of the source code for [DESandoval.net](https://desandoval.net) - the personal website for Daniel E. Sandoval. This repository is meant to showcase the code used to create a dynamic portfolio website using static markdown files as the main source of content.

All contributions are by [@d3sandoval](https://github.com/d3sandoval) unless otherwise specified in a commit message/author.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* the [latest node and npm versions](https://docs.npmjs.com/all#how-to-install-npm--manage-npm-versions).
* a local redis database for development with the cache. [Quick Start](https://redis.io/topics/quickstart)

### Installing
To get started, simply run:

```
npm install
```

You'll need a `.env` file with the following items:
```
LASTFM_API_KEY=YOUR_KEY_HERE
PORT=8080
```

Other environment variables available are:
```
REDIS_HOSTNAME=IP_ADDRESS_OR_FQDN
REDIS_PORT_NUMBER=SOME_PORT
REDIS_PASSWORD=YOUR_PASSWORD_HERE
```
^ Use these if you have a remote or unique redis instance that you'd like to connect to.


The `dev` script will start up a local redis database and an HMR-ready environment:

```
npm run dev
```

You'll see an output like:
```
> desandoval-dot-net@1.0.0 dev /Users/admin/projects/desandoval-dot-net
> redis-server /usr/local/etc/redis.conf > ./redis.log | node server.js

> Using external babel configuration
> Location: "/Users/admin/projects/desandoval-dot-net/.babelrc"
> Using "webpack" config function defined in next.config.js.
> 17 items added/updated in the portfolio cache
> 4 items added/updated in the blog cache
> 10 items added/updated in the wallabag cache

DONE  Compiled successfully in 2358ms

> Ready on http://localhost:8080
```

## Running the tests

There are no tests... I'm working on that.

### End to End Tests

Right now, just click around to the various pages and make sure things are working

### And coding style tests

Coming Soon.


## Deployment

The app is currently deployed on [heroku](https://heroku.com).

## Built With

* [Next.js](https://github.com/zeit/next.js) - The web framework used
* [Material-UI](https://github.com/mui-org/material-ui) - React components that implement Google's Material Design.
* [React](https://reactjs.org/) - Javascript UI
* [Redis](https://redis.io/) - Used to cache server responses
* [react-markdown](https://github.com/rexxars/react-markdown) - Used to parse the portfolio pages
* [rss-parser](https://www.npmjs.com/package/rss-parser) - Used for parsing my blog feeds

## Contributing

Please open up an issue or PR if you see something you'd like to change.

## Versioning

I'm just making up the version numbers at this point. If somebody starts using some of my code as a dependency, I may think about versioning.

## Authors

* **Daniel E. Sandoval** - [DESandoval.net](https://desandoval.net)

## License

This project is licensed under [Creative Commons Attribution-NoDerivatives 4.0](https://creativecommons.org/licenses/by-nd/4.0/legalcode)

## Acknowledgments

* The next.js and material-ui communities for being so helpful!
* My partner, Libby, for being so patient with me as I figured out how to build this

