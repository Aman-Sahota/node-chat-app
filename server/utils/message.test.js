var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from='Obito';
        var text='I am Obito Uchiha';
        var message=generateMessage(from,text);
        
        expect(message).toMatchObject({
            from,
            text
        });
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from='Obito';
        var latitude=1;
        var longitude=1;
        var url='https://www.google.com/maps/search/1,1'
        var location=generateLocationMessage(from,latitude,longitude);

        expect(typeof location.createdAt).toBe('number');
        expect(location).toMatchObject({from,url});
    });
});