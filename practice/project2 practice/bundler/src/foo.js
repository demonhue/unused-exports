import imp1 from "./testimp/imp1.js";
import imp2 from "./testimp/imp2.js";


function foofun(){
    let ans = "anss ";
    {
        let imp2 = "local imp2 ";
        ans+=imp2;
    }
    ans+=imp1;
    return ans;
}

export default foofun;