const express = require('express');
const next = require('next');
const RSSParser = require('rss-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function getBlogPosts(limit, callback) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let myEntries = [];
  RSSParser.parseURL('https://blog.desandoval.net/feed', function(err, parsed) {

    if (err) {
      return callback("cannot get blog posts");
    }

    const entries = parsed.feed.entries;

    limit = limit || entries.length;
    for(let i=0; i<limit; i++){
      // clean up date
      const isoDate = new Date(entries[i].isoDate);
      let date = days[isoDate.getDay()] + ', '
        + isoDate.getDate() + ' '
        + months[isoDate.getMonth()] + ' '
        + isoDate.getFullYear();

      // assign to object
      myEntries[i] = {
        title: entries[i].title,
        link: entries[i].link,
        date: date,
      }
    }

    return callback(myEntries);
  });
}

app.prepare()
  .then(() => {
    const server = express();

    server.use(express.static(__dirname + '/static'));
    server.use(express.static(__dirname + '/node_modules/animate.css/animate.css'));

    server.get('/portfolio/:id', (req, res) => {
      const actualPage = '/portfolioItem';
      const queryParams = { title: req.params.id };
      app.render(req, res, actualPage, queryParams)
    });

    server.get('/blog/posts', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      getBlogPosts(req.query.limit, function(entries) {
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