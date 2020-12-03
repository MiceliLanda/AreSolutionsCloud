const { Router } = require('express');
const router = Router();
const multer = require('multer');
var path = require('path');
const fs = require('fs');
const Datos = require('../models/test')

router.get('/', (req, res) => { 
    res.render('viewSubir');
});

router.post('/subirArchivo', multer({ dest: path.join(__dirname, '../public/uploads'), }).single('subida'), (req, res, next) => {
        
        fs.rename(req.file.path, `./src/public/uploads/${req.file.originalname}`, () => {

        let datos = new Datos()
        datos.nombre = req.file.originalname;
        datos.save((err, subirarchivo) => {
            if(err) {
                res.status(500).send(`Error al guardar los datos: ${err}`)
            }
            res.status(200).send({datos: subirarchivo})
        });
    });

});

module.exports = router;   