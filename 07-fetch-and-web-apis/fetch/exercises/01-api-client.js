/**
 * Exercise 01 — Build a small API client
 *
 * Build a minimal reusable API client object with three methods,
 * each correctly checking response.ok and parsing JSON:
 *
 *   apiClient.get(path)
 *   apiClient.post(path, body)
 *   apiClient.delete(path)
 *
 * Base URL: https://jsonplaceholder.typicode.com
 *
 * Requirements:
 *   - Every method should throw a descriptive Error (including the
 *     HTTP status) if response.ok is false.
 *   - get() and post() should return the parsed JSON body.
 *   - delete() on jsonplaceholder returns an empty body on success —
 *     just return true if response.ok, don't try to parse JSON.
 *   - Handle network-level failures gracefully in your test code
 *     (wrap calls in try/catch) since this may run offline.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = {
  async get(path) {
    // your implementation here
  },

  async post(path, body) {
    // your implementation here
  },

  async delete(path) {
    // your implementation here
  },
};

async function runTests() {
  try {
    const todo = await apiClient.get('/todos/1');
    console.log('GET /todos/1:', todo);
  } catch (err) {
    console.log('GET failed:', err.message);
  }

  try {
    const created = await apiClient.post('/todos', {
      title: 'test todo',
      completed: false,
    });
    console.log('\nPOST /todos:', created);
  } catch (err) {
    console.log('POST failed:', err.message);
  }

  try {
    const deleted = await apiClient.delete('/todos/1');
    console.log('\nDELETE /todos/1:', deleted);
  } catch (err) {
    console.log('DELETE failed:', err.message);
  }

  // Bonus: test that a 404 correctly throws
  try {
    await apiClient.get('/nonexistent-endpoint-xyz');
    console.log('\nThis should not print if your error handling is correct');
  } catch (err) {
    console.log('\nCorrectly threw on error:', err.message);
  }
}

// runTests();