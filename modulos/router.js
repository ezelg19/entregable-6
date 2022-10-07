const { Router } = require('express')
const productos = require('./productos.js')
const router = Router()

router.get('/', (req, res) => {
    res.render('lista', {
        productsExist: productos.getAll().length,
        products: productos.getAll()
    })
})

router.post("/", (req, res) => {
    try {
        const title = req.body.title; const price = req.body.price; const thumbnail = req.body.thumbnail
        productos.save({ title: title, price: price, thumbnail: thumbnail })
        res.status(201).redirect('./')
    }
    catch (error) { res.status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    res.render('producto', {
        productsExist: productos.getById(parseInt(id)),
        products: productos.getById(parseInt(id))
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params
    const guardado = {title:req.body.title, price:req.body.price, thumbnail:req.body.thumbnail, id:parseInt(id)}
    productos.actualizar(guardado)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    productos.deleteById(parseInt(id))
})

module.exports = router