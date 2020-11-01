// simple HTTP server using TCP sockets
var net = require('net');
var fs = require('fs');
var http = require('http');
let slicedStringedJSON;
let slicedJSON = "";

var server = net.createServer(function (socket) {
    socket.on('data', function (data) {

        // console.log('Received: ' + data);

        r = data.toString();

        // console.log(r.substring(0, 3));
        
        // This is for when the server does a "GET" to retrieve the updated coordinates
        if (r.substring(0, 3) == "GET" ) {
            console.log("Between these two is my initial get");
            console.log(r);
            console.log("Between these two");
            //socket.write("OK");
            socket.write("HTTP/1.1 200 OK\n");
            socket.write("Access-Control-Allow-Origin: *\n");
            let contents = JSON.stringify(slicedJSON);
         
                // console.log(contents);
                socket.write("Content-Length:" + contents.length);
                socket.write("\n\n");
                socket.write(contents);
            
        };
        // If the query starts with POST, that means we just put a marker, in which case, we store the JSON for that
        // In a global variable, which the GET should be able to access.
        if (r.substring(0, 4) == "POST") {
            //socket.write("OK");
           // socket.write("HTTP/1.1 200 OK\n");
            console.log("something");
            console.log(r);
            let x = r.toString().indexOf("{");
            let y = r.toString().indexOf("}}");
            slicedStringedJSON = r.toString().slice(x,y+2);
            console.log(slicedStringedJSON);
            slicedJSON = JSON.parse(slicedStringedJSON);
            
        };

    });
    socket.on('close', function () {
        console.log('Connection closed');
    });
    socket.on('end', function () {
        console.log('client disconnected');
    });
    socket.on('error', function () {
        console.log('Error so client disconnected');
    });
});
server.listen(3000, function () {
    console.log('server is listening on port 3000');
});