const mysql = require('mysql');  //ייבוא ספריה
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'orel123',
  database: 'ecom'
});

connection.connect();

function getAllProducts() {
    // error מכיל שגיאה // results מכיל את התוצאה שמצאה // fields מיכל מידע על שדות
  connection.query('SELECT * from t_products', function (error, results, fields) {
    if (error) throw error; // משמשת לזיהוי שגיאות שהתרחשו במהלך הפעולה
    console.log('The solution is: ', results);
  });
}

function getProductById(productId) {
    connection.query('SELECT * FROM t_products WHERE pid = ?', [productId], (error, results) => {
      if (error) throw error;
      console.log(results);
      if (results.length === 0) { // זה ירשום את התוצאות, שיכולות להיות מערך ריק אם אף מוצר לא תואם את המזהה הנתון.
        console.log(`No product found with pid: ${productId}`);
      }
    });
  }
  

function addProduct(pid, pname, price, picname, pdescription) {
    // בקוד, מאפשר לכתוב שאילתות בצורה נקייה וקריאה יותר SQL השימוש ב ? משמש כחלק ממנגנון ההכנה של שאילתות להגנה וניהול יעיל של העברת נתונים לשאילתות  
  const sql = `INSERT INTO t_products (pid, pname, price, picname, pdescription) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [pid, pname, price, picname, pdescription], (err, result) => {
    if (err) throw err;
    console.log(`Product added with ID: ${result.insertId}`);
  });
}

function updateProduct(pid, pname, price, picname, pdescription) {
    //לערכים שיש להזין בזמן ביצוע השאילתה.  placeholder  הסימנים `?` משמשים  כ
  const sql = `UPDATE t_products SET pname = ?, price = ?, picname = ?, pdescription = ? WHERE pid = ?`;
  connection.query(sql, [pname, price, picname, pdescription, pid], (err, result) => {
    if (err) throw err;
    console.log(`Product updated: ${result.changedRows} row(s)`);
  });
}

function deleteProductById(productId) {
  connection.query('DELETE FROM t_products WHERE pid = ?', [productId], (error, results) => {
    if (error) throw error;
    console.log(`Deleted ${results.affectedRows} row(s)`);
  });
}

// דוגמאות לשימוש בפונקציות \\

//getAllProducts() // הצגת כל המוצרים

// getProductById(2); // הצגת מוצר לפי id

// addProduct(9, 'tomato', 100, 'oasdas.jgb', 'good tomato213123123'); // הוספת מוצר

// updateProduct(9, 'tomato', 500, 'oasdas.jgb', 'good tomato213123123'); // id עדכון מוצר לפי 

// deleteProductById(9); // id מחיקת מוצר לפי 

connection.end(err => {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
