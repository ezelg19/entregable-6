const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const router = require('./modulos/router.js')
const routermsg = require('./modulos/routermsg.js')
const productos = require('./modulos/productos.js')
const mensajes = require('./modulos/mensajes.js')
const hbs = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.engine('hbs',hbs.engine({
    extname:'.hbs',
    partialsDir:__dirname+'/views/partials',
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout:'server.hbs'
}))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('views','./views')
app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.render('main', { root: __dirname })
})

app.use('/productos', router)
let users = 0

const PORT = 4000
httpServer.listen(PORT, () => { console.log(`escuchando ${PORT}`) } )

io.on('connection', (socket)=>{
    users ++
    console.log(`usuario ${socket.id} conectado. N°:${users}`)
    socket.on('respuesta', () => { 
        io.sockets.emit('array', productos.getAll()) 
        io.sockets.emit('mensajes', mensajes.getAll())
    })
    socket.on('newProduct', data => {
        productos.save(data)
        io.sockets.emit('array', productos.getAll()) 
    })
    socket.on('newMensaje', data => {
        console.log('llego mensaje')
        mensajes.save(data)
        io.sockets.emit('mensajes',mensajes.getAll())
    })
    socket.on('disconnect', () => { console.log('user disconnected'), users-- } )
})