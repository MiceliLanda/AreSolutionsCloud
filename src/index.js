const express = require('express');
const app = express();
const path = require('path');

//configuraciones
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.json());

app.use(require('./routes/routes'));

app.listen(app.get('port'), ()=> {
    console.log('Server on port',app.get('port'));
});

