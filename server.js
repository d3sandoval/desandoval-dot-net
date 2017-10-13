const express = require('express');
const next = require('next');
const RSSParser = require('rss-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function getBlogPosts(callback) {
  let myEntries = [];
  RSSParser.parseURL('https://blog.desandoval.net/feed', function(err, parsed) {

    if (err) {
      return callback("cannot get blog posts");
    }

    const entries = parsed.feed.entries;
    for(let i=0; i<entries.length; i++){
      myEntries[i] = {
        title: entries[i].title,
        link: entries[i].link,
        pubDate: entries[i].pubDate,
      }
    }

    return callback(myEntries);
  });
}

app.prepare()
  .then(() => {
    const server = express();

    server.use(express.static(__dirname + '/static'));

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { title: req.params.id };
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/blog/posts', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      getBlogPosts(function(entries) {
        res.send(JSON.stringify(entries));
      })
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });