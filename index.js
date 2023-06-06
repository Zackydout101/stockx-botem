const axios = require('axios');
const { Worker } = require('worker_threads');
const getBetween = require('./Tools/getb.js');
const headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
};

let arr;

axios.get('https://stockx.com/nike', { headers })
  .then(async response => {
    const data = response.data;
    arr = data.split('sku');
    const all = [];
    console.log(arr.length);
    
    for (let i = 0; i < arr.length; i++){
      const firstElement = arr[i];
      const result = getBetween(firstElement, "images.stockx.com/images/", ".jpg");
      all.push(result);
    }

    const worker = new Worker('./ThreadSystem/passdata.js');
    console.log(all[0]);

    let profit = [];
    const promises = [];

    worker.setMaxListeners(all.length);
    for (let i = 0; i < all.length; i++){
      const promise = new Promise((resolve) => {
        worker.postMessage({ link: all[i] });


        worker.on('message', (result) => {
          if (result > 200) {
            profit.push(all[i]);
            //console.log(all[i]);
          }
          resolve();
        });

        worker.on('exit', (code) => {
          if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
          }
          resolve();
        });
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    for (let i = 0; i < profit.length; i++) {
      console.log(profit[i]);
    }
    
   
  })
  .catch(error => {
    console.error(`Error: ${error}`);
    arr = 'Sample-String'.split('-');
  });