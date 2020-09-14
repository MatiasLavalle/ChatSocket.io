const { io } = require('../index');
const usuarios = []

io.on('connection',(cliente)=>{

    console.log('usuario connectado')

    cliente.on('Nuevo Usuario', (data,callback)=>{
        if(usuarios.indexOf(data) != -1){
            callback(false)
        }else{
            callback(true)
            cliente.usuarios=data
            usuarios.push(cliente.usuarios)
            console.log(data)
            actualizarUsuarios()
        }
    })

    function actualizarUsuarios(){
        io.emit('usuarios', usuarios)
    }

  // ------------------------------------------------------------------------


    cliente.on('enviar_mensaje', (data)=>{
        io.emit('nuevo_mensaje', {msj:data.msj, usuario:data.usuario})
        console.log(data)
    })


    cliente.on('disconnect', (data)=>{
        console.log('DESCONECTADO')
        if(!data.usuario) return
        usuarios.splice(usuarios.indexOf(data.usuario),1)
        actualizarUsuarios();
        io.emit('usuarios', usuarios)
    })

    cliente.on('desconectar_usuario', (data)=>{
        // io.emit('desconexion_cliente', {usuario: data});
        console.log(data)
    })
})

