const net = require("net")

const chatServer = net.createServer();
const clientList = [];

chatServer.on("connection", (client) => {
    // new client connected
    clientList.push(client);

    // assigning the client name
    client.name = client.remoteAddress + ":" + client.remotePort;

    client.write("Hi " + client.name);

    console.log(clientList.length + " client connected");

    client.on("data", (data) => {
        broadcast(data, client);
    });

});


function broadcast(message, client) {
    for(var i = 0 ; i < clientList.length; i++) {
        if (client != clientList[i]){
            clientList[i].write(client.name + " says : " +  message);
        }
    }
}

chatServer.listen(8000)

console.log("Connect via `telnet localhost 8000`")
console.log("Ctrl+C to disconnect")