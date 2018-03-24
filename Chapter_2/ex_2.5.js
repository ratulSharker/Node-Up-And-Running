const net = require("net");

const chatServer = net.createServer();
const clientList = [];


chatServer.on("connection", (client) => {
    // new client connected
    clientList.push(client);

    client.write("Hi");
    console.log(clientList.length + " client connected");

    client.on("data", (data) => {
        // data recieved from client
        console.log("data recieved from client")
        for(var i=0 ; i < clientList.length; i++)
        {
            clientList[i].write(data)
        }
    })
});

chatServer.listen(8000)

console.log("Connect by typing `telnet localhost 8000`")
console.log("Ctrl+C for quit")
