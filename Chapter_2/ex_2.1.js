const net = require('net')

const chatServer = net.createServer();

chatServer.on("connection", function(client){
    client.write("Hi\n");
    client.write("Bye!\n");

    client.end();
});

chatServer.listen(8000);
console.log("Use `telnet` to connect this simple chat server")
console.log("type `telnet 127.0.0.1 8000` in terminal to get connected ")