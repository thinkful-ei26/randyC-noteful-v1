'use strict';
 
function requestLogger(req,res,next){

  const now = new Date();
  console.log(
    `${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
   
  next();
 
}


module.exports = requestLogger;


/*

  module.exports = thing;

  const thing = require("...")



  module.exports = {thing}

  const {thing} = require("...")
 

*/