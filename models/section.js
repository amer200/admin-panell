const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
  title: String,
  txt: String,
  img: String,
});
module.exports = mongoose.model("Section", sectionSchema);
