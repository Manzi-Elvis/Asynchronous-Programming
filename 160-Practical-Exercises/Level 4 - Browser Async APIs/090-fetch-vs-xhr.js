
// Both `fetch()` and `XMLHttpRequest` (XHR) can make asynchronous GET requests,
//  but `fetch()` is the newer, Promise-based API and is generally easier to use.

//  ### Basic comparison

// fetch()
fetch('/api/users')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));


// XMLHttpRequest
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/users', true);

xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error(`HTTP ${xhr.status}`);
  }
};

xhr.onerror = () => console.error('Network error');

xhr.send();


//  ### Key differences

//  | Feature | `fetch()` | `XMLHttpRequest` |
// | ---      | ---       | ---              |
// | API style| Promises  | Events/callbacks |
// | Readability | Generally simpler | More verbose |
// | JSON | `response.json()` | `JSON.parse(response.responseText)` |
// | HTTP errors | Must check `response.ok` | Check `xhr.status` |
// | Cancellation | `AbortController` | `xhr.abort()` |
// | Progress events | Not straightforward for typical fetch usage | Built-in progress events |
// | Streaming | Strong support via `ReadableStream` | More limited/older model |
// | Modern usage | Preferred for new code | Mainly legacy/existing code |

// One important detail: **`fetch()` does not reject its Promise merely because the server returns a 404 or 500**. You normally need to check `response.ok` yourself. It rejects for failures such as a network error or an aborted request.

//  For new code, `fetch()` is usually the more convenient choice; XHR remains useful when working with older code or when its event-based upload/download progress capabilities are specifically needed.