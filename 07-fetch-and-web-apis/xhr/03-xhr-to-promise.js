/**
 * 03-xhr-to-promise.js
 *
 * Goal: wrap the callback/event-based XHR API in a Promise, so it
 * can be awaited and composed with everything from modules 03-06 —
 * the single most practical, broadly-applicable skill from this
 * sub-topic: turning ANY callback-based API into a Promise-based one.
 */

class FakeXMLHttpRequest {
  constructor() {
    this.status = 0;
    this.responseText = '';
    this.onload = null;
    this.onerror = null;
  }

  open(method, url) {
    this._url = url;
  }

  send() {
    setTimeout(() => {
      if (this._url.includes('fail')) {
        if (this.onerror) this.onerror(new Error('Simulated network failure'));
        return;
      }
      this.status = this._url.includes('missing') ? 404 : 200;
      this.responseText = JSON.stringify({ url: this._url, data: 'some payload' });
      if (this.onload) this.onload();
    }, 40);
  }
}

/**
 * The wrapper — this is the reusable pattern. Given ANY callback-
 * style async API, wrap it in `new Promise((resolve, reject) => {...})`,
 * calling resolve/reject from inside the original callbacks.
 */
function xhrGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new FakeXMLHttpRequest(); // real browser: new XMLHttpRequest()
    xhr.open('GET', url);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (parseErr) {
          reject(new Error('Failed to parse response as JSON'));
        }
      } else {
        reject(new Error(`HTTP error: ${xhr.status}`));
      }
    };

    xhr.onerror = (err) => {
      reject(err);
    };

    xhr.send();
  });
}

async function main() {
  console.log('--- Successful request, now await-able ---');
  const data = await xhrGet('https://api.example.com/todos/1');
  console.log('Got:', data);

  console.log('\n--- HTTP error (404), correctly rejects ---');
  try {
    await xhrGet('https://api.example.com/missing-resource');
  } catch (err) {
    console.log('Correctly caught:', err.message);
  }

  console.log('\n--- Network failure, correctly rejects ---');
  try {
    await xhrGet('https://api.example.com/fail-this-request');
  } catch (err) {
    console.log('Correctly caught:', err.message);
  }

  console.log('\n--- Now composable with Promise.all, since it returns a real Promise ---');
  const results = await Promise.all([
    xhrGet('https://api.example.com/todos/1'),
    xhrGet('https://api.example.com/todos/2'),
    xhrGet('https://api.example.com/todos/3'),
  ]);
  console.log('All three:', results);
}

main();

/**
 * This exact wrapping technique — new Promise((resolve, reject) => {
 * ...call the old API, resolve/reject from its callbacks...}) — is
 * how you'd modernize ANY callback-based library without rewriting
 * its internals: Node's fs callback API, an old jQuery.ajax call, a
 * third-party SDK that only offers callbacks. It's directly the same
 * technique used by Node's own util.promisify().
 */