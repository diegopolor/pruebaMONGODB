require('colors')
const {connectDB} = require('./config/mongodb/connectDB')
const { 
    saveProducto, 
    listProductos, 
    updateProductos, 
    Delete 
} = require('./services/mongodb/productos')

const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()

const PORT = 3000
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoiZXF1aXpkZSIsImlhdCI6MTY1MjgyMjI4OX0.Wvt-QQ5Qz--V1a0Ms17qLdyuHSF6_qISNJIdGlPP2m0"

//database config
connectDB()

app.get("/", (req, res)=>{
    saveProducto()
    res.send("data")
})

app.get("/list", async(req, res)=>{
    const list = await listProductos()
    res.json(list)
})

app.get('/update/:descripcion', async (req, res)=>{
    const { descripcion } = req.params
    const update = updateProductos(descripcion)
    res.status(200).json({update})
})

app.get("/del/:name",async (req, res)=>{                                                                                                                                                                                                
    const { name } = req.params
    console.log(name);
    const response = await Delete(name)
    res.json(response)
})

app.get("/token/", (req, res)=>{
    const token = jwt.sign({a: 'equizde'},'secret-key', { expiresIn: 60 })
    console.log(token);
    res.json({token : token})
})

app.get('/verify/:token', (req, res)=>{
    try {
        const { token } = req.params
        const verify = jwt.verify(token, 'secret-key')
        console.log(verify);
        res.json({data:verify.a, status: "Token validado."})
        res.end()                 
    }
    catch(err){
        const error = err.toString()
        console.log(error);
        if(error.indexOf("invalid signature") !== -1){
            console.log("Clave secreta invalida.");
            res.end()
        }
        else if(error.indexOf("invalid token") !== -1 || error.indexOf("jwt malformed") !== -1 ){
            console.log("Token invalido.");
            res.json({status: "Token no valido."})
            res.end()
        }
        else if(error.indexOf("jwt expired") !== -1){
            console.log("Token expirado.");
            res.json({status: "Token expirado."})
            res.end()
        }
    }  
})

app.listen(PORT, ()=>{
    console.clear()
    console.log(`Server stared in port ${PORT}` .green);
})


