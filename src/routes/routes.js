const { Router } = require('express');
const router = Router();
const multer = require('multer');
var path = require('path');
const fs = require('fs');

router.get('/', (req, res) => { 
    res.render('viewSubir');
});

router.post('/subirArchivo', multer({
    dest: path.join(__dirname, '../public/uploads'),
}).single('subida'), (req, res, next) => {
    fs.rename(req.file.path, `./src/public/uploads/${req.file.originalname}`, () => {
        res.send('Archivo cargado correctamente!');
    });
});

module.exports = router;   