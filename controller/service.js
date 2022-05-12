const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const customerdata =mongoose.Schema({
    "customername":{type:String,required:true},
    "password" :String,
    "purchasedhistory"  :{Number,default:0},
    "billamount" : {type:Number,default:0}
})
const productdata =mongoose.Schema({
    "productname":String,
    "price" :Number,
     } )
  
const orderdata =mongoose.Schema({
        "date":String,
        "order-id":{type:Number,unique:true},
        "customername":String,
         "productname":String,
        "quantity":Number
    }
)

const model2=mongoose.model('productdetails',productdata)
const model1=mongoose.model('customerdetails',customerdata)
const model3=mongoose.model('orderdetails',orderdata)
let saveproduct=async(data,data1,data2)=>{
    const a=await model2.aggregate([{$match:{"productname":data1}}])
    if(a.length>0)
    {  await model2.updateOne({'productname':data1},{$set:{'price':data2}})
        return "product is updated"
    }
    else{
    const user=new model2({'productname':data1,'price':data2})
    await user.save()
    return "product added"
}
}

let takeorder=async(data,data1,data2,data3,id)=>{try{
     const a=await model2.aggregate([{$match:{"productname":data1}}])
     const d=a[0].price*data2;
     if(a.length>0){
     const order=await new model3({"customername":data,'productname':data1,'quantity':data2,'date':data3,'order-id':id})
     await order.save()
    await model1.updateOne({"customername":data},{$inc:{"billamount":+d}})
    await model2.updateOne({"productname":data1},{$inc:{"ordercount":data2,'purchasedhistory':1}})
    return "order taken"}
    else 
    return "order rejected no stock of ordered product"}
    catch(err){
        console.log(err)
        return 'error'
    }

}
let updateOrder=async(data,data1,data2,data3,id)=>{
   const a=await model2.aggregate([{$match:{"productname":data1}}])
     const d=a[0].price*data2;
     if(a.length>0){
    await model3.updateOne({'order-id':id},{$set:{"customername":data,'productname':data1,'quantity':data2,'date':data3}})
    await model1.updateOne({"customername":data},{$inc:{"order.billamount":+d}})
    await model2.updateOne({"productname":data1},{$inc:{"ordercount":data2,'purchasedhistory':1}})
    return "order taken"}
    else 
    return "order rejected no stock of ordered product"
}
let deleteOrder=async(data,data1,data2,data3,id)=>{
 const a=await model2.aggregate([{$match:{"productname":data1}}])
     const d=a[0].price*data2;
     if(a.length>0){
await model3.deleteOne({'order-id':id,"customername":data,'productname':data1,'quantity':data2,'date':data3})
    await model1.updateOne({"customername":data},{$inc:{"billamount":-d}})
    await model2.updateOne({"productname":data1},{$inc:{"ordercount":data2,'purchasedhistory':1}})
    return "order removed"}
    else 
    return "order rejected no stock of ordered product"
}
let show=()=>{const a =model1.aggregate([{$sort:{"order.billamount":-1}}])
console.log(a)
       return a
}
let register=async(data1,data2)=>{try{
    const a=await model1.aggregate([{$match:{"customername":data1}}])
    if(a.length>0)
    {
        return "user name already exist"
    }
    else{
    const user=new model1({"customername":data1,"password":data2})
    await user.save()
    return "registration sucess"
}
}
catch(err){
return "error"
}
}
let getuserdetails =async(data)=>{
    let getuserDetails=await model1.aggregate([{$match:{"customername":data}}]);
    return getuserDetails
    
}
let getproductcount=async(data)=>{
     let getproductDetails=await model3.aggregate([{$match:{"date":data}}]);
     let sum=0
     getproductDetails.forEach(element => {
        sum=sum+getproductDetails[0].quantity
    });
    return sum
}
let getData =async(data)=>{
    let get=await model3.find({"customername":data})
    return get
}
let orderlist=async(a)=>{
    let get=model3.aggregate([{$match:{"date":a}}])
    return get
}

module.exports={
    register,
    getuserdetails, 
    saveproduct,takeorder,updateOrder,deleteOrder,getData,show,orderlist,getproductcount
}