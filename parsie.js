var express     = require('express')
  , app         = require('express')()
  , server      = require('http').createServer(app)
  , io          = require('socket.io').listen(server)
  , net         = require('net')
  , parser      = require('packet').createParser()
  , serializer  = require('packet').createSerializer();

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
        console.log(data);

        try
        {
            parser.extract(data.pattern, function ()
            {
                var args = Array.prototype.slice.call(arguments);
                socket.emit('parsed', args);
            });

            parser.parse(new Buffer(data.packet, 'hex'));
        }
        catch(e)
        {
            socket.emit('error', {name: e.name, message: e.message});
        }
    });
});
