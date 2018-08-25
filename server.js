/* eslint-disable no-console */
/* global url */
const express = require('express');
const next = require('next');
const path = require('path');
const helmet = require('helmet');
const ServerHelper = require('./lib/serverHelper');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

require('dotenv').config();

// cache content (async)
const helper = new ServerHelper(__dirname);
helper.getPortfolioList(null, null, (err, entries) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`> ${entries.length} items added/updated in the portfolio cache`);
  }
});
helper.getBlogPosts('blog', 4, (err, entries) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`> ${entries.length} items added/updated in the blog cache`);
  }
}, true);
helper.getBlogPosts('wallabag', 10, (err, entries) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`> ${entries.length} items added/updated in the wallabag cache`);
  }
}, true);
helper.getRecentTracks(5, (err, entries) => {
  if (err) {
    console.log(err);
  }
  console.log(`> ${entries.length} items added/updated in the recent tracks cache`);
});


// url redirect map
const redirects = [
  { from: '/i-am', to: '/iam' },
  { from: '/design-web', to: '/portfolio' },
  { from: '/art-music', to: '/portfolio' },
  { from: '/calendar', to: 'https://calendly.com/d3sandoval/30min' },

];

// start express
app.prepare()
  .then(() => {
    const server = express();

    server.use(helmet());

    server.use(express.static(`${__dirname}/static`));

    // handle 301 redirection for outdated urls
    redirects.forEach(({
      from, to, type = 301, method = 'get',
    }) => {
      server[method](from, (req, res) => {
        res.redirect(type, to);
      });
    });

    server.get('/portfolio/list', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      helper.getPortfolioList(req.query.limit, req.query.featured, (err, entries) => {
        if (err) {
          res.status = 400;
          handle(req, res);
        }
        res.send(JSON.stringify(entries));
      });
    });

    server.get('/portfolio/:id', (req, res) => {
      const actualPage = '/portfolioItem';
      helper.getPortfolioPage(req.params.id, (err, queryParams) => {
        if (err) {
          res.status = 404;
          handle(req, res, req.url);
        } else {
          app.render(req, res, actualPage, queryParams);
        }
      });
    });

    // image handler
    // todo resize images based on responsive headers
    server.get('/portfolio/:id/resources/:image', (req, res) => {
      res.sendFile(path.join(__dirname, 'portfolio', req.params.id, 'resources', req.params.image));
    });

    server.get('/blog/posts', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      helper.getBlogPosts('blog', req.query.limit, (err, entries) => {
        if (err) {
          res.status = 400;
          handle(req, res, req.url);
        }
        res.end(JSON.stringify(entries));
      }, false);
    });

    server.get('/lastfm/:request', (req, res) => {
      switch (req.params.request) {
        case 'recent':
          helper.getRecentTracks(req.query.limit, (err, entries) => {
            if (err) {
              res.status = 400;
              handle(req, res, req.url);
            }
            res.send(JSON.stringify(entries));
          });
          break;
        default:
          res.status = 400;
          handle(req, res, req, url);
      }
    });

    server.get('/wallabag/:request', (req, res) => {
      switch (req.params.request) {
        case 'recent':
          helper.getBlogPosts('wallabag', req.query.limit, (err, entries) => {
            if (err) {
              res.status = 400;
              handle(req, res, req.url);
            }
            res.send(JSON.stringify(entries));
          }, false);
          break;
        default:
          res.status = 400;
          handle(req, res, req, url);
      }
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
