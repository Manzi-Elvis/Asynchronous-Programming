/**
 * 02-clipboard.js
 *
 * Goal: contrast the Clipboard API — designed Promise-native from
 * day one — against the Geolocation API's older callback style from
 * 01-geolocation.js. Same category of API (browser feature access),
 * completely different calling convention, because they were
 * designed a decade apart.
 *
 * navigator.clipboard doesn't exist in Node, so this is a faithful
 * simulation of its real Promise-based shape.
 */

const fakeNavigator = {
  _clipboardContents: '',
  clipboard: {
    writeText(text) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fakeNavigator._clipboardContents = text;
          resolve(); // writeText resolves with undefined on success
        }, 20);
      });
    },
    readText() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(fakeNavigator._clipboardContents);
        }, 20);
      });
    },
  },
};

async function main() {
  console.log('--- Clipboard API: Promise-native, no wrapping needed ---\n');

  await fakeNavigator.clipboard.writeText('Hello from async-programming curriculum');
  console.log('Wrote text to clipboard');

  const text = await fakeNavigator.clipboard.readText();
  console.log('Read back from clipboard:', text);

  console.log('\nCompare the CODE SHAPE to 01-geolocation.js\'s wrapped version:');
  console.log('this one needed NO wrapper function at all — it was already');
  console.log('Promise-based, because it was designed in an era where');
  console.log('Promises were already the standard for new browser APIs.');
  console.log('\nReal-world note: navigator.clipboard requires a secure');
  console.log('context (HTTPS) and often a direct user gesture (e.g. a');
  console.log('click handler) — you cannot silently read/write the');
  console.log('clipboard from arbitrary background code for privacy reasons.');
}

main();