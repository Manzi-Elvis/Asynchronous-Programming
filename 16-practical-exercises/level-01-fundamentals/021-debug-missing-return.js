/*
021 — Debug Missing return

You are given deliberately broken Promise-chain code.

Your job is to create a chain like:

getUser()
    ↓
getPosts()
    ↓
processPosts()
    ↓
result

Then introduce a missing return somewhere.

Observe the resulting behavior.

Your task

Explain:

1. What value does the next .then() receive?
2. Why?
3. What Promise is actually being returned?
4. How would you detect this bug during debugging?
*/

// Broken
getUser().then(user => {
   getPosts(user); // forgot return
}).then(posts => {
   console.log(posts); // undefined
});

/*
The next .then() receives undefined because the callback doesn't
return the getPosts() Promise. The Promise returned by that .then()
is therefore resolved with undefined. The getPosts() Promise is still
running, but it is no longer connected to the chain. I can detect this
by logging the value in the next .then() or using a debugger/breakpoint.
*/

// Fixed
getUser().then(user => {
   return getPosts(user);
})
.then(posts => {
   console.log(posts);
});