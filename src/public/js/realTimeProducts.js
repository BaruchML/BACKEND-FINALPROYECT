const socket = io()
let user
Swal.fire({
    title:'Identificate',
    input: 'text',
    text:'Ingresa el usuario para identificarte en el chat',
    inputValidator: value => {
        return !value && 'Necesitas ingresar el nombre de usuario para continuar'
    },
    allowOutsideClick:false
}).then( result => {
    user=result.value
 console.log(user);
})

const chatbox= document.querySelector('#chatbox')
chatbox.addEventListener('keyup', (evt) => {
if(evt.key === 'Enter'){
                //trim quita espacios al inicio y al final
    if(chatbox.value.trim().length > 0){
        socket.emit('messages',{user, message: chatbox.value})
        chatbox.value = ''
    }
}
})
socket.on('messageLogs', data => {
    // console.log(data);
    let messageLogs = document.querySelector('#messageLogs')
    let mensajes = ''
    data.forEach(mensaje => {
        mensajes += `<li>${mensaje.user} dice: ${mensaje.message}</li>`
    })

    messageLogs.innerHTML = mensajes
})
socket.emit('message','Hola desde socket emit')
socket.on('bienvenida',data=>{
    console.log(data);
})
// console.log("Hola desde .js real time")  let user
