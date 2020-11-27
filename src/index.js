const express = require('express');
const app = express();

//configuraciones
app.set('port',3000);

//middleware
app.use(express.json());

app.use(require('./routes/routes'));

app.listen(app.get('port'), ()=> {
    console.log('Server on port',app.get('port'));
});

