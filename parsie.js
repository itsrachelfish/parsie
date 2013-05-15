var express     = require('express')
  , app         = require('express')()
  , server      = require('http').createServer(app)
  , io          = require('socket.io').listen(server)
  , net         = require('net')
  , parser      = require('packet').createParser();

server.listen(1044);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res)
{
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket)
{
    socket.emit('connected'); 
    
    socket.on('packet', function(data)
    {
        console.log('delicious');
        
        parser.extract("b8, b8, b16, b32", function (unknown, type, testing) {
          console.log(unknown, type, testing);
          
          socket.emit('parsed', [unknown, type, testing]);
        });

        console.log(data);

        parser.parse(new Buffer(data.message, 'hex'));
    });
});
