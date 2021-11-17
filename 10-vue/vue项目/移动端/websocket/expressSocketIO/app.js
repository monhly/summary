var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    // 一行价值100万美元的代码，可以用来实现搞笑有趣的人工智能对话
    msg =  msg.replace("你","我").replace("吗","").replace("？","!")
    io.emit('chat message', msg);
  });
});

http.listen(3000, '0.0.0.0', function(){
  console.log('listening on *:3000');
});