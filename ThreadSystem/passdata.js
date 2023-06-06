const { parentPort } = require('worker_threads');
const axios = require('axios');
const getBetween = require('../Tools/getb.js');
// Handling messages received from the main thread
parentPort.on('message', (data) => {
  const name = data.link;
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
  };

  axios.get('https://stockx.com/api/browse?_search='+name, { headers })
    .then(response => {
      const responseData = JSON.stringify(response.data); // Convert response.data to a string
      const result = getBetween(responseData, 'pricePremium', ',');
      const sku = result.match(/\d+/g);
      parentPort.postMessage(sku[1]);
      
    })
    .catch(error => {
      console.error(error);
    });
});