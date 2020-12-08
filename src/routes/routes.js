const { Router } = require('express');
const router = Router();
const multer = require('multer');
var path = require('path');
const Datos = require('../models/test')

let storage = multer.diskStorage({destination:(req, file, callback)=> {
    callback(null, path.join(__dirname, '../public/uploads'))
},
    filename:(req, file, callback) =>{
        callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

const subida = multer({storage});

router.get('/', (req, res) => { 
    res.render('viewSubir');
});

router.post('/subirArchivo',subida.single('subida'),(req , res) => {
        let datos = new Datos()
        datos.nombre = req.file.originalname;
        datos.save((err, subirarchivo) => {
            if(err) {
                res.status(500).send(`Error al guardar los datos: ${err}`)
            }
            res.status(200).send({datos: subirarchivo})
        });
});

router.get('/login', (req, res ) => {
    res.send('HOla login')
});

module.exports = router;   