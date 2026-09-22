async function fetchUsers() {
  const response = await fetch('https://api.example.com/users');

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const users = await response.json();

  return users;
}

async function main() {
  try {
    const users = await fetchUsers();
    console.log(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

main();