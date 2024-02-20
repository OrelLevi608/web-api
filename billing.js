const axios = require('axios');
const http = require('http');

 // עובד

let data = {
  userid: 51,
  email: 'orel60817@gmail.com',
  pass: '4935682',
  fullname: 'orelleviorel'
};
http.createServer((req, res) => {  // HTTP יצירת שרת 
  res.writeHead(200, {'Content-Type': 'application/json'});  // מגדיר את כותרת התגובה
  res.write(JSON.stringify(data));  // מבצע המרה של האוביקטים למחרוזת
  res.end();  // סיום תגובה
}).listen(7070, () => console.log('Server running on http://localhost:7070'));


//-------------------------------------------------------------------------------------


// let data = {
//     userid: 51,
//     email: 'orel60817@gmail.com',
//     pass: '4935682',
//     fullname: 'orelleviorel'
//   };
//   http.createServer((req, res) => {  // HTTP יצירת שרת 
//     res.writeHead(200, {'Content-Type': 'application/json'});  // מגדיר את כותרת התגובה
//     res.write(JSON.stringify(data));  // מבצע המרה של האוביקטים למחרוזת
//     res.end();  // סיום תגובה
//   }).listen(7070, () => console.log('Server running on http://localhost:7070'));
























// let data = {
//   userid: 21,
//   email: 'orel60817@gmail.com',
//   pass: '4935682',
//   fullname: 'orelleviorel'
// };



// const sendData =()=>{
//     axios.post('http://reqres.in/api/register',{
//         userid: 21,
//         email: 'orel60817@gmail.com',
//         pass: '4935682',
//         fullname: 'orelleviorel'
//     }).then(res =>{
//         console.log(res);
//     });
// };
  