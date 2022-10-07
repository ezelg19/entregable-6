class Producto {
    constructor() {
        this.productos = []
    }

    save(obj) {
        const contenidoArchivo = this.getAll()
        if (contenidoArchivo.length !== 0) {

            contenidoArchivo.push({ ...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1 })
            console.log('Objeto guardado en la Base de Datos!')
        } else {
            contenidoArchivo.push({ ...obj, id: 1 })
            console.log('Objeto guardado en la Base de Datos!')
        }
    }
    actualizar(obj){
        const contenidoArchivo = this.getAll()
        const a = contenidoArchivo.filter(item => item.id === obj.id)
        contenidoArchivo[contenidoArchivo.indexOf(a[0])] = obj
    }
    getById(id) {
        const contenidoArchivo = this.getAll()
        const producto = contenidoArchivo.filter(item => item.id === id)
        return producto
    }

    getAll() {
        try {
            return this.productos
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    deleteById(id) {
        let contenidoArchivo = this.getAll()
        const a = contenidoArchivo.filter(item => item.id !== id)
        this.productos = a
    }

    deleteAll() {
        this.productos = []
    }
}
const productos = new Producto()

module.exports = productos