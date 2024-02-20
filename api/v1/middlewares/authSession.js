
const jwt = require('jsonwebtoken') // חיבור לספרייה
const session=require('express-session');
module.exports = (req, res, next)=>{
    try
    {
        const twentyMin = 1000 * 60 * 20; //דקות
        app.use(session({secret: 'orerlsldasda',  // מחרוזת להצפנה ולפענוח
        resave:false,  // זה אומר שלא צריך לשמור כל פעם מחדש
        saveUninitialized:true,
        cookie:{maxAge:twentyMin}, // תהיה בתוקף cookie פה זה אומר כמה זמן 
        }))
        next();
    }
    catch(error)
    {
        return res.status(401).json({msg:"You are Not authorized"});  // החזרת תשובה למשתמש שאינו מורשה גישה ךמקום זה 
    }
}

