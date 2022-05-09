const express=require('express');
const res = require('express/lib/response');
const { stringify } = require('nodemon/lib/utils');
const router =new express.Router();
let loggedin=false
let servent=require('./service')
let user  = async(req,res) =>{
  
    console.log("Welcome to Node JS")
    res.send({"Result":`sum is ${2+2}`})


}
let orderlist =async(req,res)=>{
     let date=req.body.date
     console.log(date)
    let result=await servent.orderlist(date)
    res.send(result)

}
let register=async(req,res)=>{
    let name=req.body.customername;
    let data=req.body;
    let result=await servent.register(data,name)
    res.send(result);
}
let customerlist=async(req,res)=>{
    if(loggedin=="admin"){
        let result=await servent.show()
        res.send(result)}
        else
        res.send("login admin access customer list")
}
let productupload=async(req,res)=>{
    if(loggedin=="admin"){
    let name=req.body.productname;
    let data=req.body;
    let price=req.body.price;
    let result=await servent.saveproduct(data,name,price)
    res.send(result);}
    else{
        res.send("login as admin to upload product")
    }
}
let createOrder=async(req,res)=>{
    if(loggedin){
    let customername=req.body.customername
    let productname=req.body.productname
    let quantity=req.body.quantity
    let date=req.body.date
    let all=req.body
    const data= await servent.takeorder(customername,productname,quantity,date,all)
    res.send(data)}
else
    res.send("login to order product")
}
let searchorder =async(req,res)=>{
    if(loggedin){
    let getdata=await servent.getData(req.customername);
     console.log("getdata",getdata)
    res.send(getdata)}
   else
   res.send("login check your order")
}
let updateOrder=async(req,res)=>{
    if(loggedin){
    let customername=req.body.customername
    let productname=req.body.productname
    let quanity=req.body.quantity
    let date=req.body.date
    const data= await servent.updateOrder(customername,productname,quanity,date)
    res.send(data)}
else
    res.send("login to order product")
}
let deleteOrder=async(req,res)=>{
    if(loggedin){
    let customername=req.body.customername
    let productname=req.body.productname
    let quanity=req.body.quantity
    let date=req.body.date
    const data= await servent.deleteOrder(customername,productname,quanity,date)
    res.send(data)}
else
    res.send("login to order product")
}
let login =async(req,res)=>{
    let username=req.body.customername;
    let password=req.body.password;
    let getdata=await servent.getuserdetails(username);
   if(getdata.length==0){
    res.send({"code":"400","message":"user not found create a account to proceed"})
   }
   else
   {
       if(password==getdata[0].password){
           loggedin=true
       res.send(`code:200,message:login sucess`)
    }
       else
    res.send({"code":"400","message":"password incorrect"})
   }}
  let adminlogin =async(req,res)=>{
    let username=req.body.adminname;
    let password=req.body.pin;
    let getdata=await servent.getadmin(username);
   if(getdata.length==0){
    res.send({"code":"400","message":"user not found create a account to proceed"})
   }
   else
   {
       if(password==getdata[0].pin){
           loggedin="admin"
       res.send(`code:200,message:login sucess`)
    }
       else
    res.send({"code":"400","message":"password incorrect"})
   }}
   
module.exports={user,register,login,productupload,createOrder,updateOrder,deleteOrder,searchorder,adminlogin,customerlist,orderlist}