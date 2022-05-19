const productoModel = require("../../models/productoModel")
const categoriaModel = require("../../models/categoriaModel")

 const saveProducto = async()=>{
    const categoria1 = new categoriaModel({
        nombre: "Bike"
    })
    const saveCategoria1 = await categoria1.save()

    const categoria2 = new categoriaModel({
        nombre: "Car"
    })
    const saveCategoria2 = await categoria2.save()

    const producto = new productoModel({
        nombre : "PerroMotociclon",
        descripcion : "eh pará emoción",
        item :  [
            {categoria: saveCategoria1._id, cantidad: 23 },
            {categoria: saveCategoria2._id, cantidad: 42 }
        ],
        imagen : "imagen",
        precio : "23",    
    })
    const saveProduct = await producto.save()
    console.log(saveProduct);
}

const listProductos =async()=>{
    //filtrar datos de llaves foraneas en array
    const list = await productoModel.find().
                populate({path: "item.categoria"})
    return list
}

const updateProductos = async (descripcion)=>{
    const update = await productoModel.updateOne(
        {_id :"628286879053bbf8f53a6ace"},
        {
            "descripcion" : descripcion
        }  
    )
   return update
}

const Delete = async(name) =>(
    //elimina los datos de la array
    await productoModel.updateOne(
        {
            _id :"628286839053bbf8f53a6ac6", 
            "item.categoria":"628286839053bbf8f53a6ac2"                                                                                  
        }, 
        {
            $unset : 
                { 
                    "item.$": "*"                                                                
                }                                                                                                                                                                                     
        }
    )
)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
module.exports = { 
    saveProducto, 
    listProductos, 
    Delete, 
    updateProductos 
}