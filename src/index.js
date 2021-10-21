const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

//Rutas
app.get('/', function(req, res) {
    res.sendFile( __dirname + '/public/Emitir.html');
  });

app.get('/ver', function(req, res) {
    res.sendFile( __dirname + '/public/Ver.html');
});

//Socket io para escuchar conexiones
io.on('connection', (socket)=>{

    console.log("Nueva conexion");
    
    //Aqui definimos que debe de hacer la nueva conexion detectada.

    //si recibimos un evento "nuevo mensaje"
    socket.on("nuevo mensaje", (msj)=>{
        io.emit('nuevo mensaje', msj);
    });

    //si recibimos un evento "streaming"
    socket.on("streaming",(image)=>{
        socket.broadcast.emit('stream', image);
    });

    socket.on("audio", (audio)=>{
        socket.broadcast.emit('listen', audio);
    });

    io.on('disconnect', ()=>{
        console.log("Usuario desconectado");
    });
});
io.on('connect', ()=>{
    console.log("Usuario conectado.")
});

http.listen(port, () => {
    console.log("Servidor en puerto 3000."); 
});