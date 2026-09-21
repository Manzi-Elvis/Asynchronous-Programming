const searchInput = document.querySelector("#search");
const results = document.querySelector("#results");

let controller = null;

async function searchUsers(query) {
  // Cancel the previous request
  if (controller) {
    controller.abort();
  }

  // Create a new controller for the new request
  controller = new AbortController();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        signal: controller.signal
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    const users = await response.json();

    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

  } catch (error) {
    if (error.name === "AbortError") {
      return [];
    }

    throw error;
  }
}

searchInput.addEventListener("input", async (event) => {
  const query = event.target.value.trim();

  if (!query) {
    results.innerHTML = "";
    return;
  }

  try {
    const users = await searchUsers(query);

    results.innerHTML = users
      .map(user => `<li>${user.name}</li>`)
      .join("");
  } catch (error) {
    results.innerHTML = `<li>Error: ${error.message}</li>`;
  }
});


/*

HTML:

<input id="search" type="text" placeholder="Search users..." />

<ul id="results"></ul>

<script src="cancellable-typeahead.js"></script>

*/