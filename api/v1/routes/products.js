const router = require('express').Router();

const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById } = require('../controller/product');

router.get("/", getAllProducts);  // שליפה– GET
router.get("/:id", getProductById);  // שליפה– GET
router.post("/", addProduct);  // בקשה להוספה - POST
router.patch("/:id", updateProductById); // בקשה לעדכון – PUT , PATCH 
router.delete("/:id", deleteProductById); // בקשה למחיקה  - DELETE

module.exports = router;