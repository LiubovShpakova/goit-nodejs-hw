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
const guard = require('../../helpers/guard');
// router.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

router.get('/', guard, listContactsController);

router.get('/:contactId', guard, validatContactId, getContactByIdController);

router.post('/', guard, validatAddContact, addContactController);

router.delete('/:contactId', guard, removeContactController);

router.patch(
    '/:contactId',
    guard,
    validatContactId,
    validatUpdateContact,
    updateContactController
);

router.patch(
    '/:contactId/favorite',
    guard,
    validatContactId,
    validatUpdateFavorStatusContact,
    updateContactFavorController
);

module.exports = router;
