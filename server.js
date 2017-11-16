const express = require('express');
const next = require('next');
const path = require('path');
const ServerHelper = require('./lib/serverHelper');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// cache portfolio list (async)
const helper = new ServerHelper(__dirname);
helper.getPortfolioList(null, function(err, entries) {
  if (err) {
    console.log(err);
  } else {
    console.log(entries.length + " items added/updated in the portfolio list")
  }
});

// start express
app.prepare()
  .then(() => {
    const server = express();

    server.use('/portfolio', express.static(path.join(__dirname, 'portfolio')));
    server.use(express.static(__dirname + '/static'));

    server.get('/portfolio/list', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      helper.getPortfolioList(req.query.limit, function(err, entries) {
        if (err) {
          res.status = 400;
          handle(req, res);
        }
        res.send(JSON.stringify(entries));
      })
    });

    server.get('/portfolio/:id', (req, res) => {
      const actualPage = '/portfolioItem';
      helper.getPortfolioPage(req.params.id, function(err, queryParams) {
        if (err) {
          res.status = 404;
          handle(req, res, req.url)
        } else {
          app.render(req, res, actualPage, queryParams)
        }
      });
    });

    server.get('/blog/posts', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      helper.getBlogPosts(req.query.limit, function(err, entries) {
        if (err) {
          res.status = 400;
          handle(req, res, req,url);
        }
        res.send(JSON.stringify(entries));
      })
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });