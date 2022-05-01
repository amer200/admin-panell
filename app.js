require("dotenv").config();
const express = require("express");
const {
  default: mongoose
} = require("mongoose");
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const multer = require('multer');
const cors = require('cors');
const User = require('./models/users');
app.use(cors())
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({
  storage: storage
})

//routes
const adminRoutes = require("./routes/admin");
const userRoutes = require('./routes/user');
app.use("/admin", adminRoutes);
app.use('/user', userRoutes);
mongoose
  .connect(DB_URL)
  .then((result) => {
    console.log("db done");
  })
  .then((result) => {
    User.findOne({
        name: 'admin'
      })
      .then(u => {
        if (!u) {
          const u = new User({
            name: 'admin',
            password: '123',
            rolle: 'admin'
          })
          u.save()
        }
      })
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });