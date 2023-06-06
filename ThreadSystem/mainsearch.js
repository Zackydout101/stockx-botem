const { Worker } = require('worker_threads');

// Creating a new Worker
const worker = new Worker('./passdata.js');

// Sending a message to the Worker
worker.postMessage({ num1: 5, num2: 10 });
worker.postMessage({ num1: 7, num2: 10 });
// Handling messages received from the Worker
worker.on('message', (result) => {
  console.log('Data received', result);
});


// Handling termination of the Worker
worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});