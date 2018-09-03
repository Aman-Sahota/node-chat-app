//unix epoch
//1 jan 1970 0:0:0
//in node miliseconds are used 1000=1s
// var date=new Date();
// console.log(date.getMonth());

var moment=require('moment');

//moment gives the current time
var date=moment();

//goto momentjs.com/docs/display/format to check for various formats
console.log(date.format('MMMM'));
console.log(date.format('Do MMM YYYY'));
console.log(date.format('h:mm a'));

//also-To convert timestamp into time
var createdAT=2376458;
var date2=moment(createdAT);
console.log(date2.format('h:mm a'));

//and to get timestamp value
var someTimestamp=moment().valueOf();
console.log(someTimestamp);
