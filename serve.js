#!/usr/bin/node

var connect = require('connect'),
    port = process.argv[2] || 8080,
    ip = getIPAddress();

console.log('Usage node server.js [port]');

try {

    connect.createServer(
        connect.static(__dirname)
    ).listen(port);

    console.log('Running:' + __dirname + ' on ' + ip + ':' + port);
} catch(e) {
    console.log('Error!');
    console.log(e);
}

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
}
