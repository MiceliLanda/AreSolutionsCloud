const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//configuraciones
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public/Style')));

app.use(express.json());
app.use(require('./routes/routes'));

mongoose.connect('mongodb://localhost:27017/test',(err , res) => {
    if(err){
         return console.log(`Error al conectarse a la base de datos: ${err}`);
    }
    console.log('Conexion exitosa a la base de datos');

        app.listen(app.get('port'), ()=> {
        console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
    })
})


