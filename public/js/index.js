var socket=io();    
        socket.on('connect',function(){
            console.log('connected to server');
        });

        socket.on('disconnect',function(){
            console.log('disconnected from server');
        });

        socket.on('newMessage',function(message){
            console.log('new Message',message);
            var li=jQuery('<li></li>');
            li.text(`${message.from}:${message.text}`);

            //above i simply created a new li(tag) and set its value
            //below i will add this li to the ol in Index.html file
            jQuery('#messages').append(li);
        });
        
        jQuery('#message-form').on('submit',function(e){
            e.preventDefault();

            socket.emit('createMessage',{
                from:'User',
                text:jQuery('[name=message]').val()
            },function(){

            });
        });

        var locationButton=jQuery('#send-location');
        locationButton.on('click',function(){
            if(!navigator.geolocation){
                return alert('Geolocation not supported by the browser');
            }

            navigator.geolocation.getCurrentPosition(function(position){
                socket.emit('createLocationMessage',{
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                });
            },function(){
                alert('Not able to fetch location');
            });
        });

        socket.on('newLocationMessage',function(locationMessage){
            console.log('new Message',locationMessage);
            var li=jQuery('<li></li>');
            var a=jQuery('<a target="_blank">My current location</a>')
            li.text(`${locationMessage.from}: `);
            a.attr('href',locationMessage.url);
            li.append(a);
            jQuery('#messages').append(li);
        });