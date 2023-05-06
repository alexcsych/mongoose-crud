const mongoose = require('mongoose');
const env = process.env.NODE_ENV ?? 'development';
const { host, port, dbName } = require('../config/mongoDBConfigs')[env];

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`)
  .then(() => console.log('Connection OK'))
  .catch(err => console.log('err :>> ', err));

module.exports.User = require('./user');
module.exports.Post = require('./post');
module.exports.Phone = require('./phone');
