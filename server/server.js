const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

var {generateMessage,generateLocationMessage}=require('./utils/message');
var {isRealString}=require('./utils/validation');
var {Users}=require('./utils/users');

const publicPath=path.join(__dirname,'../public');
var app=express();
var port=process.env.PORT || 3000;
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required');
        }else{

            //Now in order to connect other users to the same room, we use
            //the join method which takes a string
            socket.join(params.room);

            //to leave a room we use
            //socket.leave('Akatsuki');

            //after a user joins a room
            //the removeUser is called to remove the new user joined from
            //any other room, then we add the user
            
            users.removeUser(socket.id);
            users.addUser(socket.id,params.name,params.room);
            
            //then we will emit the updateuserlist event to all the people in
            //the room
            io.to(params.room).emit('updateUserList',users.getUserList(params.room));

            //Now to emit messages to every users in a room we will use the 
            //"to" method-
            //io.emit-->io.to('Akatsuki).emit
            //also to emit to everyone else but the current user-
            //socket.broadcast.emit-->socket.broadcast.to('Akatsuki').emit
            //socket.emit

            socket.emit('newMessage',generateMessage('Admin','Irasshaimase'));
            socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        
            callback();
        }
    });

    //socket serves a single pipeline and io serves all
    //meaning when io.emit runs it emits to all pipelines
    socket.on('createMessage',(message,callback)=>{
        var user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();

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
        var user=users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,location.latitude,location.longitude));    
        }
    });

    socket.on('disconnect',()=>{
        var user=users.removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
        }
        console.log('user was disconnected');
    });
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});