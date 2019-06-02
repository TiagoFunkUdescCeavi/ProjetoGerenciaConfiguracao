const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gerenciaconfig', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose; 