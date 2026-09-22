const response = await fetch('https://jsonplaceholder.typicode.com/users');
if(!response.ok){
      throw new Error(`HTTP ${response.status}`)
}

const reader = response.body.getReader();
const decoder = new TextDecoder();

try{
      while(true){
            const {value, done} = await reader.read();
            if(done) break;
            const text = decoder.decode(value, {stream: true});
            console.log('Received:', text)
      }
      const remaining = decoder.decode();
      if(remaining){
            console.log('Received:', remaining)
      }
}
finally{
      reader.releaseLock();
}