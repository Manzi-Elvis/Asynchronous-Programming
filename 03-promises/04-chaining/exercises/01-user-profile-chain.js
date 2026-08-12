/**
 * Exercise 01 — Build a user-profile chain
 *
 * Given these three Promise-returning functions, build a SINGLE flat
 * chain (no nesting) that:
 *   1. Fetches the user
 *   2. Fetches their posts (needs user.id)
 *   3. Fetches their follower count (needs user.id)
 *   4. Combines everything into one object:
 *      { user, posts, followerCount }
 *   5. Has exactly ONE .catch() at the end that logs any failure
 *      from any step
 *
 * Note: steps 2 and 3 don't depend on EACH OTHER, only on step 1's
 * result — for this exercise, chain them sequentially anyway (one
 * after the other). You'll learn to run independent steps
 * CONCURRENTLY instead in module 04, which would be the better real
 * design here — this exercise is specifically about chaining
 * mechanics first.
 */

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId !== 1) {
        reject(new Error('User not found'));
        return;
      }
      resolve({ id: 1, name: 'Elvis' });
    }, 20);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 'p1', title: 'First post' }, { id: 'p2', title: 'Second post' }]), 20);
  });
}

function fetchFollowerCount(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1337), 20);
  });
}

// your chain here, for userId = 1
fetchUser(1);
// ...

// your chain here, for userId = 999 (should hit the .catch())
fetchUser(999);
// ...
