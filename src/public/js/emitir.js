var btn = document.getElementById("btn");
var btnpre = document.getElementById("pre");
var canvas = document.getElementById("preview");
var context = canvas.getContext('2d');
var video = document.getElementById('video')
var socket = io();

canvas.width = 512;
canvas.height = 384;

context.width = canvas.width;
context.height = canvas.height;

function publicarMensaje(msg) {
    document.getElementsByClassName("status").innerText = msg;
}

function verVideo(video, context) {
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('streaming', canvas.toDataURL('image/webp'));

    var splash = {
        prefix: "data:audio/wav;base64,",
        sound: [video.base64data]
    };

    let blob = new Blob(this.video.base64data, { type: 'audio/mp3' });
    socket.emit('audio', blob);
}


btn.addEventListener('click', () => {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true, audio: true },
            stream => {
                video.srcObject = stream;
                publicarMensaje('Camara funcionando');

            }, error => {
                publicarMensaje('Camara ha fallado');
            });
    }
    var intervalo = setInterval(() => {
        verVideo(video, context);
        //console.log("emitiendo");
    }, 40);
});