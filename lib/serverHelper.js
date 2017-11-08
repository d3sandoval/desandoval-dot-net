const RSSParser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const redis = require('redis');

class ServerHelper {

  constructor(runPath) {
    this.runPath = runPath;
    this.client = redis.createClient();
    this.client.on("error", function (err) {
      console.log("Redis Error: " + err);
    });
  }

  getBlogPosts(limit, callback) {
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

  readPortfolioEntry(key, callback) {
    const p = path.join(this.runPath, '/portfolio/', key);

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
          let entry = {
            content: template[1]
          };

          // then split by newlines
          let keys = template[0].split('\n').map(pair => pair.split(":"));

          // add to callback
          keys.forEach(([key, value]) => entry[key] = String(value).trim());

          delete entry['']; // cleanup (not sure if this will break things)
          return callback(entry);
        } else {
          console.log(err);
        }
      });
    });
  }

  // convert to ~cache~ portfolio list
  // getportfoliolist will simply check the list of dirs (and updated times) against
  //  the list in redis, if it finds one out of place (or out of date), it'll get the
  //  new one. otherwise, it'll just return the relevant data from redis
  getPortfolioList(limit, callback) {
    const p = path.join(this.runPath, '/portfolio');

    // get all directories in portfolio path
    const isDirectory = source => fs.lstatSync(source).isDirectory();
    const getDirectories = source =>
      fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

    const dirs = getDirectories(p);
    const filterLength = p.length + 1; // cleanup path

    // get data for each page
    let data = [];
    dirs.forEach((dir) => {
      fs.stat(dir, (err, stats) => {
        if (err) {
          return callback(err)
        }

        let key = dir.slice(filterLength);

        this.client.hgetall(key, (err, storedData) => {
          let listEntry; // instantiate listEntry
          if (!err && new Date(storedData.mtime > stats.mtime)) {
            listEntry = storedData;
          } else {
            this.readPortfolioEntry(key, (entry) => {
              entry.mtime = stats.mtime;
              this.client.hmset(key, entry);
              listEntry = entry;
            });
          }

          listEntry.id = key;

          if (listEntry.content) { // too much to send over the wire
            delete listEntry.content;
          }

          data.push(listEntry);

          if (data.length === dirs.length) {
            data.sort(function(a,b) {
              return new Date(b.date) - new Date(a.date);
            });

            if (limit) {
              data = data.slice(0, limit);
            }
            callback(data); // todo, only return the amount the limit requests
          }
        });
      });
    });
  }

  getPortfolioPage(id, callback) {
    // first, check redis
    fs.stat(path.join(this.runPath, 'portfolio', id), (err, stats) => {
      if (err) {
       return callback(err)
      }
      this.client.hgetall(id, (err, storedData) => {
        if (new Date(storedData.mtime > stats.mtime)) {
          return callback(storedData);
        } else {
          // if empty, update redis first
          this.readPortfolioEntry(id, (entry) => {
            entry.mtime = stats.mtime;
            this.client.hmset(id, entry);
            return callback(entry);
          });
        }
      });
    });
  }
}

module.exports = ServerHelper;