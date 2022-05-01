const mongoose = require('mongoose');
const imgSchema = mongoose.Schema({
    imgUrl: String,
    categ: String
})
module.exports = mongoose.model(Img, "imgSchema");