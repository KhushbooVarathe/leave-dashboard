var express = require('express');
const { registerUser, login,refreshToken, logout } = require('../controllers/authController');
const { verifyUserData } = require('../middlewares/authMiddleware');
const app = express()
 app.post('/register',registerUser);
 app.post('/login',login);
app.post('/refresh-token',refreshToken);
app.get('/logout',verifyUserData,logout);

module.exports = app; 
