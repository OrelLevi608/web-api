const mongoose = require('mongoose');  //  חיבור לספריה העבודה מול מונגו
mongoose.pluralize(null);  // s אז זה יוסיף את האות product את המילה mongoose.modelורשמתי ב products מבטל את השלמה של השם של הטבלה דוגמא: אם השם של הטבלה 

// נגדיר סכמה עבור מוצר
const productSchema = new mongoose.Schema({
    pid:Number,
    cid:Number,
    pname:String,
    price:Number,
    picname:String
});

// ניצור מודל עבור מוצר
module.exports = mongoose.model('products',productSchema);  // מציין את הסכמה שיצרנו - productSchema  ,מציין את שם הטבלה - products
