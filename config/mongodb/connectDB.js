require('colors')

const mongoose = require('mongoose')
const URI = 
"mongodb+srv://mongodbUser:IS8omWCTBbSjWBNe@cluster0.hqukg.mongodb.net/Tienda?retryWrites=true&w=majority"


const connectDB = async() =>{
    try{
        await mongoose.connect(URI)
        console.log(
            "Conectado a la base de datos ✔" 
            .yellow
        );
    }catch(err){
        console.log(
            "No se ha podido conectar a la base datos ❌" 
            .red
        );
    }
} 

const closeDB = async()=>{
   try{
        await mongoose.connection.close()
   }catch(err){
        console.log(
            "No se ha podido cerrar la conexión a la base de datos ❌" 
            .red
        );
   }
}

module.exports = { connectDB, closeDB }