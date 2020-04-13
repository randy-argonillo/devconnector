const fp = require('lodash/fp');
const Joi = require('joi');
const mongoose = require('mongoose');

const validateBody = joiSchema => (req, res, next) => {
  const { body } = req;
  _validate(body, joiSchema, res, next);
};

const validateParams = joiSchema => (req, res, next) => {
  const { params } = req;
  _validate(params, joiSchema, res, next);
};

const _validate = (source, schema, res, next) => {
  const { error } = Joi.validate(source, schema);

  if (error) {
    console.log(error);
    return res.status(422).json(_errorResponse(error));
  }

  next();
}

const validateObjectId = propName => (req, res, next) => {
  const objId = fp.get(`params.${propName}`)(req);
  const isValid = mongoose.isValidObjectId(objId)

  if (!isValid) {
    return res.status(400).json({ error: 'You pass an invalid id' });
  }

  next();
};

const _errorResponse = error => ({
  errors: _formatError(error)
})

const _formatError = fp.pipe(
  fp.getOr([], 'details'),
  fp.map(detail => {
    const key = fp.get('context.key')(detail);
    const { message } = detail;

    return { [key]: message };
  })
);

module.exports = {
  validateBody,
  validateParams,
  Joi,
  validateObjectId
};
