/*
003 — Sequential Callback Operations

You have:
*/
// 1. Get the user
function getUser(callback) {
  setTimeout(() => {
    const user = {
      id: 1,
      name: "John"
    };

    callback(null, user);
  }, 1000);
}


// 2. Get posts for a specific user
function getPosts(userId, callback) {
  setTimeout(() => {
    const posts = [
      { id: 1, userId: 1, title: "Post A" },
      { id: 2, userId: 1, title: "Post B" }
    ];

    const userPosts = posts.filter(post => post.userId === userId);

    callback(null, userPosts);
  }, 1000);
}


// 3. Get comments for the posts
function getComments(posts, callback) {
  setTimeout(() => {
    const comments = [
      { postId: 1, text: "Comment 1" },
      { postId: 2, text: "Comment 2" }
    ];

    const postComments = comments.filter(comment =>
      posts.some(post => post.id === comment.postId)
    );

    callback(null, postComments);
  }, 1000);
}
/*
Each function is asynchronous and uses callbacks.

Your job is to execute:

getUser
   ↓
getPosts(user.id)
   ↓
getComments(posts)

Only start the next operation when the previous operation succeeds.

Data
users:
1 → Alice

posts:
1 → Post A
1 → Post B

comments:
Post A → Comment 1
Post B → Comment 2
Don't immediately write code.

First answer:

1. What data does each operation require?
2. Which operations can run concurrently?
3. Which operations have dependencies?
4. Where can an error occur?

Then implement it.

Extension:

What problem appears if you have 10 dependent asynchronous operations?
Answer:
-> As the number of dependent operations grows, the code becomes increasingly:
- deeply nested
- difficult to read
- difficult to maintain
- repetitive with error handling
That's one of the main reasons Promises and async/await are useful: they let you
express the same sequential dependency much more cleanly.

*/

getUser((err, user) => {
  if (err) {
    console.error("Error getting user:", err);
    return;
  }

  console.log("User:", user);

  getPosts(user.id, (err, posts) => {
    if (err) {
      console.error("Error getting posts:", err);
      return;
    }

    console.log("Posts:", posts);

    getComments(posts, (err, comments) => {
      if (err) {
        console.error("Error getting comments:", err);
        return;
      }

      console.log("Comments:", comments);
    });
  });
});