const { Router } = require('express')
const mensajes = require('./mensajes.js')
const router = Router()

router.post('/',(req,res)=>{
    const email = req.body.email; const time = 'time'; const mensaje = req.body.mensaje
    mensajes.save({ email: email, time: time, mensaje: mensaje })
    res.status(201).redirect('./')
})