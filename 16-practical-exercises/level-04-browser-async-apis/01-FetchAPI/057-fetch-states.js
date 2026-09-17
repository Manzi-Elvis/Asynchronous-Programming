/*
057 — Loading / Success / Error State

Create a small browser page containing:

[ Load Users ]

When clicked:

Loading...

Then eventually:
- Elvis
- Manzi
- Rurangirwa
...

or: Failed to load users

Requirements:

The UI must have exactly three conceptual states:

1. IDLE
2. LOADING
3. SUCCESS / ERROR

Think first
What happens if the user clicks the button:
click
click
click

before the first request finishes?

Your first implementation doesn't need to solve this yet—but identify the problem.

File
057-fetch-states.html
057-fetch-states.js
*/

const button = document.querySelector("#load-users");
const usersElement = document.querySelector("#users");

let state = "IDLE";

button.addEventListener("click", async () => {
  // Ignore clicks while already loading
  if (state === "LOADING") {
    return;
  }

  state = "LOADING";
  render();

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const users = await response.json();

    state = "SUCCESS";
    render(users);
  } catch (error) {
    state = "ERROR";
    render();
  }
});

function render(users = []) {
  usersElement.innerHTML = "";

  if (state === "IDLE") {
    return;
  }

  if (state === "LOADING") {
    usersElement.textContent = "Loading...";
    return;
  }

  if (state === "ERROR") {
    usersElement.textContent = "Failed to load users";
    return;
  }

  if (state === "SUCCESS") {
    const list = document.createElement("ul");

    users.forEach((user) => {
      const item = document.createElement("li");
      item.textContent = user.name;
      list.appendChild(item);
    });

    usersElement.appendChild(list);
  }
}
