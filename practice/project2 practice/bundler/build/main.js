'use strict';

var foo = require('./foo.js');

function xyz(){
    console.log(foo);
}

exports.xyz = xyz;
