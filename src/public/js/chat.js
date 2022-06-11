var socket = io(); // Inicializamos socketIO en el cliente

/*
* Evento listener para el 'nuevo mensaje'
*   Se puede ver que es el mismo evento que se envia 
*   desde el servidor.
* Agregamos el mensaje ingresado por el usuario a la lista.
*/
socket.on('nuevo mensaje', function (msj) {
    $('#listado-msjs').append($('<li>').text(msj));
});

/*
* Emitimos un evento de tipo 'nuevo mensaje' cada vez
* que se presiona el botón enviar y enviamos
* su contenido como mensaje.
*/
function enviarMensaje() {
    socket.emit('nuevo mensaje', $('#nuevo-msj').val());
    $('#nuevo-msj').val('');
};