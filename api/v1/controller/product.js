const mysql = require('mysql');

module.exports = {

    getAllProducts:(req, res) =>{
        const conn = global.db; // שמירת התחברות 
        // error מכיל שגיאה // results מכיל את התוצאה שמצאה // fields מיכל מידע על שדות
        conn.query('SELECT * from t_products', function (error, results, fields) {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    },

    getProductById:(req, res) =>{
        let pid = req.params.id;
        const conn = global.db; // שמירת התחברות 
        conn.query('SELECT * FROM t_products WHERE pid = ?', pid,(error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    },

      


    addProduct:(req, res) =>{
        let {pname, price, picname, pdescription} = req.body;
        const conn = global.db; // שמירת התחברות 
        conn.query(`INSERT INTO t_products ( pname, price, picname, pdescription) VALUES (?, ?, ?, ?)`, [pname, price, picname, pdescription],(error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    },



    updateProductById:(req, res) =>{
        let pid = req.params.id;
        let {pname, price, picname, pdescription} = req.body;
        const conn = global.db; // שמירת התחברות 
        conn.query(`UPDATE t_products SET pname = ?, price = ?, picname = ?, pdescription = ? WHERE pid = ?`, [pname, price, picname, pdescription, pid], (error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
        
    },






    deleteProductById:(req, res) =>{
        let pid = req.params.id;
        const conn = global.db; // שמירת התחברות 
        conn.query('DELETE FROM t_products WHERE pid = ?', pid,(error, results) => {
            if (error)
            return res.status(500).json(error);
            else
            return res.status(200).json(results);
        });
    },



}
