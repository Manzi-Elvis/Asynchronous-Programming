async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    // HTTP-level error
    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} ${response.statusText}`
      );
    }

    const user = await response.json();

    return user;
  } catch (error) {
    // Network error, abort error, or our HTTP error
    console.error('Request failed:', error.message);

    throw error;
  }
}

async function main() {
  try {
    const user = await fetchUser(123);
    console.log('User:', user);
  } catch (error) {
    console.error('Could not load user');
  }
}

main();
