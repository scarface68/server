const mongoose = require("mongoose");
const data = require("./sample_data").data;

const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  income: String,
  city: String,
  car: String,
  quote: String,
  phone_price: String,
});

const User = mongoose.model("User", userSchema);

// data inserted using this
// User.insertMany(data)
//   .then(() => console.log("Sample data inserted"))
//   .catch((err) => console.error("Error inserting sample data", err));

module.exports = User;
