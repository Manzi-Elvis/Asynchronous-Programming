/**
 * Exercise 01 — Consume a small API correctly
 *
 * Below is a Promise-returning function simulating a weather API
 * lookup. Consume it THREE different ways:
 *
 *   1. Using .then(onFulfilled, onRejected) — the two-argument form
 *   2. Using .then(onFulfilled) followed by a separately chained
 *      .catch(onRejected)
 *   3. Write a call that deliberately makes the onFulfilled handler
 *      throw, and prove (with console.logs) that approach 1's
 *      onRejected does NOT catch it, but approach 2's .catch() DOES.
 *      (Refer back to 03-rejection-handler.js if you get stuck.)
 */

function getWeather(city) {
  const knownCities = {
    Kigali: { tempC: 22, condition: 'Partly cloudy' },
    Nairobi: { tempC: 19, condition: 'Sunny' },
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!(city in knownCities)) {
        reject(new Error(`Unknown city: ${city}`));
        return;
      }
      resolve(knownCities[city]);
    }, 30);
  });
}

// --- 1. Two-argument .then() ---

// your code here

// --- 2. .then() + chained .catch() ---

// your code here

// --- 3. Prove the difference with a throwing onFulfilled handler ---

// your code here