const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');


const app = express();

let server = http.createServer(app);



// usa el puerto tal de process env y si no lo econtras usa el puerto3000 es util cuando sbis a servidoree
const port = process.env.PORT || 3000


// le digo q en la carpeta public son estaticos entonvees puede lee r html de la carpeta public
const publicPath = path.resolve(__dirname,'../public')
app.use(express.static(publicPath))



module.exports.io = socketIO(server)
require('./sockets/serverChat')




server.listen(port, (err)=>{
    if(err) throw new Error(err)

    console.log(`Server is Running on PORT:${port}`)
})

