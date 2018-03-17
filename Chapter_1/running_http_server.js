const http = require('http');

http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end("Hello world");
    
}).listen(8000, "127.0.0.1");

console.log("Type http://localhost:8000 on your browser");
console.log("Ctrl+C to quit the program");