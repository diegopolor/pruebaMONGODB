const Schema = require('mongoose').Schema
const model = require('mongoose').model

const producto = new Schema({
    nombre : "String",
    descripcion : "String",
    item :[
        {
            categoria: {
                type : Schema.Types.ObjectId,
                ref: 'categoria'
            },
            cantidad: "Number"
    }
    ],
    imagen : "String",
    precio : "Number",
})

const productoModel = new model("producto", producto)
module.exports = productoModel 