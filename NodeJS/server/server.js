//npm install socket.ip
//www.socket.io
var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

console.log('Server is running at http://127.0.0.1:80/');
