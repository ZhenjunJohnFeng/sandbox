var net = require('net');  

var clients = [];  

var Client = function(stream){  
this.name = null;  
this.stream = stream;  
};  

var server = net.createServer(function (stream) {
  stream.setEncoding('utf-8');  
  var address = stream.remoteAddress;
  var client = new Client(stream); 
  if (address == '127.0.0.1') {  
   client.name = 'system';  
   clients.push(client);  
}  

    
var timeout = setTimeout(function () { 
   if (client.name == null) { 
    stream.write('对不起，您已经超时！\n');
    stream.end(); 
   }  

  }, 10000);  

 
  stream.on('connect', function() {  

   if (address != '127.0.0.1') {  

    stream.write('请在10s内输入您的昵称！\n');  

   }   

  });  

    

  stream.on('data', function(data) {  

   if (client.name == null) {  

    var name = data.match(/\S+/);  

    var flag = false;  

    for (var key in clients) {  

      if (String(clients[key].name) == String(name)) {  

      flag = true;  

      stream.write('对不起，该昵称已被使用，请换个试试！\n');  

      break;  

     }  

    }  

    if (flag)  

    {  

     timeout;  

     return;  

    }  

    client.name = name;  

    stream.write('欢迎您进入聊天室！\n');  

    clients.forEach(function(c) {  

     if (c != client) {  

      c.stream.write(client.name+' 进入聊天室！\n');  

     }   

    });  

    clients.push(client);  

    return;  

   }  

    

   clients.forEach(function(c) {  

    if (c != client) {  

     c.stream.write(client.name+" : "+data);  

    }   

   });  

  });  

    

  stream.on('end', function() {  

   clients.forEach(function(c) {  

    if (c != client) {  

     c.stream.write(client.name+' 离开了！\n');  

    }  

   });  

   stream.end();  

   delete clients[client];  

  });  

 }); 
    

 server.listen(8000); 
