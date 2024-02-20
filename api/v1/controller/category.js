const category = require('../models/category');

module.exports = {
    getAllCategories:(req, res) =>{
        category.find().then((data) => {
            return res.status(200).json(data);
        });
    },
    getCategoryById:(req, res) =>{
        let cid = req.params.id;
        category.findOne({cid}).then((data) =>{
            return res.status(200).json(data);
        });
    },
    addCategory:(req, res) =>{
        let body = req.body;
        category.insertMany(body).then((data) =>{
            return res.status(200).json(data);
        });
    },
    updateCategoryById:(req, res) =>{
        let cid = req.params.id;
        let body = req.body;
        category.updateMany({cid},body).then((data) =>{
            return res.status(200).json(data);
        });
    },
    deleteCategoryById:(req, res) =>{
        let cid = req.params.id;
        category.deleteOne({cid}).then((data) =>{
            return res.status(200).json(data);
        });
    },
};