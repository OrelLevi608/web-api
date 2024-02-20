const product = require('../models/product');  // חיבור למודל של המוצרים

module.exports = {

    getAllProducts:(req, res) =>{
        product.find().then((data) =>{
            return res.status(200).json(data);
        });
    },
    getProductById:(req, res) =>{
        let pid = req.params.id;
        product.findOne({pid}).then((data) =>{
            return res.status(200).json(data);
        });
    },
    addProduct:(req, res) =>{
        let body = req.body;
        if (req.session.user == undefined)
        {
            return res.status(401).json({mes:"You not autorized"});
        }
        product.insertMany(body).then((data) =>{
            return res.status(200).json(data);
        });
    },
    updateProductById:(req, res) =>{
        let pid = req.params.id;
        let body = req.body;
        product.updateMany({pid}, body).then((data) =>{
            return res.status(200).json(data);
        });
    },
    deleteProductById:(req, res) =>{
        let pid = req.params.id;
        product.deleteOne({pid}).then((data) =>{
            return res.status(200).json(data);
        });
    }
};