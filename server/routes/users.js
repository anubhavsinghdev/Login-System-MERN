const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const { verifyToken } = require('../middleware/verifyToken');
const { refreshToken } = require('../controllers/refreshToken');

router
    .post('/register', users.register)
    .post('/login', users.login)
    .delete('/logout', users.logout)

router
    .get('/users', verifyToken, users.getUsers)
    .get('/token', refreshToken)
    
module.exports = router;