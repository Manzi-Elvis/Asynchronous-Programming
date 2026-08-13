/**
 * 03-json.js
 *
 * Goal: POST-ing JSON data with fetch, and correctly setting headers
 * — the shape you'll write constantly for talking to real APIs.
 */

async function createTodo(todo) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // jsonplaceholder doesn't need auth, but a real API often
      // needs something like: 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(todo), // fetch does NOT stringify for you
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  try {
    const created = await createTodo({
      title: 'Learn concurrency-limited promise pools',
      completed: false,
      userId: 1,
    });
    console.log('Created:', created);
    // jsonplaceholder is a fake API — it echoes back a plausible
    // response with a fake generated id, but doesn't actually
    // persist anything server-side.
  } catch (err) {
    console.log('Request failed (expected if offline):', err.message);
    console.log('\nThe pattern to remember regardless of network access:');
    console.log(`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(...);  // <- easy to forget!
  const data = await response.json();
    `);
  }
}

main();