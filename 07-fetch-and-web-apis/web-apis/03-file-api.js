/**
 * 03-file-api.js
 *
 * Goal: FileReader (old, event-based) vs File.prototype.text() (new,
 * Promise-based) — reading the SAME file two different ways, one
 * more verbose, one modern and clean. Both are simulated here since
 * File/FileReader are browser-only.
 */

class FakeFile {
  constructor(name, content) {
    this.name = name;
    this._content = content;
    this.size = content.length;
  }

  // Modern, Promise-based method (mirrors real File.prototype.text())
  text() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this._content), 30);
    });
  }
}

class FakeFileReader {
  constructor() {
    this.result = null;
    this.onload = null;
    this.onerror = null;
  }

  // Older, event-based method
  readAsText(file) {
    setTimeout(() => {
      this.result = file._content;
      if (this.onload) this.onload({ target: this });
    }, 30);
  }
}

const file = new FakeFile('notes.txt', 'Async programming curriculum notes');

// --- Old way: FileReader, event-based ---

console.log('--- Old way: FileReader (event-based) ---');

const reader = new FakeFileReader();
reader.onload = (event) => {
  console.log('FileReader result:', event.target.result);
};
reader.onerror = () => {
  console.log('FileReader error');
};
reader.readAsText(file);

// --- New way: File.text(), Promise-based ---

async function readModernWay() {
  console.log('\n--- New way: file.text() (Promise-based) ---');
  const content = await file.text();
  console.log('file.text() result:', content);
}

setTimeout(readModernWay, 60); // deferred so logs appear after the FileReader section

/**
 * Both ultimately do the same thing — read a file's contents as
 * text. The modern Promise-based method composes trivially with
 * async/await and Promise.all (e.g. reading several files
 * concurrently: `await Promise.all(files.map(f => f.text()))`),
 * while the FileReader approach requires manually wrapping each
 * read in a `new Promise(...)` first if you want that same
 * composability — the exact wrapping technique from
 * xhr/03-xhr-to-promise.js and 01-geolocation.js in this folder.
 */