const http = require("node:http");

const PORT = 9000;

const proxy = http.createServer();

const mainServices = [{ host: "localhost", port: 9001 }];
proxy.on("request", (clientRequest, proxyResponse) => {
  const mainService = mainServices.shift();
  mainServices.push(mainService);

  console.log("Transfering data to our services");
  const proxyRequest = http.request({
    host: mainService.host,
    port: mainService.port,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: clientRequest.headers,
  });

  proxyRequest.on("response", (mainServiceResponse) => {
    proxyResponse.writeHead(
      mainServiceResponse.statusCode,
      mainServiceResponse.headers,
    );

    mainServiceResponse.pipe(proxyResponse);
  });

  clientRequest.pipe(proxyRequest);
});

proxy.listen(PORT, () => {
  console.log(`Proxy server is now listening on port ${PORT}`);
});
