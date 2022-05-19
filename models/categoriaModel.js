const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const categoria = Schema({
    nombre: "String"
})

const categoriaModel = Model("categoria", categoria)
module.exports = categoriaModel
