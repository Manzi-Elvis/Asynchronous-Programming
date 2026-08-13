/**
 * 01-geolocation.js
 *
 * Goal: see the Geolocation API's two-separate-callbacks pattern,
 * then wrap it in a Promise using the exact same technique from
 * xhr/03-xhr-to-promise.js — reinforcing that this wrapping
 * technique applies to ANY callback shape, not just error-first or
 * XHR-style ones.
 *
 * navigator.geolocation doesn't exist in Node, so this file defines
 * a small faithful simulation of its behavior and API shape.
 */

const fakeNavigator = {
  geolocation: {
    getCurrentPosition(onSuccess, onError, options = {}) {
      setTimeout(() => {
        const permissionGranted = true; // flip to simulate denial
        if (!permissionGranted) {
          onError({ code: 1, message: 'User denied Geolocation' });
          return;
        }
        onSuccess({
          coords: {
            latitude: -1.9441, // Kigali, Rwanda
            longitude: 30.0619,
            accuracy: 20,
          },
          timestamp: Date.now(),
        });
      }, 60);
    },
  },
};

// --- Using it directly, the classic two-callback way ---

console.log('--- Direct usage: two separate callbacks ---');

fakeNavigator.geolocation.getCurrentPosition(
  (position) => {
    console.log('Got position:', position.coords.latitude, position.coords.longitude);
  },
  (error) => {
    console.log('Failed to get location:', error.message);
  }
);

console.log('getCurrentPosition returned immediately — this logs first\n');

// --- Wrapping it in a Promise for async/await use ---

function getCurrentPositionAsync(options) {
  return new Promise((resolve, reject) => {
    fakeNavigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(new Error(error.message)),
      options
    );
  });
}

async function main() {
  console.log('--- Wrapped version: await-able ---');
  try {
    const position = await getCurrentPositionAsync();
    console.log('Latitude:', position.coords.latitude);
    console.log('Longitude:', position.coords.longitude);
  } catch (err) {
    console.log('Failed:', err.message);
  }
}

setTimeout(main, 100); // deferred so its logs appear after the direct-usage section above