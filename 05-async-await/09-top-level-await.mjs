/**
 * 09-top-level-await.mjs
 *
 * The runnable companion to 09-top-level-await.js — this file has
 * an .mjs extension, which Node always treats as an ES module
 * regardless of package.json, so top-level await works here directly.
 *
 * Run with: node 09-top-level-await.mjs
 */

function loadConfig() {
  return new Promise((resolve) => {
    console.log('Loading config...');
    setTimeout(() => {
      resolve({ apiUrl: 'https://api.example.com', retries: 3 });
    }, 50);
  });
}

console.log('Module execution starting...');

// No wrapping async function needed — this just works at the
// top level of an ES module.
const config = await loadConfig();

console.log('Config loaded:', config);
console.log('Rest of the module continues here, AFTER the await resolved.');

// You can use it in loops, conditionals, anywhere — it behaves
// exactly like await inside an async function, just at module scope.
for (let i = 0; i < 3; i++) {
  const step = await new Promise((resolve) =>
    setTimeout(() => resolve(`step ${i}`), 20)
  );
  console.log('  ', step);
}

console.log('\nModule fully initialized.');

/**
 * If another .mjs file did `import './09-top-level-await.mjs'`,
 * that importing file's own execution would not proceed past the
 * import statement until ALL of the above (including the loop)
 * finished running. This is the real-world consequence worth
 * remembering: top-level await in a shared/common module can delay
 * everything that imports it, transitively.
 */
