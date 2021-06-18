const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .required(),
  phone: Joi.number().min(5).required(),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .optional(),
  phone: Joi.number().min(5).optional(),
}).or('name', 'email', 'phone');

const validate = async (schema, obj, next) => {
  console.log('Hi valid');
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ''),
    });
  }
};
module.exports = {
  validatAddContact: (req, res, next) => {
    return validate(schemaAddContact, req.body, next);
  },
  validatUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
};
