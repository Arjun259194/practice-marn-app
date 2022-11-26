const mongoose = require("mongoose");
require('colors')

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected".green.bold);
  console.log(`> ${conn.connection.host}`.yellow.bold);
};

module.exports = connectDb;
