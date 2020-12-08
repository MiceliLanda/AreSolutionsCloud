const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport')

//configuraciones
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public/Style')));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(express.json());

app.use(require('./routes/routes'));

app.listen(app.get('port'), ()=> {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
})




