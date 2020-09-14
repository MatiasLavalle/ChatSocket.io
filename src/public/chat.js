let messageForm = document.querySelector('#messageForm');
let message = document.querySelector('#message');
let chat = document.querySelector('#chatWindow');
let usuario = document.querySelector('#userName');
let usuarios = document.querySelector('#users');
let formularioUsuario = document.querySelector('#userForm');
let desconectar = document.querySelector('#desconectar')

let socket = io();

// aca con el evento del formulario enviamos al servidor con .emit y con el evento Nuevo usuario
// hace un prevent default por q esta el submit y hacer el callback con data
// luego ir al server y recibir de io. crear dentro un cliente y la accion q recibe
// es la de cliente.on 


formularioUsuario.addEventListener('submit', (e)=>{
    e.preventDefault();


    console.log('Usuario Enviado');


    if(usuario.value == '') return


    socket.emit('Nuevo Usuario', usuario.value, (data)=>{
        if(data){
            document.querySelector('#loginWrapper').style.display = 'none';
            document.querySelector('#mainWrapper').style.display = 'block';
        }else{
            document.querySelector('#error').innerHTML = "<p>ER_ROR !!</p>"
        }
    })


    socket.on('usuarios',(data)=>{

        console.log(data)
        let html='';
        // for(let i=0;i<data.length;i++){
        //     html += data[i] + '<br>'
        // }
        for(let usuario of data){
            html += usuario + '<br>'
        }

        usuarios.innerHTML = html
    })


})


// --------------------------------------------------------------------------------

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();


    socket.emit('enviar_mensaje', {msj: message.value, usuario:usuario.value});
    message.value = '';

})

socket.on('nuevo_mensaje', (data)=>{
    console.log(data);
    chat.innerHTML += `<strong>${data.usuario}: </strong> ${data.msj} <br>`;
})


desconectar.addEventListener('click', ()=>{
    socket.emit('desconectar_usuario', { usuario:data.usuario })
    console.log('desconecto un usuario')
})
// socket.on('disconnect', (data)=>{
//     socket.emit('desconectar_usuario', { usuario:data.usuario })
// })