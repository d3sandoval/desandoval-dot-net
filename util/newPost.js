/* eslint no-console: 0 no-use-before-define: 0 */
const fs = require('fs');
const path = require('path');


process.stdin.resume();
process.stdin.setEncoding('utf8');

console.info('Please enter the name of the post you\'d like to create:');

process.stdin.on('data', (text) => {
  const name = text.toString().trimRight();

  // copy template into portfolio folder with correct name
  copyFile(
    'postTemplate.md',
    path.join(__dirname, '..', 'portfolio', name, `${name}.md`),
    () => {
      console.info(`Post created! You can find it in /portfolio/${name}/${name}.md`);
      process.exit();
    },
  );
});

/* helper functions to copy the template */
function copyFile(source, target, cb) {
  let cbCalled = false;
  ensureDirectoryExistence(target);

  const rd = fs.createReadStream(source);
  rd.on('error', (err) => {
    done(err);
  });
  const wr = fs.createWriteStream(target);
  wr.on('error', (err) => {
    done(err);
  });
  wr.on('close', (ex) => {
    done();
  });
  rd.pipe(wr);

  function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    return fs.mkdirSync(dirname);
  }

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
