var fs = require("fs");
var SwaggerParser = require('swagger-parser');



function Validator(file) {
  this.file = file;
  this.parser = new SwaggerParser();
}
Validator.prototype.validate = function() {
  var me = this;
  return this.parser.validate(this.file)
    .then(function(api) {
      console.log("Valid API, File: %s, API Name: %s, Version: %s", me.file, api.info.title, api.info.version);
    })
    .catch(function(err) {
      console.error("Invalid API, File: %s, Error: %s", me.file, err);
    });
};

module.exports = Validator;

function testFiles (dir){
  var files = fs.readdirSync(dir);
   for (var i in files){
       var fname = dir + "/" + files[i];
       if (fs.statSync(fname).isDirectory()){
           //testFiles(name);
           console.log("Skipped dir " + fname);
       } else {
         if (fname.endsWith(".yaml")) {
           var validator = new Validator(fname);
           validator.validate();
         } //else {
           //console.log("Skipped file " + fname);
         //}
       }
   }
 }

testFiles (".");
