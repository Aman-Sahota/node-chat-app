const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

var {generateMessage,generateLocationMessage}=require('./utils/message');

const publicPath=path.join(__dirname,'../public');
var app=express();
var port=process.env.PORT || 3000;
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.emit('newMessage',generateMessage('Admin','Irasshaimase'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    //socket serves a single pipeline and io serves all
    //meaning when io.emit runs it emits to all pipelines
    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('this is from server');

        //With io.emit in the socket.on(line 19) the socket itself also got
        //newMessage alert but if we use socket.braoadcast.emit it sends to all 
        //other sockets but not to itself

        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(location)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',location.latitude,location.longitude));
    });

    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});