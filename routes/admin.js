const express = require("express");
const routes = express.Router();
const adminControllers = require("../controllers/admin");
const auth = require('../controllers/auth');
routes.get("/", adminControllers.getMain);
routes.post("/add-section", auth.isUser, auth.isEditor, adminControllers.PostSection);
routes.put("/edit-section/:id", auth.isUser, auth.isEditor, adminControllers.EditSection);
routes.delete("/delete-section/:id", auth.isUser, auth.isEditor, adminControllers.DeleteSection);
////////////////////
routes.get('/editors', auth.isUser, auth.isAdmin, adminControllers.getEdotrs)
routes.post('/add-editor', auth.isUser, auth.isAdmin, adminControllers.AddEditor);
routes.put('/update-editor/:id', auth.isUser, auth.isAdmin, adminControllers.updateEditor);
routes.delete('/delete-editor/:id', auth.isUser, auth.isAdmin, adminControllers.deleteEditor)
module.exports = routes;