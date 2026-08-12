/**
 * 01-node-style-callback.js
 *
 * Goal: build a realistic error-first async function — simulating
 * fs.readFile's shape without touching the real filesystem — and
 * consume it the correct way.
 */

const fakeFileSystem = {
  'config.json': '{"env":"production","port":3000}',
  'readme.md': '# Project readme',
};

function readFile(path, callback) {
  setTimeout(() => {
    if (!(path in fakeFileSystem)) {
      // error-first convention: error goes first, result is
      // undefined/omitted when there IS an error
      callback(new Error(`ENOENT: no such file: ${path}`));
      return; // critical: return immediately after calling back on an error path
    }
    callback(null, fakeFileSystem[path]);
  }, 30);
}

// --- Consuming it correctly ---
readFile('config.json', (err, contents) => {
  if (err) {
    console.error('Failed to read config.json:', err.message);
    return;
  }
  console.log('config.json contents:', contents);
  const parsed = JSON.parse(contents);
  console.log('parsed port:', parsed.port);
});

readFile('does-not-exist.txt', (err, contents) => {
  if (err) {
    console.error('Failed to read does-not-exist.txt:', err.message);
    return;
  }
  // This branch is unreachable for this call, which is exactly the
  // point of checking `err` first — we never even look at `contents`
  // when something went wrong.
  console.log('contents:', contents);
});

/**
 * This exact shape (path, callback) => callback(err, data) is how
 * Node's fs.readFile has worked since Node's earliest versions, and
 * it's why fs/promises (the modern Promise-based version) exists
 * alongside it — same underlying operation, two different calling
 * conventions layered over the same OS-level file read.
 */