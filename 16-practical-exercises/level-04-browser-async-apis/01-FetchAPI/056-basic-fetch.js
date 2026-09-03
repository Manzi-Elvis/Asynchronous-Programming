/*
056 — Your First API Client

Build a function: getUsers()
that retrieves users from: https://jsonplaceholder.typicode.com/users

Your function should:

- make the request;
- check whether the HTTP response indicates success;
- convert the response into JSON;
- return the users;
- allow the caller to handle errors.

Before coding:
Answer:
1. What does fetch() return?
-> fetch() returns a Promise that eventually resolves to a Response object.

2. Does fetch() give you the JSON immediately?
-> No. fetch() is asynchronous. You first get a Response, then
   you use response.json() to read and parse the JSON body.

3. What does response.json() return?
-> It returns a Promise that resolves to the parsed JavaScript value,
   usually an object or array.

4. What happens when the server returns a 404?
-> fetch() normally resolves successfully with a Response object.
   The response will have response.ok === false and response.status === 404.

5. Does fetch() automatically reject for every HTTP error?
-> No. fetch() rejects for things such as network failures,
   but HTTP errors like 404 or 500 do not automatically cause rejection.

Constraint:
- Don't put all error handling inside getUsers().
- Design the API so the caller can decide what to do with failures.

Extension: Explain the difference between: network failure and HTTP error
*/

async function getUsers(){
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`)
      }
      const users = await response.json();
      return users;
}
getUsers().then(data => console.log(data)).catch(err => console.error("Error:", err.message))


//////////////////OR//////////////
async function getUsers2(){
      try{
            const resp = await fetch("https://jsonplaceholder.typicode.com/users")
            if(!response.ok){
                  throw new Error(`HTTP Error: ${resp.status}`)
            }
            const users = await response.json();
            console.log(users);
      }
      catch(err){
            console.error("Error: ", err.message)
      }
}