var express = require('express')
const app = express()
const {getUsersleaveDetails,addNewLeave}  = require("../controllers/empController");
const { verifyUserData } = require('../middlewares/authMiddleware');

app.get('/get-user-leave',verifyUserData, getUsersleaveDetails);
app.patch('/add-new-leave', addNewLeave);

module.exports = app; 
