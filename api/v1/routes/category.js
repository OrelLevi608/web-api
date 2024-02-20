const router = require('express').Router();
const authSession = require('../middlewares/authSession');
const {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById } = require('../controller/category');

router.get("/", getAllCategories); // שליפה– GET
router.get("/:id", getCategoryById); // שליפה– GET
router.post("/", authSession, addCategory); // בקשה להוספה - POST
router.patch("/:id", authSession, updateCategoryById); // בקשה לעדכון – PUT , PATCH 
router.delete("/:id", authSession, deleteCategoryById); // בקשה למחיקה  - DELETE

module.exports = router;