const user = require('../models/user');  // פעולת השמה של קוד הסכמה לתוך המשתנה
const bcrypt = require('bcrypt'); // קישור לספריית הצפנה
const jwt = require('jsonwebtoken'); // חיבור לספרייה

module.exports = {

    getAllUsers:(req, res) =>{
        user.find().then((data) =>{
            return res.status(200).json(data);
        });
    },
    getUserById:(req, res) =>{
        let userid = req.params.id;
        user.findOne({userid}).then((data) =>{
            return res.status(200).json(data);
        });
    },

    addUser:(req, res) =>{
        let body = req.body;
        user.insertMany(body).then((data) =>{
            return res.status(200).json(data);
        });
    },

    updataUserById:(req, res) =>{
        let userid = req.params.id;
        let body = req.body;
        user.updateMany({userid}, body).then((data) =>{
            return res.status(200).json(data);
        });
    },

    deleteUserById:(req, res) =>{
        let userid = req.params.id;
        user.deleteOne({userid}).then((data) =>{
            return res.status(200).json(data);
        });
    },


    Register:(req,res)=>{
        const {
            userid,
            email,
            pass,
            fullname,
            phone
        } = req.body; // שליפת השדות שנשלחו בבקשה

        user.find({email}).then((results)=>{  // עכשיו הוא כמות המיילים שיש לנו זאת אומרת האורך כמו של מערך result ה  , user נבדוק אם המשתמש כבר קיים לפי המייל , שהוא תעודת המזהה של ה
            if (results.length > 0) // גדול מאפס אז זה אומר שהמשתמש כבר קיים ולא ניתן לבצע הרשמה result אם האורך של 
                return res.status(200).json({msg:"User alreadt exist"}); // הצגת הודעה

                bcrypt.hash(pass,10).then((hashpass)=>{  // נבצע הצפנה לסיסמה
                    user.insertMany({fullname,email,pass:hashpass,userid,phone}).then((results)=>{   // (שמירת בסיס נתונים של המשתמש) result נכנססים/נשמרים לתוך המשתנה user כל השדות של
                        return res.status(200).json({results});
                    });
                });
        });
    },


    Login:(req,res)=>{
        
        const{email,pass} = req.body;
        user.find({email}).then((results)=>{
            if (results.length == 0) // במידה והמייל לא נמצא במערכת
                return res.status(200).json({msg:"User or pass are wrong"}); //מחזירים הודעה שגיאה
            const hashpass = results[0].pass; //שליפת המחרוזת המוצפנת שנתקבלה מתוך הבסיס הנתונים
            bcrypt.compare(pass,hashpass).then((status)=>{
                if (!status)
                   return res.status(200).json({msg:"User or pass are wrong"}); // מחזירים הודעת שגיאה


                   const myEmail = results[0];
                   const token = jwt.sign({email,pass,fullname:myEmail.fullname},process.env.PRIVATE_KEY,{expiresIn:'1h'});  // יצירת טוקן התקף לשעה 1 ומכיל בתוכו את פרטי המשתמש מוצפנים
                    // בדיקה מול בסיס הנתונים

                req.session.user = token;
                return res.status(200).json({msg:"User Login succsessfully ", token}); // מחזירים הודעת התחברות בהצלחה
            });
        });
    }


};
