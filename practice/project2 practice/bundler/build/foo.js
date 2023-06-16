'use strict';

var imp1 = require('./testimp/imp1.js');

function foofun(){
    let ans = "anss ";
    {
        let imp2 = "local imp2 ";
        ans+=imp2;
    }
    ans+=imp1;
    return ans;
}

module.exports = foofun;
