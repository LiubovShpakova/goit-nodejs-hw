const Joi = require('joi');
const mongoose = require('mongoose');

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .required(),
  phone: Joi.number().min(5).required(),
  favorite: Joi.boolean().optional(),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .optional(),
  phone: Joi.number().min(5).optional(),
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite');

const schemaUpdateFavorStatusContact = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite',
  }),
});

const validate = async (schema, obj, next) => {
  console.log('Hi valid');
  try {
    await schema.validateAsync(obj);
    return next();
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
  validatUpdateFavorStatusContact: (req, res, next) => {
    return validate(schemaUpdateFavorStatusContact, req.body, next);
  },
  validatContactId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: 'Invalid ContactId',
      });
    }
    next();
  },
};
