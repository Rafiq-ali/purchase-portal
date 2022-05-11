const app=require('express')()
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
const {TextEncoder,TextDecoder} = require('util')
require('./Router/route')(app)
require('./Config/mongoose')
const port =6600;
app.listen(port,()=>{console.log(`server is listening at port ${port}`)})