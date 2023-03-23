
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

//  app.get('/products/:pid', async (req,res)=>{
//     const producto = manager.getProducts()
//     console.log(producto);
//    await  producto.then((data) =>{
//     const {pid} = req.params.id
//     let filtrado = data.find((user)=> user.id === pid)
//     if (!req.params.id) {
//         return res.status(404).send({message:"No"})
//     } else {
//         res.send(
//             {
//                 stauts:"success",
//                 payload:filtrado
//             }
//         )
//     }
//    }).catch((err)=>{
//     console.log(err);
//    })

//  } )
 app.get('/products/:pid', (req,res)=>{
     manager.getProducts()
     .then((data) =>{
        
        const {pid} = req.params
      console.log(pid);
        if (req.params.pid) {
            console.log(req.params.pid);
            let filtrado = data.filter((user)=> user.pid === pid)
            console.log(filtrado[2]);
           return res.send({
                status : "success",
                payload : filtrado
            })
        }else{
            console.log("No se definio");
        }
       })
    .catch((err)=>{
        console.log(err);
       })
    })
  


 app.listen(PORT,()=>{
   console.log('el server esta escuchando');
})