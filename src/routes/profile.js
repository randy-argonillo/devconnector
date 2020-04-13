const express = require('express');
const Joi = require('joi');

const { validateBody, validateParams } = require('../middlewares/validation');
const verifyToken = require('../middlewares/verifyToken');
const controller = require('../controllers/profile');

const router = express.Router();

/*
  @route     GET api/profiles
  @desc      Get all profiles
  @access    public
*/
router.get('/', controller.getAllProfiles);

/*
  @route     GET api/profiles/user/:userId
  @desc      Get user profile
  @access    protected
*/
router.get('/user/:userId', controller.getProfile);

/*
  @route     POST api/profiles
  @desc      Add or update user profile
  @access    protected
*/
router.post('/', verifyToken, controller.addUpdateProfile);

/*
  @route     POST api/profiles/experience
  @desc      Add experience
  @access    protected
*/
router.post(
  '/experience',
  verifyToken,
  validateBody({
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.string().isoDate().required(),
    to: Joi.string().isoDate(),
    current: Joi.boolean(),
    description: Joi.string(),
  }),
  controller.addExperience
);

/*
  @route     DELETE api/profiles/experience/:exp_id
  @desc      Delete experience
  @access    protected
*/
router.delete('/experience/:exp_id', verifyToken, controller.deleteExperience);

/*
  @route     POST api/profiles/education
  @desc      Add education
  @access    protected
*/
router.post(
  '/education',
  verifyToken,
  validateBody({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    from: Joi.string().isoDate().required(),
    to: Joi.string().isoDate(),
    current: Joi.boolean(),
    description: Joi.string(),
  }),
  controller.addEducation
);

/*
  @route     DELETE api/profiles/education/:edu_id
  @desc      Delete education
  @access    protected
*/
router.delete('/education/:edu_id', verifyToken, controller.deleteEducation);

/*
  @route     GET api/profiles/github/:username
  @desc      Get github profile
  @access    public
*/
router.get(
  '/github/:username',
  validateParams({
    username: Joi.string().required(),
  }),
  controller.getGithubProfile
);

module.exports = router;
