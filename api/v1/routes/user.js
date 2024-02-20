const router = require('express').Router();


const {
    getAllUsers,
    getUserById,
    addUser,
    updataUserById,
    deleteUserById,
    Register,
    Login
} = require('../controller/user');

router.get("/", getAllUsers); // שליפה– GET
router.get("/:id", getUserById); // שליפה– GET
router.post("/", addUser); // בקשה להוספה - POST
router.patch("/:id",  updataUserById); // בקשה לעדכון – PUT , PATCH 
router.delete("/:id",  deleteUserById); // בקשה למחיקה  - DELETE
router.post("/register", Register);
router.post("/login", Login);

module.exports = router;