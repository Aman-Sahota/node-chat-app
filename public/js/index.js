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

            var messageTextBox=jQuery('[name=message]');

            socket.emit('createMessage',{
                from:'User',
                text:messageTextBox.val()
            },function(){
                messageTextBox.val(null);
            });
        });

        var locationButton=jQuery('#send-location');
        locationButton.on('click',function(){
            if(!navigator.geolocation){
                return alert('Geolocation not supported by the browser');
            }

            locationButton.attr('disabled','disabled').text('sending location...');

            navigator.geolocation.getCurrentPosition(function(position){
                locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage',{
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                });
            },function(){
                locationButton.removeAttr('disabled').text('Send location');
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