const express=require('express');
const dotenv=require('dotenv');
const dbConnect=require('./server/models/dbConnect')
const app=express();
app.use(express.json());
dotenv.config();
const port=process.env.PORT 
const packageRoutes=require('./server/routes/packagesRoutes')
app.get('/',(req,res)=>{
    return res.send("<h1>Hello World</h1>")
})

app.use('/api/v1/packages',packageRoutes)

/**
 * Db connection
 */
dbConnect();
app.listen(port,(req,res)=>{
    console.log(`Server is runnning at ${port}`)
})