const mongoose=require('mongoose')
var url='mongodb://127.0.0.1:27017/shoping';
mongoose.connect(url,{useNewUrlParser:true,
    useUnifiedTopology:true,});
    mongoose.connection.on('connected',()=>{console.log("mongoose connected")})
    mongoose.connection.on('disconnected',()=>{console.log("mongoose disconnected")})
    mongoose.connection.on('error',(err)=>{console.log("mongoose connection error")})
