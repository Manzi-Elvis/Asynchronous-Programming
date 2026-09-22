async function* fetchData(url){
  const response = await fetch(url)
  const data = await response.json();
  yield data;
}

(async () => {
  const generator = fetchData("https://jsonplaceholder.typicode.com/users");
  for await(const data of generator){
      console.log(data)
  }
})();