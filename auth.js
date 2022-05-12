'use strict';
const httpErrors=require('http-errors');
const JWT = require('jsonwebtoken');
const verifyJWT =async(req,res,cb)=>{
  console.log(req.headers.token)
    var token =req.headers['token'];
    if(!token)return res.status(404).send({auth:false,message:"no token"})
    console.log(process.env.JWT_SECRET_KEY)
     JWT.verify(token,process.env.JWT_SECRET_KEY,function(err, decoded){
            if (err) {
                res.status(400).send({ auth: false, message: 'invalid token' });
            }
            else {
                console.log(decoded)
                cb();
            }
        })
}
/*const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  JWT.verify(token,process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.sendStatus(401);
    }
    console.log(decoded)
    next();
  });
}*/
module.exports= verifyJWT;
/*verifyToken*/