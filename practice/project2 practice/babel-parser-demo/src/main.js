import foo from './foo.js';
//import {abc as bcd, pqr} from "./goo";
function xyz(){
    console.log(foo);
}

xyz();

export {xyz as Default};