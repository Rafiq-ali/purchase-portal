const express=require('express');
const CSVToJSON=require('csvtojson')
const res = require('express/lib/response');
require('http-errors')
const { stringify } = require('nodemon/lib/utils');
const jsonwebtoken = require('jsonwebtoken');
const fs=require('fs')
const router =new express.Router();
const csv=require('csv-parser')
let servent=require('./service')
let orderlist =async(req,res)=>{
        try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    let date=temp[0].date;
     console.log(date)
    let result=await servent.orderlist(date)
        res.send(result)}
         }
    catch{
        console.log("error")
    }
}
let register=async(req,res)=>{
     try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    let data1=temp[0].customername;
    let data2=temp[0].password;
    console.log(temp)
    let result=await servent.register(data1,data2)
    res.send(result);
}
  }
    catch{
        console.log("error")
    }
}
let customerlist=async(req,res)=>{
        let result=await servent.show()
        res.send(result)}
let productupload=async(req,res)=>{
  
    try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    console.log(temp)
      let name=temp[0].productname;
    let data=temp;
    let price=parseInt(temp[0].price);
    let result=await servent.saveproduct(data,name,price)
    res.send(result);
    }
}
    catch{
        console.log("error")
    }
   
}

let createOrder=async(req,res)=>{
     try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    console.log(temp)
    let customername=temp[0].customername
    let productname=temp[0].productname
    let quantity=parseInt(temp[0].quantity)
    let date=temp[0].date
    let id=parseInt(temp[0].orderid)
    const data= await servent.takeorder(customername,productname,quantity,date,id)
    res.send(data)}
     }
     catch{
          console.log("error")
     }
    }
let searchorder =async(req,res)=>{
     try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    let data1=temp[0].customername;
    let getdata=await servent.getData(data1);
     console.log("getdata",getdata)
    res.send(getdata)}
      }
     catch{
          console.log("error")
     }
    }
let updateOrder=async(req,res)=>{
     try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    console.log(temp)
    let customername=temp[0].customername
    let productname=temp[0].productname
    let quantity=parseInt(temp[0].quantity)
    let date=temp[0].date
    let id=parseInt(temp[0].orderid)
    const data= await servent.updateOrder(customername,productname,quantity,date,id)
    res.send(data)}
      }
     catch{
          console.log("error")
     }
    }
let deleteOrder=async(req,res)=>{
     try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    console.log(temp)
    let customername=temp[0].customername
    let productname=temp[0].productname
    let quantity=parseInt(temp[0].quantity)
    let date=temp[0].date
    let id=parseInt(temp[0].orderid)
    const data= await servent.deleteOrder(customername,productname,quantity,date,id)
    res.send(data)}
    }
     catch{
          console.log("error")
     }
    }
let login =async(req,res)=>{
     try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    let data1=temp[0].customername;
    let data2=temp[0].password;
    let getdata=await servent.getuserdetails(data1);
   if(getdata.length==0){
    res.send({code:"400",message:"user not found create a account to proceed"})
   }
   else
   {
       if(data2==getdata[0].password){
           const token=jsonwebtoken.sign({
           customername:getdata[0].customername
           },process.env.JWT_SECRET_KEY)
       res.send({status:200,message:"login sucess",accessToken:token})
    }
       else
    res.send({status:400,message:"password incorrect"})
   }}
    }
     catch{
          console.log("error")
     }
    }
   let productcount = async(req,res)=>{
       try{
     if(req.file==undefined)
     res.send('upload only a csv file')
     else{
      const path="./files/"+req.file.filename
    console.log(path)
    const temp= await CSVToJSON().fromFile(path)
    let date=temp[0].date;
       let result=await servent.getproductcount(date)
       console.log(result)
       res.send(`product ordered in ${date} is ${result}`)
   }
    }
     catch{
          console.log("error")
     }
    }
   
module.exports={register,login,productupload,createOrder,updateOrder,deleteOrder,searchorder,customerlist,orderlist,productcount}