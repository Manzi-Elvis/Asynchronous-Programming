/**
 * 03-reject.js
 *
 * Goal: exercise reject(), and see why rejecting with a real Error
 * (rather than a string or plain object) matters in practice.
 */

function rejectWith(reason, label) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(reason), 20);
  }).catch((r) => console.log(`${label}:`, r));
}

rejectWith(new Error('a proper Error'), 'Error object');
rejectWith('just a string', 'string reason');
rejectWith({ code: 404, message: 'not found' }, 'plain object reason');

setTimeout(() => {
  console.log('\n--- Why Error objects are the right choice ---');

  const err = new Error('something broke');
  console.log('err.message:', err.message);
  console.log('err.stack (first line):', err.stack.split('\n')[0]);
  console.log('err.name:', err.name);

  const stringReason = 'something broke';
  console.log('\na plain string has none of that:');
  console.log('typeof stringReason:', typeof stringReason);
  console.log('stringReason.stack:', stringReason.stack); // undefined — no stack trace at all

  console.log('\nWith a plain string rejection, you lose:');
  console.log('  - WHERE in the code the failure originated (no stack trace)');
  console.log('  - The ability to use instanceof checks to distinguish error types');
  console.log('  - Consistency with everything else in the JS ecosystem that');
  console.log('    expects catch blocks to receive Error-like objects');
}, 100);

console.log('\n--- Custom Error subclasses (a genuinely useful pattern) ---');

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateAge(age) {
  return new Promise((resolve, reject) => {
    if (typeof age !== 'number' || age < 0) {
      reject(new ValidationError('Age must be a non-negative number', 'age'));
      return;
    }
    resolve(age);
  });
}

validateAge(-5).catch((err) => {
  console.log(`  caught ${err.name}: ${err.message} (field: ${err.field})`);
  console.log('  instanceof ValidationError:', err instanceof ValidationError);
  console.log('  instanceof Error:', err instanceof Error); // also true — subclasses inherit
});