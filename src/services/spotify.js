// import axios from 'axios';

const result = [{}]
// axios.get("https://accounts.spotify.com/authorize?client_id=30f12fba8afd48bba37450e79a1dc1da&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20",{
//     mode: 'no-cors',
//     //Access-Control-Allow-Origin': ture,
// }).then(res => {
//        result = res
//     })
//     console.log(result)
//     fetch('https://accounts.spotify.com/authorize?client_id=30f12fba8afd48bba37450e79a1dc1da&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20')
//     .then(response => response.json())
//     .then(data => console.log(data));
    async function postData(url = 'https://accounts.spotify.com/authorize?client_id=30f12fba8afd48bba37450e79a1dc1da&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'no-cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            //'Content-Type': 'application/json'
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects
      }
      
      postData('https://accounts.spotify.com/authorize?client_id=30f12fba8afd48bba37450e79a1dc1da&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20', { answer: 42 })
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
        });
export default result;