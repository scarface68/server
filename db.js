const mongoose = require('mongoose');

const URL = "mongodb+srv://sai:123@cluster0.kogfkjt.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
