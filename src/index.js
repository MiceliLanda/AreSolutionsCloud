const express = require('express');
const app = express();

//configuraciones
app.set('port',3000);
//app.set('views',path.join(__dirname,'views'));

//middleware
app.use(express.json());

//rutas
app.use(require('./routes/routes'));

app.listen(app.get('port'), ()=> {
    console.log('Server on port',app.get('port'));
});

