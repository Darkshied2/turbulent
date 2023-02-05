const mongoose = require("mongoose")


const User =mongoose.Schema({
    id: String,
    name : String,
    email:String,
    password: String,
});

module.exports=mongoose.model("User",User)