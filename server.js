
const http = require('http');
const app = require('./app');
const prot = 7070;
const srv = http .createServer(app);

srv.listen(prot, ()=>{
    console.log("Server is running on prot 7070, you can start.")
})