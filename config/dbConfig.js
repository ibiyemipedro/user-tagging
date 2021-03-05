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
