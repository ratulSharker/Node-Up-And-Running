const net = require('net');

const chatServer = net.createServer();

chatServer.on('connection', function(client){
    client.write("Hi\n");
    client.on('data', function(data){
        console.log(data);
    })    
});

chatServer.listen(8000);
console.log("\nConnect via `telnet 127.0.0.1 8000`");
console.log("Type some message, then enter, they'll appear here");
console.log("Ctrl+C to quit");