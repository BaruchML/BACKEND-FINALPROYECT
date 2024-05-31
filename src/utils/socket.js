export const initSocket = (io) => {
    let mensajes = []
    io.on('connection', socket => {
        console.log('Nuevo cliente conectado');
        socket.on('messages', data => {
            console.log(data)
            mensajes.push(data)


            io.emit('messageLogs', mensajes)
        })
        socket.emit('bienvenida', 'Hola desde server')
    })
}