const net = require("net");

const chatServer = net.createServer();
const clientList = [];

chatServer.on("connection", (client) => {

    // assigning a name
    client.name = client.remoteAddress + ":" + client.remotePort;

    // sending greeting
    client.write("Hi " + client.name);

    // adding to the client list
    clientList.push(client);

    // log in server
    console.log(clientList.length + " is connected");

    // register on data found event
    client.on("data", (data) => {
        broadcast(client, data);
    });

    // register on disconnect event
    client.on("end", () => {
        const name = client.name;
        clientList.splice(clientList.indexOf(client), 1);
        broadcast(null, name + " is disconnected");
    })
});


function broadcast(client, message) {

    // keep tracking of non-writable clients
    const cleanup = [];

    // looping through the clients
    for(var i = 0 ; i < clientList.length; i++) {
        if (client != clientList[i]) {
            if(clientList[i].writable) {
                clientList[i].write(message);
            } else {
                // keep for cleanup
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
        }
    }

    // now remove the cleanup clients
    for(var i = 0 ; i < cleanup.length; i++) {
        clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

chatServer.listen(8000);

console.log("connect via `telnet localhost 8000`");
console.log("Ctrl+C to quit");