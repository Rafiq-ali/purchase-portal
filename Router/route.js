const express=require('express');
require('dotenv');
const auth=require('../auth')
const upload=require('../middleware/uploadfile')
const router =new express.Router();
let controller=require('../controller/index')
let routes=(app)=>{
router.post('/register',upload.single('register'),controller.register)
router.post('/login',upload.single('login'),controller.login)
router.post('/productupload',upload.single('product'),controller.productupload)
router.post('/order',upload.single('order'),auth,controller.createOrder)
router.post('/orderupdate',upload.single('order'),auth,controller.updateOrder)
router.post('/ordercancel',auth,upload.single('order'),controller.deleteOrder)
router.post('/productcountbydate',auth,upload.single('date'),controller.productcount)
router.post('/orderedproductbycustomer',auth,upload.single('name'),controller.searchorder)
router.post('/customerlist',auth,controller.customerlist)
router.post('/orderlistbydate',auth,upload.single('date'),controller.orderlist)
app.use('/api',router);
}
module.exports=routes