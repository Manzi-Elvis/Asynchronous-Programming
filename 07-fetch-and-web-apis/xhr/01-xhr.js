/**
 * 01-xhr.js
 *
 * Goal: see the classic XHR shape in action. Since XMLHttpRequest is
 * a BROWSER global that doesn't exist in plain Node, this file
 * defines a small, faithful polyfill (matching real XHR's event
 * names and behavior) purely so the async/event mechanics can be
 * exercised here. The CODE PATTERN below is identical to what you'd
 * write in an actual browser — only the class definition at the top
 * is curriculum plumbing.
 */

// --- Minimal XHR-shaped polyfill for this Node environment ---
// (Skip to the "REAL XHR-STYLE CODE STARTS HERE" comment below if
// you just want to see the usage pattern — this class exists solely
// so the pattern is actually runnable in Node.)
class FakeXMLHttpRequest {
  constructor() {
    this.status = 0;
    this.responseText = '';
    this.readyState = 0; // UNSENT
    this.onload = null;
    this.onerror = null;
    this.onreadystatechange = null;
    this._method = null;
    this._url = null;
  }

  open(method, url) {
    this._method = method;
    this._url = url;
    this.readyState = 1; // OPENED
    if (this.onreadystatechange) this.onreadystatechange();
  }

  send() {
    this.readyState = 2; // HEADERS_RECEIVED (simplified)
    if (this.onreadystatechange) this.onreadystatechange();

    setTimeout(() => {
      this.readyState = 3; // LOADING
      if (this.onreadystatechange) this.onreadystatechange();

      setTimeout(() => {
        this.readyState = 4; // DONE
        // Simulate a successful response for any /todos/ path.
        if (this._url.includes('/todos/')) {
          this.status = 200;
          this.responseText = JSON.stringify({ id: 1, title: 'Learn XHR', completed: false });
        } else {
          this.status = 404;
          this.responseText = JSON.stringify({ error: 'Not found' });
        }
        if (this.onreadystatechange) this.onreadystatechange();
        if (this.onload) this.onload();
      }, 30);
    }, 20);
  }
}

// --- REAL XHR-STYLE CODE STARTS HERE (identical to browser usage) ---

const xhr = new FakeXMLHttpRequest(); // in a real browser: new XMLHttpRequest()

xhr.open('GET', 'https://api.example.com/todos/1');

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText);
    console.log('XHR succeeded:', data);
  } else {
    console.log('XHR returned an HTTP error:', xhr.status);
  }
};

xhr.onerror = () => {
  console.log('XHR network error');
};

console.log('Sending XHR request...');
xhr.send();
console.log('send() returned immediately — this logs before onload fires');

/**
 * Notice the shape: no Promise anywhere. You register onload/onerror
 * callbacks, call send(), and the browser invokes your callbacks
 * later via events — the exact same non-blocking, environment-
 * managed hand-off pattern from module 00's web-apis/, just with a
 * different, older API surface than fetch.
 */