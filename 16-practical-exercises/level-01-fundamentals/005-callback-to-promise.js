/*
005 — Convert Callback API to Promise

You are given:
*/
const getUser = (id, callback) => {
    setTimeout(() => {
        if (id === 1) {
            callback(null, { id: 1, name: "John" });
        } else {
            callback(new Error("User not found"), null);
        }
    }, 1000);
};

/*
Do not modify the original function.
  Create: getUserPromise(id)
that returns a Promise.

The desired API should conceptually become:

getUserPromise(1)
    ↓
Promise
    ↓
result/error
Constraints

You must understand:
- resolve
- reject
- callback success
- callback failure

Extension: Explain why wrapping callback APIs in Promises can be useful.
*/

const getUserPromise = id => {
      return new Promise((resolve, reject) => {
            getUser(id, (error, user) => {
                  if(error){
                        reject(error)   // callback failure → Promise rejection
                  }
                  else{
                        resolve(user)   // callback success → Promise fulfillment
                  }
            })
      })
}
/*
How it works
1. new Promise(...) creates a Promise.
2. resolve(user) is called when getUser succeeds. The Promise becomes fulfilled.
3. reject(error) is called when getUser fails. The Promise becomes rejected.
4. The callback's success value becomes the Promise's resolved value.
5. The callback's failure/error becomes the Promise's rejection reason.
*/

getUserPromise(1)
    .then(user => {
        console.log("User:", user);
    })
    .catch(error => {
        console.error("Error:", error);
    });
