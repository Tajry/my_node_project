const express = require('express');
const res = require('express/lib/response');

// use model
const Product = require('../model/product');


//upload file
const multer = require('multer');
const { redirect, render } = require('express/lib/response');

// keep file and cheng name file
const storage  = multer.diskStorage({
  
    destination:function(req,file,cd){
        cd(null,"./public/images/products");  //location for keep file
    },
    filename:function(req,file,cd){
        cd(null,Date.now()+".jpg"); // rename file
    }

})
// set upload
const upload =  multer({
    storage:storage 
})


// const app = express();
// const path = require('path');
const route = express.Router();

route.get('/', (req, res)=>{
    Product.find().exec((err,doc)=>{
        if (err) throw err; 
        res.render('index.ejs', {product:doc});
    })
    
})

route.get('/product/:id', (req ,res) =>{
    const product_id = req.params.id

    Product.findOne({id:product_id}).exec((err,doc)=>{
        if (err) console.log(err) ;
        // console.log(doc)
        res.render('product' ,{product:doc})
    })
    
})

route.get('/form', (req, res)=>{

    if (req.session.login) {
        let name = "hello form";
        res.render('form',{name: name});
        
    }else{
        res.render('admin');
    }
    
})
// logout
route.get('/logout' , (req, res) =>{
   req.session.destroy((err)=>{
        res.redirect('/manage')

   })
})



route.get('/manage', (req, res)=>{
    if (req.session.login){
        Product.find().exec((err,doc)=>{
            if (err) throw err; 
            res.render('manage' ,{product:doc});
            
            
        })

    }else{
        res.render('admin')
    }
   
})

// delete data 
route.get('/delete/:id',(req, res)=>{
   
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        res.redirect('/manage');
    })

})


route.post('/insert',upload.single("image"), (req,res)=>{
    

    const data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        decription:req.body.decription
    })
    Product.saveproduct(data, (err)=>{ //use function save
        if (err) throw err;
        res.redirect('/form');
    })
    
})
route.post('/login',(req,res)=>{
    const username  = req.body.username
    const password  =  req.body.password

    if (username === 'admin' && password  === '123'){
        req.session.username = username;
        req.session.password = password;
        req.session.login = true;
        req.session.cookie.maxAge  = 300000
        res.redirect('/manage');
    }else {

        
        
        res.render('admin',{tell:"passwoerd"});
    }
})



module.exports = route ;