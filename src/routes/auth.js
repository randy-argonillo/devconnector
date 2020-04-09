const express = require('express');
const joi = require('joi');

const controller = require('../controllers/auth');

const validation = require('../middlewares/validation');

const router = express.Router();



router.post('/login', validation.validateBody({
  email: joi.string().email().required(),
  password: joi.string().required()
}), controller.login);


module.exports = router;