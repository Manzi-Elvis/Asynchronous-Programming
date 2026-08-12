/**
 * 02-real-world-example.js
 *
 * Goal: a realistic user-signup flow — validate input, create the
 * account, send a welcome email, log an analytics event — written
 * in full, unapologetic callback hell, exactly as it would have
 * looked in pre-Promise Node.js code circa 2012.
 */

function validateSignup(data, callback) {
  setTimeout(() => {
    if (!data.email || !data.email.includes('@')) {
      callback(new Error('Invalid email'));
      return;
    }
    if (!data.password || data.password.length < 8) {
      callback(new Error('Password must be at least 8 characters'));
      return;
    }
    callback(null, data);
  }, 20);
}

function createAccount(data, callback) {
  setTimeout(() => {
    const account = {
      id: `acc_${Date.now()}`,
      email: data.email,
      createdAt: new Date().toISOString(),
    };
    callback(null, account);
  }, 40);
}

function sendWelcomeEmail(account, callback) {
  setTimeout(() => {
    console.log(`  (email service) sending welcome email to ${account.email}`);
    callback(null, { emailSent: true, to: account.email });
  }, 30);
}

function logAnalyticsEvent(account, emailResult, callback) {
  setTimeout(() => {
    console.log(`  (analytics) logging 'signup_complete' for ${account.id}`);
    callback(null, { logged: true });
  }, 10);
}

// --- The full pyramid ---

function signupUser(formData) {
  console.log('Starting signup flow for', formData.email);

  validateSignup(formData, (validateErr, validatedData) => {
    if (validateErr) {
      console.error('Signup failed at validation:', validateErr.message);
      return;
    }

    createAccount(validatedData, (createErr, account) => {
      if (createErr) {
        console.error('Signup failed at account creation:', createErr.message);
        return;
      }

      sendWelcomeEmail(account, (emailErr, emailResult) => {
        if (emailErr) {
          // Note a real design question buried here: should a failed
          // welcome email roll back the whole signup? Nested
          // callback code makes even ASKING that question harder,
          // because the control flow is so tangled.
          console.error('Signup succeeded but welcome email failed:', emailErr.message);
          return;
        }

        logAnalyticsEvent(account, emailResult, (analyticsErr, analyticsResult) => {
          if (analyticsErr) {
            console.error('Signup succeeded but analytics logging failed:', analyticsErr.message);
            return;
          }

          console.log('Signup flow complete:', {
            account,
            emailResult,
            analyticsResult,
          });
        });
      });
    });
  });
}

signupUser({ email: 'elvis@example.com', password: 'supersecret123' });

console.log('\n--- Now watch it fail at validation ---\n');

signupUser({ email: 'not-an-email', password: 'short' });

/**
 * Real problems visible here, beyond the indentation:
 *   - 4 levels of nesting for only 4 steps, each with its own error
 *     check that's easy to skip by accident while editing
 *   - The "what should happen if the welcome email fails" question
 *     (a genuine product decision) is buried inside the THIRD level
 *     of nesting instead of being visible at the top
 *   - Adding a 5th step (say, "assign to onboarding cohort") means
 *     editing deep inside the pyramid and re-indenting everything
 *     below it
 *
 * See exercises/01-refactor-callback-hell.js for the "flatten with
 * named functions" partial fix, and module 03 for how Promises solve
 * this structurally rather than just cosmetically.
 */