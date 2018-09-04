var expect=require('expect');
var {isRealString}=require('./validation');

describe('Is Real String',()=>{
    it('should reject non-string values',()=>{
        var str=1243;
        expect(isRealString(str)).toBe(false);
    });

    it('should reject string with only spaces',()=>{
        var str='     ';
        expect(isRealString(str)).toBe(false);
    });

    it('should allow string with non-space characters',()=>{
        var str='Aman';
        expect(isRealString(str)).toBe(true);
    });
});