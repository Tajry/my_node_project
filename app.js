const { application } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const Cookieparser = require('cookie-parser');

const route = require('./route/myrouter'); // module
const { create } = require('./model/product');

app.use(session({secret:'mysession',resave:false,saveUninitialized:false}));
app.use(express.urlencoded({extended: false}));//เมื่อรับค่าในรูปแบบ  post ต้องใช้คำสั่งนี้  and have to use before use router 


//set first page
app.set('views',path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');


app.use(Cookieparser());

app.use(route) // use route from require









app.use(express.static(path.join(__dirname, 'public')));//อ้างอิงตำแหน่ง static flie
app.listen(5000 , ()=>{
    console.log('sever is runing on port 5000');
})