import  express  from 'express';
import ProductManager from './productManager.js'
import fs from 'fs'


const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const manager = () => new ProductManager('/productos.json')

app.get('/products',async (req, res) => {
    let lectura= await fs.promises.readFile('./productos.json', 'utf-8')
   res.send(lectura)
   console.log("no anda");
})




app.listen(PORT,()=>{
    console.log('el server esta escuchando');
})