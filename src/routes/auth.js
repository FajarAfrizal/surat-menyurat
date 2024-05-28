const express = require('express');
const Route = express.Router();
const auth = require('../controllers/user');

Route.post('/login', auth.Login);

Route.post('/register', auth.Register);

const routeProps = {
    Route,
    auth: false
}

module.exports = routeProps;