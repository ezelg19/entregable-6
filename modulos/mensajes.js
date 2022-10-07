const fs = require('fs')

class Mensajes{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try{
            const contArchivo =  await this.getAll()
            await fs.promises.writeFile(this.ruta, JSON.stringify([...contArchivo, {...obj}], null, 2) )    
        }
        catch(error){
            console.log(error)
        }
    }    

    async getAll(){
        try{
            let contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)
        }
        catch(error){
            console.log(error)
        }
    }
}

const mensajes = new Mensajes('../tp6/public/mensajes.txt')

module.exports = mensajes