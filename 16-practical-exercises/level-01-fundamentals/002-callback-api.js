// 002 — Fake Asynchronous API

// Create: getUser(id, callback)

// Simulate a database/API request.

// Use this data:

const users = [
    { id: 1, name: "Elvis" },
    { id: 2, name: "Manzi" },
    { id: 3, name: "Rurangirwa" }
];

// The function should:

// wait ~1 second;
// find the user;
// call the callback with the result.

// If the user doesn't exist, the operation should report an error.

// Critical-thinking question

// How should a callback-based API communicate both: success and failure

// without throwing an error that the caller cannot catch?

const getUser = (id, callback) => {
      setTimeout(() => {
            const user = users.find(user => user.id === id);
            if(!user){
                  callback("User not found", null);
                  return
            };
            callback(null, user)
      },1000)
}