const moongose = require('mongoose')

const url = 'mongodb://localhost/test';

moongose.connect(url, {useNewUrlParser : true, useUnifiedTopology: true})
.then(db => console.log('Connected db'))
.catch(err => console.log(err))

module.exports = moongose;