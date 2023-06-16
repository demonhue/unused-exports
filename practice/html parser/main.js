const parser = require("htmlparser2");
const fs = require("fs");

//console.log(parser);

const ast = parser.parseDocument(fs.readFileSync('./src/file.html').toString());

console.log(ast);
