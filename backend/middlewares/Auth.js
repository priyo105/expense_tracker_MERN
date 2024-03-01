var { expressjwt: jwt } = require("express-jwt");


require('dotenv/config');

const auth=jwt({
    secret: process.env.secret,
    algorithms: ["HS256"],
    // isRevoked:isRevoked
  }).unless({
    path:[
        '/auth',
         {url:/auth(.*)/,methods:['GET','OPTIONS']},   
         '../public/*'   // pictures donot require token     
    ],
   
  });

  async function isRevoked(req,payload,done){
    console.log(payload.payload.isAdmin);
    if(!payload.payload.isAdmin){
        return true
    }
        return false
  }

  module.exports=auth;