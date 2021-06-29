const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/contact');

const listContactsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await listContacts(userId, req.query);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        ...result,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getContactByIdController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getContactById(userId, req.params.contactId);
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
};

const addContactController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await addContact(userId, req.body);
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
};

const removeContactController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await removeContact(userId, req.params.contactId);
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
};

const updateContactController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await updateContact(userId, req.params.contactId, req.body);
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
};

const updateContactFavorController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await updateContact(userId, req.params.contactId, req.body);
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
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactFavorController,
};
