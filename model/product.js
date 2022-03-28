// จัดการ



//import mongoose
const mongoose = require('mongoose');



// connect mogodb
const dburl = 'mongodb://localhost:27017/productdb';
mongoose.connect(dburl,{
    useNewUrlParser:true,
    useUniFiedTopology:true
}).catch(err => console.log(err) );



// desing schema
var productschema  = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    decription:String
})




// model
const Product = mongoose.model("products" , productschema);



// export module
module.exports = Product;



// desing function save data 
module.exports.saveproduct = function(model , data){
    model.save(data)
}