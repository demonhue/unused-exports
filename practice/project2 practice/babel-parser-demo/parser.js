const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const fs = require('fs');
const path = require('path');

//import {readFileSync} from 'fs';

//const ast = Parser.parse(readFileSync('./src/main.js').toString());


const fullPath = path.join(__dirname, 'src');

let exportedVariables = [];
let importedVariables = [];

function getExtension(nameOfTheFile){
    let dot = false;
    let ext = "";
    for(let i = 0;i<nameOfTheFile.length;++i){
        if(dot)ext+=nameOfTheFile[i];
        if(nameOfTheFile[i]==='.')dot = true;
    }
    return ext;
}

fs.readdir(fullPath, (error, files) => {
    if (error) console.log(error)
    files = files.filter( file => getExtension(file) == 'js').map(file => `./src/${file}`);
    console.log(files);

    files.forEach(file => {

        const code = fs.readFileSync(file).toString();
        //console.log(code);

        const ast = parse(code,{
            sourceType: "module",
        
            plugins: [
            "jsx",
            "flow",
            ],
        });

        traverse(ast, {
            ExportSpecifier(path){
                console.log({localName: `path.node.local.name${file}`,exportedName: `path.node.exported.name${file}`});
                exportedVariables.push({localName: path.node.local.name,exportedName: path.node.exported.name});
            }
        });

        traverse(ast, {
            ImportDeclaration(path) {
                const relativeAddressOfSource = path.node.source.value;
                if(path.node.specifiers!=null && path.node.specifiers.length){
                    //console.log(path.node.specifiers);
                    path.node.specifiers.forEach(value => importedVariables.push({
                        importedName: (value.type == 'ImportDefaultSpecifier')?"Default":value.imported.name, 
                        localName: value.local.name,
                        from: relativeAddressOfSource
                    }));
                }
            }
        });
    });
});

console.log("List of Exports:",exportedVariables);
console.log("List of Imports:",importedVariables); 