var http = require("http");

let server = http.createServer(handleServer);

let fs = require("fs");
let qu = require("qu");

function handleServer(req, res) {
  let store = "";
  let contentType = req.headers["content-type"];
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.url === "/form" && req.method === "GET") {
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream("./form.html").pipe(res);
    } else if (req.method === "POST" && req.url === "/form") {
      res.setHeader("Content-Type", "text/html");
      let parseData = qu.parse(store);
      res.end(`
            <h1>${parseData.name}</h1>
            <h2>${parseData.email}</h2> 
            <h2>${parseData.age}</h2>`);
    }
  });
}

server.listen(5678, ()=>{
    console.log('server listening on port 5678')
})

