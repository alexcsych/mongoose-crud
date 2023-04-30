const mongoose = require('mongoose');
const env = process.env.NODE_ENV ?? 'development';
const { host, port, dbName } = require('../config/mongoDBConfigs')[env];

console.log('host :>> ', host);

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`)
  .then(() => console.log('Connection OK'))
  .catch(err => console.log('err :>> ', err));
