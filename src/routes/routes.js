const { Router } = require('express');
const router = Router();
const multer = require('multer');
var path = require('path');
const fs = require('fs');
const Datos = require('../models/test');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

let storage = multer.diskStorage({destination:(req, file, callback)=> {
    callback(null, path.join(__dirname, '../public/uploads'))
},
    filename:(req, file, callback) =>{
        callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

const subida = multer({storage});

router.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

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
   
});

module.exports = router;   