const socket = io()


const addArray = e=>{
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    socket.emit('newProduct', {title,price,thumbnail})
    return false
}



const addMensaje = e=>{
    fyh= new Date().toLocaleString()
    const email = document.querySelector('#email').value
    const mensaje = document.querySelector('#mensaje').value
    console.log(email, mensaje, fyh)
    socket.emit('newMensaje', {email:email,time:fyh,mensaje:mensaje})
    return false
}


const render = array=>{
    const html = array.map(elem=>{
        return(`<tr>
                    <th scope='row'>${elem.id}</th>
                    <td>${elem.title}</td>
                    <td>$ ${elem.price}</td>
                    <td><img src=${elem.thumbnail} alt="" border=1 height=30 width=30></img></th>
                </tr>`)
        }).join(" ")
    document.querySelector('#array').innerHTML = html
}
const rendermsg = archivo=>{
    const html = archivo.map(elem=>{
        console.log(elem)
        return(`<div>
                    <b style='color:blue'>${elem.email}</b>
                    <a>${elem.time}</a>
                    <a>$ ${elem.mensaje}</a>
                </div>`)
    }).join(" ")
    document.querySelector('#mensajes').innerHTML = html
}


socket.emit('respuesta')
socket.on('array', data=>{
    render(data)
})
socket.on('mensajes', data=>{
    rendermsg(data)
})