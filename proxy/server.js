const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log("New request came!");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "This is the data",
    }),
  );
});

server.listen(9001);
