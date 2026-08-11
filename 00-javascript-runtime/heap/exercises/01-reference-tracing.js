/**
 * Exercise 01 — Reference tracing
 *
 * Part 1: Predict, then verify
 * ------------------------------
 * For each block below, write your prediction of the logged output
 * BEFORE running the file. Pay attention to which variables share a
 * reference and which don't.
 */

const original = { count: 0, tags: ['a', 'b'] };

const shallowCopy = { ...original };
shallowCopy.count = 100;        // does this affect original.count?
shallowCopy.tags.push('c');     // does this affect original.tags? (gotcha!)

console.log('original:', original);
console.log('shallowCopy:', shallowCopy);

// Prediction:
// original.count = ?
// original.tags = ?

/**
 * Part 2: Fix the bug
 * --------------------
 * `addTag` is supposed to return a NEW array with the tag added,
 * leaving the original untouched. Right now it mutates the original.
 * Fix it so the test below passes.
 */

function addTag(tags, newTag) {
  tags.push(newTag); // BUG: mutates the caller's array
  return tags;
}

function testAddTag() {
  const originalTags = ['urgent'];
  const updatedTags = addTag(originalTags, 'reviewed');

  const originalUnchanged = originalTags.length === 1;
  const updatedCorrect =
    updatedTags.length === 2 && updatedTags.includes('reviewed');

  console.log('originalTags unchanged:', originalUnchanged, originalTags);
  console.log('updatedTags correct:', updatedCorrect, updatedTags);
  console.log('PASS:', originalUnchanged && updatedCorrect);
}

testAddTag();

/**
 * Part 3: Explain in a comment
 * ------------------------------
 * Why does this matter for async code specifically? Think about what
 * happens if `addTag` were called from inside two different
 * `.then()` callbacks operating on what the caller assumed was an
 * "independent" array.
 */