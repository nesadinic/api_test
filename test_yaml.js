var fs = require("fs");
var SwaggerParser = require('swagger-parser');

function testFiles (dir){
  var files = fs.readdirSync(dir);
   for (var i in files){
       var fname = dir + "/" + files[i];
       if (fs.statSync(fname).isDirectory()){
           //testFiles(name);
           console.log("Skipped dir " + fname);
       } else {
         if (fname.endsWith(".yaml")) {
           SwaggerParser.validate(fname)
             .then(function(api) {
               console.log("Valid API: Name: %s, Version: %s %s", api.info.title, api.info.version, fname);
             })
             .catch(function(err) {
               console.error("Error: %s File: %s", err, fname);
             });
         } else {
           console.log("Skipped file " + fname);
         }
       }
   }
 }

testFiles (".");
