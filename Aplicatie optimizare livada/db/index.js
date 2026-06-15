require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Conectat la MongoDB Atlas (Frankfurt)!");
  })
  .catch(err => {
    console.error("❌ Eroare conexiune:", err.message);
    process.exit(1);
  });

module.exports = mongoose;