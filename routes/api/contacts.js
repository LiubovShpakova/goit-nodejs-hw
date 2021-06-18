const express = require('express');
const router = new express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model');
const {validatAddContact, validatUpdateContact} = require('./validation');
router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId);

    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          result,
        },
      });
    }
    return res.json({status: 'error', code: 404, message: 'Not found'});
  } catch (e) {
    next(e);
  }
});

router.post('/', validatAddContact, async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    });
  } catch (e) {
    next(e);
  }
});

router.patch('/:contactId', validatUpdateContact, async (req, res, next) => {
  console.log('Hi');
  try {
    const result = await updateContact(req.params.contactId, req.body);
    if (result) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          result,
        },
      });
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
