const mongoose = require('mongoose');
mongoose.pluralize(null);  

// סכמה עבור מוצר
const userSchema = new mongoose.Schema({
    userid:Number,
    email:String,
    pass:String,
    fullname:String,
    phone:String
});

//  מודל עבור מוצר
module.exports = mongoose.model('users',userSchema); 
