const express = require("express");
const cluster = require("cluster");
const noc = require("os").cpus().length;
// my machine has 8 cores but i only want to fork 4 worker threads.
const calculateFibonacci = require("./fib");

if (cluster.isMaster) {
  console.log(`Total fork process created is ${noc / 2}`);
  for (let i = 1; i <= noc / 2; i++) {
    cluster.fork();
  }
  cluster.on("online", (worker) => {
    console.log(
      `Worker id is ${worker.id} and process id is ${worker.process.pid}`
    );
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    const num = Number.parseInt(req.query.n) || 0;
    console.log(
      `Query ${num} Request received by Worker ${cluster.worker.id} and process id ${cluster.worker.process.pid}`
    );
    const val = calculateFibonacci(num);
    res.send(`<h1>${val}</h1>`);
  });

  app.listen(3000, () => {
    console.log("server started on port 3000");
  });
}
