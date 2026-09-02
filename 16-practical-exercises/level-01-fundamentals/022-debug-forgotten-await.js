/*
022 — Debug Forgotten await

Create:

async function getData() {
    const user = getUser();
    console.log(user.name);
}

Make the mistake intentionally.

Then diagnose it.

Questions:
- Why isn't user the actual user?
->Because getUser() is asynchronous. Calling it immediately 
  returns a Promise rather than the eventual user object.
  You need to wait for that promise to resolve.


- What type is it?
->If getUser() returns Promise<User>, then:
      const user = getUser();
  makes user have type:
      Promise<User>

- How would TypeScript help detect this category of mistake?
-> TypeScript can detect that you're trying to access .name on
   a Promise<User> rather than on a User. You'd typically get an
   error along the lines of: Property 'name' does not exist on type 'Promise<User>'.
*/

async function getData() {
    const user = getUser();
    console.log(user.name);
}

// Correct Version:
async function getData() {
    const user = await getUser();
    console.log(user.name);
}

// KEY RULE: An async function gives you a Promise;
//  await gives you the value inside the Promise.