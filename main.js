import express from 'express';
import ProductManager from './productManager.js'



const app = express()
const PORT = 4000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const manager =  new ProductManager('productos.json')



app.get('/products', (req, res) => {
        manager.getProducts()
        .then((data) => {
            const {limit} = req.query
            if (req.query.limit) {
                let result = data.slice(0 , req.query.limit)
                res.send({
                    status:"success",
                    payload : result
                })
                return
            }
                res.send({
                    status:"sucess",
                    payload: result
                })

            
            
        } )        
        .catch((err ) =>console.log(err))

})

app.get('products/:pid', (req,res)=>{
    const {pid} = parseInt(req.params.id)
    console.log(id);
    const filtrado = manager.find((user)=> user.id === pid)
    console.log(filtrado);
    if (!pid) {
        res.status(400).send("El id no se encuntra")
    }else{
        res.status(200).json(filtrado)

    }
    
})


 app.listen(PORT,()=>{
   console.log('el server esta escuchando');
})