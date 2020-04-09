const fp = require('lodash/fp');
const Joi = require('joi');

const validateBody = joiSchema => (req, res, next) => {
  const { body } = req;
  const { error } = Joi.validate(body, joiSchema);

  if (error) {
    console.log(error);
    return res.status(422).json(_errorResponse(error));
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
  validateBody
};
