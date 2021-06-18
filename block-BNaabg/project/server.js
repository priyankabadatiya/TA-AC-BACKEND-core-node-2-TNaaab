let http = require('http');
let qs = require('querystring');
let fs = require('fs');
let url = require('url');
const userDir = __dirname + '/users/';
let server = http.createServer(handleRequest);

let url = require("url");

function handleRequest(req, res) {
    var store = "";
    let parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    req.on("data", (chunk) => {
      store += chunk;
    })
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/users') {
            let userName = JSON.parse(store).username;
            fs.open(userDir + userName + ".json", 'wx', (err, fd) => {
                if(err) return console.log(err);
                console.log(fd);
                fs.writeFile(fd, store, (err) => {
                    if(err) return console.log(err);
                    fs.close(fd, () => {
                        return res.end(`${userName} created successfully`);
                    });
                 });
                
            });
        }  
    }