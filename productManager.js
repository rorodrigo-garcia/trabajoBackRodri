import fs from 'fs'
import  express  from 'express';


 export default class ProductManager{
    
    constructor (filename){
       
        this.products= []
         this.path = filename;
        if (fs.existsSync(filename)) {
            this.productos = JSON.parse(fs.readFileSync(filename));
           
         } else {
            fs.writeFileSync(filename, JSON.stringify([]))
         }
        

    }   
    

    static id = 0
        
    addProducts =async ({title,description,price,thumbnails,code,stock} ) => {
           try {
            if(!title || !description || !thumbnails || !price || !code || !stock){
                return console.log("Rellenar campos requeridos");
            }

           let productExist = this.products.filter((product) => product.code === code)
           if (productExist.length > 0){
                 return console.log("Producto con codigo ya existente");
            }

            ProductManager.id++
            let product = {
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
                id : ProductManager.id
            }
            this.products.push(product)
           console.log(this.products);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products) , 'utf-8')
                     
            
           
           } catch (error) {
            console.log(error);
           }
        
        }
        
        getProducts = ()=> console.log(this.products);
        getProductById = async (id) =>{
           try {
         let lectura= await fs.promises.readFile(this.path, 'utf-8')
         let lecturaParse = JSON.parse(lectura)
      
        let productoFiltrado=lecturaParse.filter(product => product.id === id)
        console.log(productoFiltrado[0]);
           } catch (error) {
                console.log(error);
           }
         
         }

         deleteProduct = async(id)=>{
        try {
            let lectura= await fs.promises.readFile(this.path, 'utf-8')
            let lecturaParse = JSON.parse(lectura)
         
             let productoFiltrado=lecturaParse.filter(product => product.id === id)
             if (productoFiltrado.length === 0) {
               return console.log("No existe ningun producto con este ID");
             }
             let productoIndice =lecturaParse.findIndex(e => e.id === id)
             lecturaParse.splice(productoIndice , 1)
             console.log(lecturaParse);
             await fs.promises.writeFile(this.path ,JSON.stringify(lecturaParse) ,'utf-8' )
             console.log("Se elimino correctamente");
            
        } catch (error) {
                console.log(error);
        } 
        
        }

         updateProduct =async ({id , title ,description,price,thumbnails,code,stock})=>{
            
            try {
                let lectura= await fs.promises.readFile(this.path, 'utf-8')
                let lecturaParse = JSON.parse(lectura)
             
                 let productoFiltrado=lecturaParse.filter(product => product.id === id)
                 if (productoFiltrado.length === 0) {
                    return console.log("No existe ningun producto con este ID");
                  }
                let productoModificado = {
                    title: title || productoFiltrado [ 0 ].title,
                    description: description || productoFiltrado [0].description,
                    price: price || productoFiltrado[0].price,
                    thumbnails: thumbnails|| productoFiltrado[0].thumbnails,
                    code : code || productoFiltrado[0].code,
                    stock : stock || productoFiltrado [0].stock
                }
                lecturaParse.splice(productoFiltrado , 1 , productoModificado)
                await fs.promises.writeFile(this.path ,JSON.stringify(lecturaParse) ,'utf-8' )
                console.log("Se modifico correctamente");
            } catch (error) {
                console.log(error);
            }


         }

        
}


//  const newProduct = new ProductManager ("productos.json")
// newProduct.addProducts ({title:"tomate" , description :"Fruta versatil" , price : "300 el kilo" , thumbnails:"Sin imagen" , code:"t1" , stock:3 })
// newProduct.addProducts ({title:"cebolla" , description :"Verdura verde y versatil" , price : "250 el kilo" , thumbnails:"Sin imagen" , code:"C1" , stock:7 })

// newProduct.getProductById(1)
// newProduct.deleteProduct(1)
// newProduct.updateProduct({id:3, description:"Verdura."})
// newProduct.getProducts()






