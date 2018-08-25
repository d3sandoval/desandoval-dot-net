/* eslint-disable no-console */
const RSSParser = require('rss-parser');
const mediumJSONFeed = require('medium-json-feed');
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const redis = require('redis');

class ServerHelper {
  // global run path and redis connection
  constructor(runPath) {
    this.runPath = runPath;
    this.rss = new RSSParser();
    this.client = redis.createClient(
      process.env.REDIS_PORT_NUMBER || '6379',
      process.env.REDIS_HOSTNAME || '127.0.0.1',
      {
        auth_pass: process.env.REDIS_PASSWORD,
        return_buffers: true,
      },
    );
    this.client.on('error', (err) => {
      console.error(`Redis Error: ${err}`);
    });
  }

  // helper for server.get('/blog/posts', ...
  // and server.get('/wallabag/:request', ...
  getBlogPosts(type, limit, callback, refetch) {
    const uniqueURL = 'https://medium.com/@d3sandoval/'; // for medium posts
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.client.get(type, (err, storedData) => {
      if (err) {
        console.error(err);
      }

      if (!refetch && storedData) {
        const parsedData = storedData.toString();
        let fetchedStore = JSON.parse(parsedData);
        if (limit && limit < fetchedStore.length) {
          fetchedStore = fetchedStore.slice(0, limit);
        }
        callback(null, fetchedStore);
        return;
      }

      this.fetchBlogPosts(type, (error, fetched) => {
        if (error) {
          console.error(error);
        }

        const entries = (type === 'blog') ? fetched.response : fetched.items;

        // if no callback occurs above
        const myEntries = [];

        const lim = limit || entries.length;
        for (let i = 0; i < lim; i++) {
          // clean up date
          const isoDate = new Date((type === 'blog') ? entries[i].firstPublishedAt : entries[i].isoDate);
          const date = `${days[isoDate.getDay()]}, ${
            isoDate.getDate()} ${
            months[isoDate.getMonth()]} ${
            isoDate.getFullYear()}`;

          // assign to object
          myEntries[i] = {
            title: entries[i].title,
            link: (type === 'blog') ? (uniqueURL + entries[i].uniqueSlug) : entries[i].link,
            date,
            isoDate,
          };
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
        this.rss.parseURL(url, (err, parsed) => {
          if (err) { return callback(err); }
          return callback(null, parsed);
        });
        break;
      case 'blog':
        mediumJSONFeed('@d3sandoval/latest')
          .then((data) => { callback(null, data); })
          .catch((data) => { callback(data); });
        break;
      default:
        callback('type not valid');
    }
  }

  // helper for server.get('/lastfm/:request'
  // when request == recent
  /* eslint-disable-next-line class-methods-use-this */
  getRecentTracks(limit, callback) {
    let data = '';
    const params = {
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
      path: `/2.0/?${querystring.stringify(params)}`,
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
  getPortfolioList(limit, featured, callback) {
    const p = path.join(this.runPath, '/portfolio');

    // get all directories in portfolio path
    const isDirectory = source => fs.lstatSync(source).isDirectory();
    const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

    const dirs = getDirectories(p);
    const filterLength = p.length + 1; // cleanup path

    // get data for each page
    let data = [];
    let count = 0;
    dirs.forEach((dir) => {
      /* eslint-disable-next-line consistent-return */
      fs.stat(dir, (err, stats) => {
        if (err) {
          return callback(err);
        }

        const key = dir.slice(filterLength);

        this.client.hgetall(key, (error, storedData) => {
          let listEntry; // instantiate listEntry
          const parsedData = (storedData !== null) ? storedData.toString() : null;
          if (!error) {
            this.isUpdated(
              key,
              (parsedData) ? new Date(parsedData.mtime) : new Date(0),
              stats.mtime,
              (updated) => {
                if (!updated) {
                  listEntry = parsedData;
                } else {
                  listEntry = updated;
                }

                listEntry.id = key;
                if (listEntry.content) { // too much to send over the wire
                  delete listEntry.content;
                }

                if (featured) {
                  if (typeof (listEntry.featured) !== 'undefined') {
                    data.push(listEntry);
                  }
                } else {
                  data.push(listEntry);
                }

                count++;
                if (count === dirs.length) {
                  data.sort((a, b) => new Date(b.date) - new Date(a.date));

                  if (limit) {
                    data = data.slice(0, limit);
                  }
                  callback(null, data);
                }
              },
            );
          }
        });
      });
    });
  }

  // helper for server.get('/portfolio/:id'
  getPortfolioPage(id, callback) {
    // first, check redis
    /* eslint-disable-next-line consistent-return */
    fs.stat(path.join(this.runPath, 'portfolio', id), (error, stats) => {
      if (error) {
        return callback(error);
      }

      /* eslint-disable-next-line consistent-return */
      this.client.hgetall(id, (clientError, storedData) => {
        if (!clientError) {
          this.isUpdated(
            id,
            (storedData) ? new Date(storedData.mtime) : 0,
            stats.mtime,
            (updated) => {
              if (!updated) {
                return callback(null, storedData);
              }
              return callback(null, updated);
            },
          );
        } else {
          return callback(clientError);
        }
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
        const readEntry = entry;
        readEntry.mtime = filemtime;
        this.client.hmset(key, readEntry);
        callback(entry);
      });
    }
  }

  // returns the parsed markdown file for a given key from the filesystem
  readPortfolioEntry(key, callback) {
    const p = path.join(this.runPath, '/portfolio/', key);

    /* eslint-disable-next-line consistent-return */
    fs.readdir(p, (error, files) => {
      if (error) {
        return callback(error);
      }

      const page = files.map(file => path.join(p, file)).filter(file => file.match(/.*\.(md)/ig));

      if (page.length < 1) {
        return callback('404');
      } if (page.length > 1) {
        console.error('parser does not support more than one markdown file. Using first in directory');
      }

      fs.readFile(page[0], { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
          // first split by content
          const template = data.split('content:'); // content will be template[1]

          // start building callback
          const entry = {
            content: template[1],
          };

          // then split by newlines
          const keys = template[0].split('\n').map(pair => pair.split(':'));

          // add to callback
          /* eslint-disable-next-line no-return-assign */
          keys.forEach(([k, value]) => entry[k] = String(value).trim());

          delete entry['']; // cleanup (not sure if this will break things)
          return callback(entry);
        }
        return callback(err);
      });
    });
  }
}

module.exports = ServerHelper;
