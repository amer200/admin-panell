const Section = require("../models/section");
const users = require("../models/users");
exports.getMain = (req, res, next) => {
  Section.find()
    .then((data) => {
      const sections = data;
      res.send(sections);
    })
    .catch((err) => {
      res.send(err.message);
    });
};
exports.PostSection = (req, res, next) => {
  const title = req.body.title;
  const txt = req.body.txt;
  const img = req.body.img;
  const section = new Section({
    title: title,
    txt: txt,
    img: img,
  });
  section
    .save()
    .then((section) => {
      res.send(section);
    })
    .catch((err) => {
      res.send(err.message);
    });
};
exports.EditSection = (req, res, next) => {
  const title = req.body.title;
  const txt = req.body.txt;
  const img = req.body.img;
  const id = req.params.id;
  Section.findById(id)
    .then((sec) => {
      sec.title = title;
      sec.txt = txt;
      sec.img = img;
      sec.save().then((sec) => {
        res.send(sec);
      });
    })
    .catch((err) => {
      res.send(err.message);
    });
};
exports.DeleteSection = (req, res, next) => {
  const id = req.params.id;
  Section.findByIdAndDelete(id)
    .then((sec) => {
      res.send(sec._id);
    })
    .catch((err) => {
      res.send(err.message);
    });
};
exports.AddEditor = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const editor = new users({
    name: name,
    password: password,
    rolle: 'editor'
  })
  editor.save()
    .then(u => {
      res.send(u)
    })
    .catch(err => {
      res.send(err.message)
    })
}
exports.updateEditor = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const id = req.params.id;
  users.findById(id)
    .then(u => {
      u.name = name;
      u.password = password;
    })
    .catch(err => {
      res.send(err.message)
    })
}
exports.deleteEditor = (req, res, next) => {
  const id = req.params.id;
  users.findByIdAndDelete(id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}
exports.getEdotrs = (req, res, next) => {
  users.find({
      rolle: 'editor'
    })
    .then(u => {
      res.send(u)
    })
    .catch(err => {
      res.send(err.message)
    })
}