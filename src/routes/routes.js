const { Router } = require('express');
const router = Router();
const multer = require('multer');
var path = require('path');
const fs = require('fs');
const Datos = require('../models/test')
const { moongose } = require('../database')
const passport = require('passport');
const { Passport } = require('passport');


let storage = multer.diskStorage({destination:(req, file, callback)=> {
    callback(null, path.join(__dirname, '../public/uploads'))
},
    filename:(req, file, callback) =>{
        callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

const subida = multer({storage});

router.get('/home', async (req, res) => { 
    const datos = await Datos.find()
    //console.log(datos);
    res.render('viewSubir',{ datos});
});

router.post('/subirArchivo',subida.single('subida'),(req , res) => {
        
        let datos = new Datos()
        datos.nombre = req.file.originalname;
        datos.path = '/uploads/'+req.file.filename;
        datos.save((err, subirarchivo) => {
            if(err) {
                res.status(500).send(`Error al guardar los datos: ${err}`)
            }
            res.status(200).redirect('/');
        });

});

router.get('/register',(req ,res)=>{
    res.render('register')
})

router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
  })); 

  router.get('/login',(req ,res)=>{
      res.render('login')
  })

  router.post('/login', passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }));

module.exports = router;   