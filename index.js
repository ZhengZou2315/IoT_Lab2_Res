// document.onkeydown = updateKey;
// document.onkeyup = resetKey;

var server_port = 65432;
var server_addr = "192.168.1.209";   // the IP address of your Raspberry PI
// var server_addr = 'D8:3A:DD:21:3F:0E';
// var server_port = 1;

function client(param){
    
    const net = require('net');
    var input = document.getElementById("message").value;
    if (param != '') {
        input = param;
    }

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        // document.getElementById("direction").innerHTML = data;
        // document.getElementById("speed").innerHTML = data.length;
        // document.getElementById("speed").innerHTML = typeof(String(data));
        data = String(data);
        if (data.includes(',')) {
            words = data.split(',');
            document.getElementById("direction").innerHTML = words[0];
            document.getElementById("speed").innerHTML = words[1];
            document.getElementById("distance").innerHTML = words[2];
            document.getElementById("bluetooth").innerHTML = '';
        } else {
            document.getElementById("bluetooth").innerHTML = data;
            document.getElementById("direction").innerHTML = '';
            document.getElementById("speed").innerHTML = '';
            document.getElementById("distance").innerHTML = '';
        }
        
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });


}

// for detecting which key is been pressed w,a,s,d
function update_key(e) {

    e = e || window.event;

    if (e == 'up') {
        // up (w)
        document.getElementById("upArrow").style.color = "green";
        // send_data("87");
        // client(e);
    }
    else if (e == 'left') {
        // down (s)
        document.getElementById("leftArrow").style.color = "red";
        // send_data("83");
    }
    else if (e == 'down') {
        // left (a)
        document.getElementById("downArrow").style.color = "blue";
        // send_data("65");
    }
    else if (e == 'right') {
        // right (d)
        document.getElementById("rightArrow").style.color = "black";
        // send_data("68");
    }
    client(e);
}

// reset the key to the start state 
function reset_key(e) {

    e = e || window.event;

    document.getElementById("bluetooth").innerHTML = '';
    document.getElementById("direction").innerHTML = '';
    document.getElementById("speed").innerHTML = '';
    document.getElementById("distance").innerHTML = '';
    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
}


// update data for every 50ms
function update_data(){
    setInterval(function(){
        // get image from python server
        client('');
    }, 3350);
}
