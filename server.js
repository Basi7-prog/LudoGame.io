const express = require("express");
const path = require("path");
const app = express();
// const tr=require('./trial')
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.json("hello");
});

const server=app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io=require('socket.io')(server)

let socketsConnected=new Set();
io.on('connection',(onConnected))

io.emit('clients-count',socketsConnected.size)
function onConnected(socket){
    console.log(socket.id);
    socketsConnected.add(socket.id);
    io.emit('clients-count',socketsConnected.size)

    socket.on('disconnect',()=>{
        console.log('socket disconnected ',socket.id);
        socketsConnected.delete(socket.id);
        io.emit('clients-count',socketsConnected.size)
    })

    socket.on('randomNo',(data)=>{
        console.log('random no ',data);
        socket.broadcast.emit('randomNo',data);
    })
    socket.on('newMove',(data)=>{
        console.log('newMove ',data);
        socket.broadcast.emit('newMove',data);
    })
    socket.on('fucked',(data)=>{
        socket.broadcast.emit('fucked',data);
    })
}