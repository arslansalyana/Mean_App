const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB')
  .then(() => {
    console.log('MongoDB Connection Succeeded');
  })
  .catch((err) => {
    console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
  });

module.exports = mongoose;