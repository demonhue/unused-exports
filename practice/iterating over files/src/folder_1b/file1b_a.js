import hello from '../file_1a';
import bye from '../folder_1a/file1a_a';
//import {abc as bcd, pqr} from "./goo";
function xyz(){
    console.log(hello);
}

xyz();

export {xyz as Default};