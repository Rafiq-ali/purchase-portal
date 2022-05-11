const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const customerdata =mongoose.Schema({
    "customername":String,
    "password" :String,
    "purchasedhistory"  :{Number,default:0},
    "order":{
        "productname":[String],
        "quantity":[Number],
        "date":[String]
        
    },
    "billamount" : {type:Number,default:0}
})
const productdata =mongoose.Schema({
    "productname":String,
    "price" :Number,
    "ordercount":{type:Number,
        default:0}
     } )
const orderdata =mongoose.Schema({
        "date":String,
        "ordersandwich":{
            "customername":[String],
            "status":[String],
            "productname":[String],
            "quantity":[Number]
        }
    }
)
const admin=mongoose.Schema({
    "adminname":String,
    "pin":String
})
const model2=mongoose.model('productdetails',productdata)
const model1=mongoose.model('customerdetails',customerdata)
const model3=mongoose.model('orderdetails',orderdata)
const model4=mongoose.model('admindetails',admin)
const a= model4.aggregate([{$match:{"adminname":"boss"}}])
    if(a.length==0)
    {
const adminstrator=new model4({ "adminname":"boss",
    "pin":"letmein"})
        adminstrator.save()}
let saveproduct=async(data,data1,data2)=>{
    const a=await model2.aggregate([{$match:{"productname":data1}}])
    if(a.length>0)
    {  await model2.updateOne({'productname':data1},{$set:{'price':data2}})
        return "product is updated"
    }
    else{
    const user=new model2(data)
    await user.save()
    return "product added"
}
}

let takeorder=async(data,data1,data2,data3)=>{
     const a=await model2.aggregate([{$match:{"productname":data1}}])
     const d=a[0].price*data2;
     if(a.length>0){
await model1.updateOne({"customername":data},{$push:{'order.productname':data1,'order.quantity':data2,'order.date':data3}})
    await model1.updateOne({"customername":data},{$inc:{"billamount":+d}})
    await model2.updateOne({"productname":data1},{$inc:{"ordercount":data2,'purchasedhistory':1}})
    const b=await model3.aggregate([{$match:{"date":data3}}])
    if(b.length>0)
    {  await model3.updateOne({'date':data3},{$push:{'ordersandwich.productname':data1,'ordersandwich.quantity':data2,'ordersandwich.customername':data,'ordersandwich.status':"ordered"}})
}
else{
    const user=new model3({'date':data3,'ordersandwich.productname':data1,'ordersandwich.quantity':data2,'ordersandwich.customername':data,'ordersandwich.status':"ordered"})
    await user.save()

}
    return "order taken"}
    else 
    return "order rejected no stock of ordered product"

}
let updateOrder=async(data,data1,data2,data3,id)=>{
   const a=await model2.aggregate([{$match:{"productname":data1}}])
     const d=a[0].price*data2;
     if(a.length>0){
    await model1.updateOne({"customername":data},{$set:{'order.productname':data1,'order.quantity':data2,'order.date':data3}})
    await model1.updateOne({"customername":data},{$inc:{"order.billamount":+d}})
    await model2.updateOne({"productname":data1},{$inc:{"ordercount":data2,'purchasedhistory':1}})
     const b=await model3.aggregate([{$match:{"date":data3}}])
    if(b.length>0)
    {  await model3.updateOne({'date':data3},{$push:{'ordersandwich.productname':data1,'ordersandwich.quantity':data2}})
    }
    else{
    const user=new model3({'date':data3,'ordersandwich.productname':data1,'ordersandwich.quantity':data2})
    await user.save()

}
    return "order taken"}
    else 
    return "order rejected no stock of ordered product"
}
let deleteOrder=async(data,data1,data2,data3)=>{
 const a=await model2.aggregate([{$match:{"productname":data1}}])
     const d=a[0].price*data2;
     if(a.length>0){
await model1.updateOne({"customername":data},{$pull:{'order.productname':data1,'order.quantity':data2,'order.date':data3}})
    await model1.updateOne({"customername":data},{$inc:{"billamount":-d}})
    await model2.updateOne({"productname":data1},{$inc:{"ordercount":data2,'purchasedhistory':1}})
    const b=await model3.aggregate([{$match:{"date":data3}}])
    if(b.length>0)
    {  await model3.updateOne({'date':data3},{$push:{'ordersandwich.productname':data1,'ordersandwich.quantity':data2,'ordersandwich.customername':data,'ordersandwich.status':"orderedcancelled"}})
}
else{
    const user=new model3({'date':data3,'ordersandwich.productname':data1,'ordersandwich.quantity':data2,'ordersandwich.customername':data,'ordersandwich.status':"orderedcancelled"})
    await user.save()

}
    return "order removed"}
    else 
    return "order rejected no stock of ordered product"
}
let show=()=>{const a =model1.aggregate([{$sort:{"order.billamount":-1}}])
console.log(a)
       return a
}
let register=async(data,data1)=>{
    const a=await model1.aggregate([{$match:{"customername":data1}}])
    if(a.length>0)
    {
        return "user name already exist"
    }
    else{
    const user=new model1(data)
    await user.save()
    return "registration sucess"
}
}
let getuserdetails =async(data)=>{
    let getuserDetails=await model1.aggregate([{$match:{"customername":data}}]);
    return getuserDetails
    
}
let getproductcount=async(data)=>{
     let getproductDetails=await model2.aggregate([{$match:{"productname":data}}]);
    return getproductDetails
}
let getadmin =async(data)=>{
    let get=await model4.aggregate([{$match:{"adminname":data}}]);
    return get
    
}
let getData =async(data)=>{
    let get=await model1.aggregate([{$match:{"customername":data}}]).find("order")
    return get
}
let orderlist=async(a)=>{
    let get=model3.aggregate([{$match:{"date":a}}])
    return get
}

module.exports={
    register,
    getuserdetails, 
    saveproduct,takeorder,updateOrder,deleteOrder,getData,getadmin,show,orderlist,getproductcount
}