const express=require('express');
const router =new express.Router();
let controller=require('../controller/index')
let routes=(app)=>{
router.post('/user',controller.user)
router.post('/register',controller.register)
router.post('/login',controller.login)
router.post('/productupload',controller.productupload)
router.post('/order',controller.createOrder)
router.post('/orderupdate',controller.updateOrder)
router.post('/ordercancel',controller.deleteOrder)
router.post('/admin',controller.adminlogin)
router.post('/ordercheck',controller.searchorder)
router.post('/customerlist',controller.customerlist)
router.post('/orderlist',controller.orderlist)
app.use('/api',router);
}
module.exports=routes