require('dotenv').config(); // זה מאפשר לנו לשמור על הגדרות היישום בצורה מאובטחת ולא מפורסמת על ידי הפרדה שלהם מהקוד המקורי.
const mysql = require('mysql');  //ייבוא ספריה

// חיבור של ספריות
const jwt = require('jsonwebtoken');  // JWT (JSON Web Tokens), מאפשרת לנו ליצור ולוודא טוקנים המשמשים לאימות  משתמשים באפליקציה
const session=require('express-session'); // וכדומה cookie, tokens  היא מספקת דרך לזהות משתמשים באפליקציה זה יכול להיות באמצעות קבצי
const express = require('express'); // HTTP היא מספקת את הפונקציונליות המרכזית ליצירת וניהול יישומי  Node.js היא ספריית השרת העיקרית ביישום ב
const morgan = require('morgan'); // של הבקשות לשרת. זה עוזר בניטור ובניתוח של פעולות השרת. (log)  שמצויה כדי לייצר יומן  middleware  היא  morgan  ספריית 
const mongoose = require('mongoose');  // MongoDB  שמטרתה לספק פתרון פשוט ונוח לניהול מסדי נתונים  ORM (Object-Document Mapping) היא ספריית  mongoose  ספריית
const MongoStore = require('connect-mongo');  // כדי שהן תהיינה ניתנות לשמירה ולשחזור, גם לאחר הפסקות בשרת. MongoDB מאפשרת לשמור את המשתמש במסד נתונים  connect-mongo  ספריית
const bcrypt = require('bcrypt'); // משמשת לצורך הצפנת ופענוח של סיסמאות. היא מספקת פונקציות ליצירת האשכולות של סיסמאות בצורה מאובטחת. bcrypt  ספריית
const app = express();  

const productRouter = require('./api/v1/routes/products');
const categoryRouter = require('./api/v1/routes/category');
const userRouter = require('./api/v1/routes/user');
const authSessionMiddl = require('./api/v1/middlewares/authSession');

// בענן MongoDB תהליך התחברות ל
const ConnStr = process.env.MONGO_CONN;  // שליפת מחרוזת התחברות מתוך הגדרות המערכת
mongoose.connect(ConnStr).then((status)=>{ // זה פרמטר שנתנו status
    if (status)  // true
        console.log('Connected to MongoDB');
    else
        console.log('Not connected');
});



var connection = mysql.createConnection({
    host: 'localhost', // שם השרת 
    user: 'root', // שם המשתמש
    password: 'orel123', // סיסמה
    database: 'ecom' // שם בסיסי נתונים
  });
  connection.connect(()=>{
    console.log('connected to MySql');
  });
global.db = connection; // שמחזיק את החיבור db יצירת משתנה גלובלי בשם 






// use
const twentyMin = 1000 * 60 * 20; //דקות
app.use(session({secret: 'orereoql',
resave:false,
saveUninitialized:true,
cookie:{maxAge:twentyMin},
store:MongoStore.create({mongoUrl:process.env.MONGO_CONN + 'SessionDb'}) //Databace אפשר לתת שם ל  collectionName:"aaas"
}));

app.use(morgan('dev'));
app.use(express.json()); // json בקידוד body הוספת שכבה שמטפלת בבקשות שכוללות
app.use(express.urlencoded({ extended: true }));   // urlencoded הוספת שכבה שמטפלות בבקשות שנשלחו בפורמט 
app.use('/product', productRouter);  // product מבצע בדיקת התחברות רק על הקובץ  
app.use('/category', categoryRouter);
app.use('/user', userRouter);

// הודעת שגיאה במידה ולא נמצאה הכתובת
app.all("*", (req,res)=>{
    return res.status(404).json({msg:"Not found"});
});
module.exports = app;