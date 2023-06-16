var imp1 = "(text in module imp1)";

function foofun(){
    return imp1;
}

var foo = foofun();

function xyz(){
    console.log(foo);
}

export { xyz };
