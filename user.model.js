const mongoose = require("mongoose");
const data = require("./sample_data").data;

// sample data
const sampleData = [
  {
    id: 1,
    first_name: "Inglis",
    last_name: "McMurty",
    email: "imcmurty0@youku.com",
    gender: "Male",
    income: "$1.36",
    city: "Las Flores",
    car: "BMW",
    quote: "optimize web-enabled relationships",
    phone_price: "22236",
  },
  // more objects here...
];

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

if (User.exists({})) {
  User.deleteMany({})
    .then(() => console.log("Cleared Database"))
    .catch((err) => console.log("Failed to delete", err));
}

User.insertMany(data)
  .then(() => console.log("Sample data inserted"))
  .catch((err) => console.error("Error inserting sample data", err));

module.exports = User;
