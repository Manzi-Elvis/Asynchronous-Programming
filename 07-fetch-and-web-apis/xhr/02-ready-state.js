/**
 * 02-ready-state.js
 *
 * Goal: understand XHR's readyState lifecycle — the 5 numeric states
 * every XHR request moves through, and the onreadystatechange event
 * that fires on every transition (a more granular, older alternative
 * to just using onload).
 */

class FakeXMLHttpRequest {
  static UNSENT = 0;
  static OPENED = 1;
  static HEADERS_RECEIVED = 2;
  static LOADING = 3;
  static DONE = 4;

  constructor() {
    this.status = 0;
    this.responseText = '';
    this.readyState = FakeXMLHttpRequest.UNSENT;
    this.onreadystatechange = null;
    this.onload = null;
  }

  open(method, url) {
    this._url = url;
    this.readyState = FakeXMLHttpRequest.OPENED;
    if (this.onreadystatechange) this.onreadystatechange();
  }

  send() {
    this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
    if (this.onreadystatechange) this.onreadystatechange();

    setTimeout(() => {
      this.readyState = FakeXMLHttpRequest.LOADING;
      if (this.onreadystatechange) this.onreadystatechange();

      setTimeout(() => {
        this.readyState = FakeXMLHttpRequest.DONE;
        this.status = 200;
        this.responseText = JSON.stringify({ ok: true });
        if (this.onreadystatechange) this.onreadystatechange();
        if (this.onload) this.onload();
      }, 30);
    }, 20);
  }
}

const stateNames = {
  0: 'UNSENT',
  1: 'OPENED',
  2: 'HEADERS_RECEIVED',
  3: 'LOADING',
  4: 'DONE',
};

const xhr = new FakeXMLHttpRequest();

xhr.onreadystatechange = () => {
  console.log(`readyState changed: ${xhr.readyState} (${stateNames[xhr.readyState]})`);
  if (xhr.readyState === FakeXMLHttpRequest.DONE) {
    console.log('  final status:', xhr.status);
    console.log('  final response:', xhr.responseText);
  }
};

console.log('Opening and sending request...\n');
xhr.open('GET', 'https://api.example.com/data');
xhr.send();

/**
 * In real browser code, onreadystatechange fires on EVERY
 * transition, giving you visibility into the request's progress
 * (useful for things like showing a "connecting..." vs "loading..."
 * UI state). Most modern code prefers `onload` (or, better, wrapping
 * XHR in a Promise as shown in 03-xhr-to-promise.js) since you
 * usually only care about the FINAL outcome, but readyState tracking
 * still appears in older codebases and is worth recognizing.
 */