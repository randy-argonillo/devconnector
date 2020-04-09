const express = require('express');
const Joi = require('joi');

const { validateBody } = require('../middlewares/validation');
const controller = require('../controllers/users');

const router = express.Router();

/*
  @route     POST api/users
  @desc      register user
  @access    public 
*/
router.post(
  '/signup',
  validateBody({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    avatar: Joi.string()
  }),
  controller.signup
);

module.exports = router;
