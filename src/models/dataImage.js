'use strict'
const mongo = require('mongoose')
const schema = mongo.Schema


const datosArchivo = schema({
    nombre : String,
    path : String
})

module.exports = mongo.model('Datos', datosArchivo)