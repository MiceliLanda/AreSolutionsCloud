const { Router } = require('express'), express = require('express'), app = express();
const router = Router();
const multer = require('multer');
var path = require('path');

app.set('view_engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './archivos')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

var upload = multer({ dest: storage });


//Tengo error de que no lee los archivos EJS, ya esta configurado el motor de plantillas y ni asi.
router.get('/', (req, res) => {
    res.render('viewSubir');
    //res.send('hola');
});

router.post('/subirArchivo', upload.single, (req, res) => {
    console.log(req.file);
    res.send('Archive upload succesfully!');
});

module.exports = router;