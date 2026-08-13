/**
 * 01-basic-fetch.js
 *
 * Goal: the simplest possible fetch call, with clear handling for
 * "no network access" so this file is still instructive to read and
 * run even in an offline sandbox.
 *
 * NOTES.md covers the theory — this file is the hands-on entry point.
 */

async function main() {
  console.log('Fetching a todo item from jsonplaceholder...');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    // `response` is a Response object — fetch's Promise resolves as
    // soon as HEADERS arrive, not once the full body is downloaded.
    console.log('Got a response. Status:', response.status);
    console.log('response.ok:', response.ok); // true for any 2xx status

    // The BODY still needs its own async step to parse — .json()
    // ALSO returns a Promise (reading + parsing the body takes time
    // too, especially for large responses).
    const data = await response.json();
    console.log('Parsed body:', data);
  } catch (err) {
    // This catches NETWORK-level failures only (DNS, connection
    // refused, no network access at all) — NOT HTTP error statuses.
    console.log('Network-level fetch failure (expected if offline):', err.message);
    console.log('This is normal in a sandboxed environment with no network access.');
    console.log('The important thing to understand from this file is the SHAPE');
    console.log('of the code: await fetch(url), check response.ok, await response.json().');
  }
}

main();