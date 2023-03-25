
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
                
            }else{
                let result = data.slice(0 , req.query.limit) //profe,esto lo modifique porque devolvia un error 
                res.send({
                    status:"sucess",
                    payload: result
                })

            }

           
            
        } )        
        .catch((err ) =>console.log(err))

})

 app.get('/products/:pid', (req,res)=>{
     manager.getProducts()
     .then((data) =>{
        console.log(data);
        const {pid} = req.params  
        data.filter(product => console.log(typeof product.id))
        console.log(typeof pid);
        const filtrado = data.filter((product)=> product.id === +pid)
       
        
       res.send(filtrado)
       })
    .catch((err)=>{
        console.log(err);
       })})

 app.listen(PORT,()=>{
   console.log('el server esta escuchando');
})