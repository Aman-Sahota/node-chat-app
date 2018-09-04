const expect=require('expect');

var {Users}=require('./users');

var Akatsuki;

beforeEach(()=>{
    Akatsuki=new Users();
    Akatsuki.users.push({
        id:'1',
        name:'Obito',
        room:'Leaf'
    },{
        id:'2',
        name:'Kisame',
        room:'Mist'
    },{
        id:'3',
        name:'Itachi',
        room:'Leaf'
    });
});


describe('Users',()=>{
    it('should add a new user',()=>{
        var users=new Users();
        var user={
            id:1,
            name:'Sasori',
            room:'Sand'
        }
        var resUser=users.addUser(user.id,user.name,user.room);
        expect(users.users).toMatchObject([user]);
    });

    it('should remove a user',()=>{
        var user=Akatsuki.removeUser('2');

        expect(Akatsuki.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        var user=Akatsuki.removeUser('4');

        expect(user).toBeFalsy();
        expect(Akatsuki.users.length).toBe(3);
    });

    it('should get a user',()=>{
        var user=Akatsuki.getUser('1');
                
        expect(user).toMatchObject(Akatsuki.users[0]);
    });

    it('should not get a user',()=>{
        var user=Akatsuki.getUser('4');
                
        expect(user).toBeFalsy();
    });

    it('should return names for Leaf',()=>{
        var userList=Akatsuki.getUserList('Leaf');

        expect(userList).toEqual(['Obito','Itachi']);
    });

    it('should return names for Mist',()=>{
        var userList=Akatsuki.getUserList('Mist');

        expect(userList).toEqual(['Kisame']);
    });

});
