const RSSParser = require('rss-parser');
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const redis = require('redis');

class ServerHelper {

  // global run path and redis connection
  constructor(runPath) {
    this.runPath = runPath;
    this.client = redis.createClient();
    this.client.on("error", function (err) {
      console.error("Redis Error: " + err);
    });
  }

  // helper for server.get('/blog/posts'
  // and server.get('/wallabag/:request'
  // todo more performant cache for faster response
  getBlogPosts(type, limit, callback, refetch) {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.client.get(type, (err, storedData) => {
      if (err) {
        console.error(err)
      }

      if(!refetch && storedData) {
        let fetchedStore = JSON.parse(storedData);
        callback(null, fetchedStore);
        return;
      };

      this.fetchBlogPosts(type, (err, fetched) => {
        if (err) {
          console.error(err);
        }

        const entries = fetched.feed.entries;



        // if no callback occurs above
        let myEntries = [];

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
            isoDate: isoDate,
          }
        }

        this.client.set(type, JSON.stringify(myEntries));
        callback(null, myEntries);
      });
    });
  }

  fetchBlogPosts(type, callback) {
    let url;
    switch (type) {
      case 'wallabag':
        url = 'http://wallabag.desandoval.net/daniel/Uie7r5pfgWbD7eH/unread.xml';
        break;
      case 'blog':
        url = 'https://blog.desandoval.net/feed';
        break;
      default:
        url = 'https://blog.desandoval.net/feed';
    }

    RSSParser.parseURL(url, function(err, parsed) {
      if (err) {
        return callback(err);
      }

      return callback(null, parsed);
    });
  }

  // helper for server.get('/lastfm/:request'
  // when request == recent
  getRecentTracks(limit, callback) {
    let data = "";
    let params = {
      method: 'user.getrecenttracks',
      user: 'd3sandoval',
      api_key: process.env.LASTFM_API_KEY,
      format: 'json',
    };

    if (limit) {
      params.limit = limit;
    }

    const req = http.request({
                              host: 'ws.audioscrobbler.com',
                              path: '/2.0/?' + querystring.stringify(params),
                            }, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        callback(null, data);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();
  }

  // helper for server.get('/portfolio/list'
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
          if (!err) {
            this.isUpdated(
              key,
              (storedData) ? new Date(storedData.mtime) : new Date(0),
              stats.mtime,
              function(updated) {
              if (!updated) {
                listEntry = storedData;
              } else {
                listEntry = updated;
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
                callback(null, data);
              }
            });
          }
        });
      });
    });
  }

  // helper for server.get('/portfolio/:id'
  getPortfolioPage(id, callback) {
    // first, check redis
    fs.stat(path.join(this.runPath, 'portfolio', id), (err, stats) => {
      if (err) {
       return callback(err)
      }
      this.client.hgetall(id, (err, storedData) => {
        this.isUpdated(
          id,
          (storedData) ? new Date(storedData.mtime) : 0,
          stats.mtime,
          function(updated) {
            if (!updated) {
              return callback(null, storedData);
            } else {
              return callback(null, updated);
            }
          });
      });
    });
  }

  // returns false if cached portfolio entry is latest
  // returns latest portfolio entry content (read from filesystem)
  isUpdated(key, storedmtime, filemtime, callback) {
    if (Math.floor(storedmtime.getTime() / 1000) >= Math.floor(filemtime.getTime() / 1000)) {
      callback(false);
    } else {
      this.readPortfolioEntry(key, (entry) => {
        entry.mtime = filemtime;
        this.client.hmset(key, entry);
        callback(entry);
      });
    }
  }

  // returns the parsed markdown file for a given key from the filesystem
  readPortfolioEntry(key, callback) {
    const p = path.join(this.runPath, '/portfolio/', key);

    fs.readdir(p, function (err, files) {
      if (err) {
        return callback(err)
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
        console.error('parser does not support more than one markdown file. Using first in directory')
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
          return callback(err);
        }
      });
    });
  }
}

module.exports = ServerHelper;