const express = require('express');
const router = new express.Router();
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactFavorController,
} = require('../../controllers/contactsController');
const {
  validatAddContact,
  validatUpdateContact,
  validatUpdateFavorStatusContact,
  validatContactId,
} = require('./validation');
router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', listContactsController);

router.get('/:contactId', validatContactId, getContactByIdController);

router.post('/', validatAddContact, addContactController);

router.delete('/:contactId', removeContactController);

router.patch(
    '/:contactId',
    validatContactId,
    validatUpdateContact,
    updateContactController
);

router.patch(
    '/:contactId/favorite',
    validatContactId,
    validatUpdateFavorStatusContact,
    updateContactFavorController
);

module.exports = router;
