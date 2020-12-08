const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash');
const bodyParser = require('body-parser');

//configuraciones
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public/Style')));
app.use(express.static(path.join(__dirname,'public')));

//middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));

require('./passport/auth')
app.use(flash())
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.loginMessage = req.flash('loginMessage');
    app.locals.registerMessage = req.flash('registerMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
  });

app.use(require('./routes/routes'));

app.listen(app.get('port'), ()=> {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
})




