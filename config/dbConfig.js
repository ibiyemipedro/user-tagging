const mongoose = require('mongoose');
const config = require('config');

exports.mongoConnection = () => {
  return mongoose.connect(config.get('database.mongo_url'), {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
}

exports.mongoTestConnection = () => {
  return mongoose.connect('mongodb+srv://Codelitt123:Codelitt123@cluster0.yzd0v.mongodb.net/codelitt-test', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
}

exports.mongoTestDisconnect = () => mongoose.disconnect()
