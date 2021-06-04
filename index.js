const argv = require('yargs').argv;
// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log('list');
      break;
    case 'get':
      console.log('id', id);
      break;
    case 'add':
      console.log('name email phone', name, email, phone);
      break;
    case 'remove':
      console.log('id', id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);
