/**
 * 06-throw-in-executor.js
 *
 * Goal: a focused, practical example of relying on the
 * throw-becomes-rejection behavior to write CLEANER validation logic
 * inside a Promise-returning function — no manual reject() calls
 * needed for the error paths.
 */

function createUser(data) {
  return new Promise((resolve) => {
    // Notice: no `reject` parameter used at all below. Every
    // validation failure just throws a regular Error, and the
    // Promise constructor's implicit try/catch converts it to a
    // rejection automatically.
    if (!data.email) {
      throw new Error('email is required');
    }
    if (!data.email.includes('@')) {
      throw new Error('email must be valid');
    }
    if (!data.password || data.password.length < 8) {
      throw new Error('password must be at least 8 characters');
    }

    resolve({
      id: `user_${Date.now()}`,
      email: data.email,
      createdAt: new Date().toISOString(),
    });
  });
}

createUser({ email: 'elvis@example.com', password: 'supersecret' })
  .then((user) => console.log('created:', user))
  .catch((err) => console.log('failed:', err.message));

createUser({ email: 'not-an-email', password: 'supersecret' })
  .then((user) => console.log('created:', user))
  .catch((err) => console.log('failed:', err.message));

createUser({ email: 'elvis@example.com', password: 'short' })
  .then((user) => console.log('created:', user))
  .catch((err) => console.log('failed:', err.message));

createUser({})
  .then((user) => console.log('created:', user))
  .catch((err) => console.log('failed:', err.message));

/**
 * Compare this to how much more verbose the equivalent error-first
 * callback version was in 02-callbacks/error-first-callbacks/ — no
 * `if (err) return` boilerplate needed at every branch, no risk of
 * a missing `return` causing a double-callback bug. Throwing plain
 * JavaScript errors and letting the Promise machinery handle
 * conversion is one of the biggest ergonomic wins Promises bring.
 *
 * Caveat worth remembering (from 04-executor.js): this throw-to-
 * reject conversion ONLY works for SYNCHRONOUS throws directly in
 * the executor body. If your validation needed to happen inside a
 * nested async callback, you'd be back to manually catching and
 * calling reject() yourself.
 */