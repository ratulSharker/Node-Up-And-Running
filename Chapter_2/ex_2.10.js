const net = require("net");

const chatServer = net.createServer();
const clientList = [];

chatServer.on("connection", (client) => {

    // new client connected
    client.name = client.remoteAddress + ":" + client.remotePort;
    
    // greetings
    client.write("Hi " + client.name);

    // adding to the list
    clientList.push(client);

    // server side log
    console.log(clientList.length + " client is connected");

    client.on('data', (data) => {
        broadcast(client, data);
    });


    client.on('end', () => {
        const disconnectedClient = client.name;
        console.log(disconnectedClient + " has disconnected");
        clientList.splice(clientList.indexOf(client), 1);
        broadcast(null, disconnectedClient + " has disconnected");
    });



});



function broadcast(client, message) {
    for(var i = 0 ; i < clientList.length; i++) {
        if (client != clientList[i]) {
            clientList[i].write(message);
        }
    }
}

chatServer.listen(8000);

console.log("To connect client `telnet localhost 8000`");
console.log("Ctrl+C to quit");