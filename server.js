const express = require('express');
const next = require('next');
const RSSParser = require('rss-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const fs = require('fs');
const path = require('path');

/* todo move these functions into a helper lib */
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

function getPortfolioPage(id, callback) {
  const p = path.join(__dirname, '/portfolio/', id)

  fs.readdir(p, function (err, files) {
      if (err) {
        return callback('404')
      }

      let page = files.map(function (file) {
        return path.join(p, file);
      }).filter(function( file ) {
        return file.match(/.*\.(md)/ig);
      });
      if (page.length < 1) {
        return callback('404');
      }
      else if (page.length > 1) {
        console.log('parser does not support more than one markdown file. Using first in directory')
      }

      fs.readFile(page[0], {encoding: 'utf-8'}, function(err,data){
        if (!err) {
          // first split by content
          let template = data.split('content:'); // content will be template[1]

          // start building callback
          let queryParams = {
            content: template[1]
          };

          // then split by newlines
          let keys = template[0].split('\n').map(pair => pair.split(":"));

          // add to callback
          keys.forEach(([key, value]) => queryParams[key] = value);

          delete queryParams['']; // cleanup (not sure if this will break things)
          return callback(queryParams);
        } else {
          console.log(err);
        }
      });
    });
}

app.prepare()
  .then(() => {
    const server = express();

    server.use('/portfolio', express.static(path.join(__dirname, 'portfolio')));
    server.use(express.static(__dirname + '/static'));

    server.get('/portfolio/:id', (req, res) => {
      const actualPage = '/portfolioItem';
      getPortfolioPage(req.params.id, function(queryParams) {
        if (queryParams === '404') {
          res.status = 404;
          handle(req, res, req.url)
        } else {
          app.render(req, res, actualPage, queryParams)
        }
      });
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