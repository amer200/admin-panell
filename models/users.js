const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  rolle: String,
});
module.exports = mongoose.model("User", userSchema);