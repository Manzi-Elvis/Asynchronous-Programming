async function fetchUsers(id){
      const controller = new AbortController();
      const timeOut = setTimeout(() =>{
            controller.abort();
      },3000);
      try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}
`,{
                  signal: controller.signal
            })
            if(!response.ok){
                  throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
            }
            return await response.json();
      }
      catch(error){
            if(error.name === "AbortError"){
                  console.error("Request was cancelled");
                  return null;
            }
            else{
                  console.error("Error:", error.message)
            }
            throw error;
      }
      finally{
            clearTimeout(timeOut)
      }
}
fetchUsers(10).then(console.log)