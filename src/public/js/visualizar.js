var btn = document.getElementById("btn");
var socket = io("ws://localhost:3000");
var audio = document.getElementById("audio");
//var vi = document.getElementById("video");

btn.addEventListener('click', () => {
    console.log("Hola");
    socket.on('stream', (image) => {
        let img = document.getElementById("play");
        img.src = image;
        //vi.src = video;
        //console.log("Recibiendo");
    });

    socket.on('listen', (media) => {
        audio.src = media;
        console.log("Recibiendo audio.");
    })
});