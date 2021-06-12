var { EventEmitter } = require("events");

var myEmitter = new EventEmitter();

myEmitter.on("notice", () => {
  console.log("event emitted");
});

myEmitter.emit("notice");

var http = require("http");
var fs = require("fs");

var path = require("path");

http
  .createServer(function (res, req) {
    var filename = __dirname;
    var readStream = fs.createReadStream(path.join(__dirname, "readme.txt"));
    console.log(readStream);
    readStream.on("end", function () {
      readStream.pipe(res);
    });
    readStream.on("error", function (err) {
      res.end(err);
    });
  })
  .listen(4000);