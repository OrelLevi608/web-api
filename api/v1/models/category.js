const mongoose = require('mongoose');
mongoose.pluralize(null);  // מבטל את הוספה של רבים בטבלה במונגו

// סכמה עבור מוצר
const categorySchema = new mongoose.Schema({
    cid:Number,
    cname:String
});

//  מודל עבור מוצר
module.exports = mongoose.model('category',categorySchema); 
