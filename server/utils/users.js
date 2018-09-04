//we will make a users array
// var users=[{
//     id,
//     name,
//     room
// }]

//These will have the following methods->
//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

//now there are two approaches-
//First one
//var users=[];
//i take an empty array and define functions in order to add users to array

//The second one will be to use function constructor
//Now function constructor can be made using two approaches

//First one-
// function Person(name,room,id){
//     this.name=name;
//     this.room=room;
//     this.id=id;
// }

// var me=new Person('aman','naruto',1);

//Second one-
//This is syntactic sugar
//the use of class

// class Person{
//     constructor(name,room,id){
//         this.name=name;
//         this.room=room;
//        this.id=id;
//     }
// }

// var me=new Person();

//Now Start

class Users{
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var resUser=this.getUser(id);
        
        if(resUser){
            this.users=this.users.filter((user)=> user.id !== id);
        }
        return resUser;
    }
    getUser(id){
        
        //the filter method creates a new array containing the elements which 
        //pass the test(given as function). On the other hand "find" method
        //will return the first element which passes the test.

        var resUser=this.users.find((user)=> user.id===id);
        return resUser;
    }
    getUserList(room){
        //the filter method will traverse the array and return the items matching
        //the condition
        var users=this.users.filter((user)=> user.room===room);
        
        //the map method will take each item from users and return the item
        //with only the name property
        var nameArray=users.map((user)=> user.name);

        return nameArray;
    }
}

module.exports={Users};