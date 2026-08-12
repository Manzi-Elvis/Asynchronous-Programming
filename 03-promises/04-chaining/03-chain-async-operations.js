/**
 * 03-chain-async-operations.js
 *
 * Goal: a realistic, fully-chained multi-step async workflow — the
 * exact same "user signup" scenario from
 * 02-callbacks/callback-hell/02-real-world-example.js, rewritten as
 * a flat Promise chain. Compare the two files directly.
 */

function validateSignup(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.email || !data.email.includes('@')) {
        reject(new Error('Invalid email'));
        return;
      }
      if (!data.password || data.password.length < 8) {
        reject(new Error('Password must be at least 8 characters'));
        return;
      }
      resolve(data);
    }, 20);
  });
}

function createAccount(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `acc_${Date.now()}`,
        email: data.email,
        createdAt: new Date().toISOString(),
      });
    }, 40);
  });
}

function sendWelcomeEmail(account) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  (email service) sending welcome email to ${account.email}`);
      resolve({ account, emailSent: true });
    }, 30);
  });
}

function logAnalyticsEvent({ account, emailSent }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  (analytics) logging 'signup_complete' for ${account.id}`);
      resolve({ account, emailSent, analyticsLogged: true });
    }, 10);
  });
}

function signupUser(formData) {
  console.log('Starting signup flow for', formData.email);

  return validateSignup(formData)
    .then((validatedData) => createAccount(validatedData))
    .then((account) => sendWelcomeEmail(account))
    .then((emailResult) => logAnalyticsEvent(emailResult))
    .then((finalResult) => {
      console.log('Signup flow complete:', finalResult);
      return finalResult;
    })
    .catch((err) => {
      // ONE error handler for the entire flow, versus the 4
      // separate `if (err) return console.error(...)` checks in the
      // callback-hell version.
      console.error('Signup failed:', err.message);
      throw err; // re-throw so callers of signupUser() can react too
    });
}

signupUser({ email: 'elvis@example.com', password: 'supersecret123' })
  .then(() => console.log('(caller sees the flow succeeded)'))
  .catch(() => console.log('(caller sees the flow failed)'));

setTimeout(() => {
  console.log('\n--- Now watch it fail at validation ---\n');
  signupUser({ email: 'not-an-email', password: 'short' })
    .then(() => console.log('(caller sees the flow succeeded)'))
    .catch(() => console.log('(caller sees the flow failed)'));
}, 150);

/**
 * Direct comparison to the callback-hell version:
 *   - 4 levels of nesting -> 0 levels of nesting
 *   - 4 duplicated error checks -> 1 shared .catch()
 *   - The "should a failed email roll back the signup" DESIGN
 *     QUESTION is now visible right at the top level of the chain,
 *     not buried 3 levels deep — much easier to reason about and
 *     modify later (e.g. deciding sendWelcomeEmail's failure
 *     shouldn't fail the whole signup would now be a small, local
 *     change: wrap just that one .then() with its own .catch() that
 *     recovers instead of propagating).
 */
