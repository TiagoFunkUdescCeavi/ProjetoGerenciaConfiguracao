const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@vensller-lnb4e.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose; 