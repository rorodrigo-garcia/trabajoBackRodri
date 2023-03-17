import {ProductManager} from './productManager.js'
import express from'express'
import fs from 'fs'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const productManager = ProductManager()
const manejoDeArchivos = async (productManager) =>{
    if (fs.existsSync(__filename)) {
        app.get('products' , (req,res)=>{
            res.send("si anduvo")
        })
    }else{
        console.log("El archivo no existe");
    }


}

manejoDeArchivos()

const PORT = 8080
app.listen(PORT,()=>{
    console.log('el server esta escuchando');
})