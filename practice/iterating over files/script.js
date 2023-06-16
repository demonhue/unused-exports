const fs = require("fs");
const {parse} = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const _path = require("path");
const dir = _path.join(__dirname,'src');

function getExtension(filename){
  return filename.split('.').pop();
}

function isJSFile(filename){
  const ext = getExtension(filename);
  return (ext === "js" || ext === "jsx");
}

const files = [];

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
      let fullPath = _path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
         traverseDir(fullPath);
       } else if(isJSFile(file)){
         files.push(fullPath);
       }  
    });
}

traverseDir(dir);

/////////////

files.forEach(file => {

  const code = fs.readFileSync(file).toString();

  const ast = parse(code,{
      sourceType: "module",
  
      plugins: [
      "jsx",
      "flow",
      ],
  });

  traverse(ast, {
      ExportSpecifier(path){
          //console.log({localName: `path.node.local.name${file}`,exportedName: `path.node.exported.name${file}`});
          console.log("EXPORT",{localName: path.node.local.name,exportedName: path.node.exported.name})
          //exportedVariables.push({localName: path.node.local.name,exportedName: path.node.exported.name});
      }
  });

  traverse(ast, {
      ImportDeclaration(path) {
          const relativeAddressOfSource = path.node.source.value;
          const absoluteAddressOfSource = _path.join(file,"..",relativeAddressOfSource);
          if(path.node.specifiers!=null && path.node.specifiers.length){
              //console.log(path.node.specifiers);
              path.node.specifiers.forEach(value => console.log("IMPORT",{
                  importedName: (value.type == 'ImportDefaultSpecifier')?"Default":value.imported.name, 
                  localName: value.local.name,
                  from: absoluteAddressOfSource
              }));
          }
      }
  });
});