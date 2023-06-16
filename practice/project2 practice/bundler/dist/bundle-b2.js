var imp1 = "(text in module imp1)";

function foofun(){
    let ans = "anss ";
    {
        let imp2 = "local imp2 ";
        ans+=imp2;
    }
    ans+=imp1;
    return ans;
}

function xyz(){
    console.log(foofun);
}

export { xyz };
