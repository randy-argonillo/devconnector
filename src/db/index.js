const mongoose = require('mongoose');
const config = require('config');

const dbConnString = config.get('mongoConnString');

async function connect() {
  try {
    await mongoose.connect(dbConnString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Connected to mongodb');
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  connect
};
