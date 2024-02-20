
const jwt = require('jsonwebtoken') // חיבור לספרייה
module.exports = (req, res, next)=>{
    try
    {
        const authHeader = req.headers.authorization;  // של האבטחה שנקרא אוטוריזיישן Header נשלוף את
        //"bearer token"   - bearer זה אומר סוג הצפנה   //- token  המקום שבו אני צריך להשים את  שקיבלתע ב פוסטמן
        const arr = authHeader.split(' ');  // יצירת מערך מחרוזות מתוך המחרוזת של אוטוריזיישן
        const token = arr[1]; // שמירת הטוקן בתוך המשתנה
        const user = jwt.verify(token,process.env.PRIVATE_KEY);  // ביצענו בדיקה  
        req.user = user;
        next();
    }
    catch(error)
    {
        return res.status(401).json({msg:"You are Not authorized"});  // החזרת תשובה למשתמש שאינו מורשה גישה ךמקום זה 
    }
}
