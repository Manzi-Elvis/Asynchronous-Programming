/**
 * 02-response.js
 *
 * Goal: explore the Response object's properties and methods beyond
 * just .json() — status, headers, and the OTHER body-parsing methods
 * available (text, blob, arrayBuffer), each returning its own Promise.
 */

async function main() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    console.log('status:', response.status);           // e.g. 200
    console.log('statusText:', response.statusText);    // e.g. 'OK'
    console.log('ok:', response.ok);                    // true for 2xx
    console.log('url:', response.url);                  // final URL after redirects
    console.log('redirected:', response.redirected);

    console.log('\nHeaders:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    // IMPORTANT: a Response body can only be read ONCE. Calling
    // .json() consumes the body stream — calling .text() on the
    // SAME response afterward would throw. If you need the body in
    // multiple forms, clone the response first: response.clone()
    const data = await response.json();
    console.log('\nParsed JSON body:', data);
  } catch (err) {
    console.log('Fetch failed (expected if offline):', err.message);

    // --- Demonstrating the Response API shape without real network ---
    console.log('\n--- Simulated Response object shape for reference ---');
    console.log(`
A real Response object has:
  .status       (number, e.g. 200, 404, 500)
  .statusText   (string, e.g. 'OK', 'Not Found')
  .ok           (boolean, true only for status 200-299)
  .headers      (a Headers object, iterable as key/value pairs)
  .url          (string, final URL after any redirects)
  .redirected   (boolean)
  .json()       -> Promise<any>            parses body as JSON
  .text()       -> Promise<string>         raw body as text
  .blob()       -> Promise<Blob>           body as binary blob
  .arrayBuffer()-> Promise<ArrayBuffer>    body as raw bytes
  .clone()      -> Response                a fresh copy, body NOT yet consumed
    `);
  }
}

main();