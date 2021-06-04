const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// function getContactById(contactId) {
//   // ...твой код
// }

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }
module.exports = {
  listContacts,
  // getContactById,
  // removeContact,
  // addContact,
};
