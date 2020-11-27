const { Router } = require('express'), express = require('express'), app = express();
const router = Router();
const multer = require('multer');
var path = require('path');

app.set('view_engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(multer({
    dest: path.join(__dirname,'../public/uploads')
}).single('subida'));


//Tengo error de que no lee los archivos EJS, ya esta configurado el motor de plantillas y ni asi.
router.get('/', (req, res) => {
    res.render('viewSubir');
    //res.send('hola');
});

router.post('/subirArchivo', (req, res) => {
    console.log(req.file);
    res.send('Archive upload succesfully!');
});

module.exports = router, app;