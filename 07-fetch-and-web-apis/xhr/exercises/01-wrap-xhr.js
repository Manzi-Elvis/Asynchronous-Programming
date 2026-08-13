/**
 * Exercise 01 — Wrap XHR (or any callback API) in a Promise
 *
 * Below is a callback-based `legacyUpload` function (standing in for
 * an old XHR-based or SDK-based upload API) with an error-first-ish
 * but XHR-flavored callback shape: it uses SEPARATE onSuccess/
 * onError callbacks rather than error-first, which is common in
 * older event-driven APIs.
 *
 * Wrap it in a function `uploadAsync(file)` that returns a Promise,
 * so it can be used with async/await.
 *
 * Requirements:
 *   - uploadAsync should resolve with the result object on success.
 *   - uploadAsync should reject with an Error on failure (convert
 *     the raw error message string into a real Error object).
 *   - Test it with both a "valid" and an "oversized" file to trigger
 *     both paths.
 *   - Bonus: also expose upload PROGRESS via a second parameter to
 *     uploadAsync — an optional onProgress callback — since progress
 *     events don't fit neatly into a single Promise resolution (a
 *     Promise can only settle once, but progress fires multiple
 *     times). This mirrors a REAL limitation of wrapping progress-
 *     emitting APIs in Promises.
 */

function legacyUpload(file, { onProgress, onSuccess, onError }) {
  const sizeLimit = 1000; // arbitrary limit for this simulation

  if (file.size > sizeLimit) {
    setTimeout(() => onError(`File too large: ${file.size} bytes exceeds limit of ${sizeLimit}`), 20);
    return;
  }

  let uploaded = 0;
  const chunkSize = file.size / 4;
  const interval = setInterval(() => {
    uploaded += chunkSize;
    if (onProgress) onProgress(Math.min(100, Math.round((uploaded / file.size) * 100)));

    if (uploaded >= file.size) {
      clearInterval(interval);
      onSuccess({ fileId: `file_${Date.now()}`, size: file.size });
    }
  }, 15);
}

function uploadAsync(file, onProgress) {
  // your implementation here
}

async function runTests() {
  console.log('--- Test 1: valid file, with progress tracking ---');
  const result = await uploadAsync(
    { name: 'photo.jpg', size: 400 },
    (percent) => console.log(`  progress: ${percent}%`)
  );
  console.log('Upload succeeded:', result);

  console.log('\n--- Test 2: oversized file ---');
  try {
    await uploadAsync({ name: 'huge-video.mp4', size: 5000 });
    console.log('This should not print');
  } catch (err) {
    console.log('Correctly rejected:', err.message);
    console.log('err instanceof Error:', err instanceof Error);
  }
}

// runTests();