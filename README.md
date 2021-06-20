# GoIT Node.js Course Template Homework

## hw-01-cli-app

Написание CLI(Command line interface) приложения

1. Получаем и выводим весь список контактов в виде таблицы (console.table)
2. Получаем контакт по id
3. Добавялем контакт
4. Удаляем контакт

## hw-02-express

REST API для работы с коллекцией контактов, поддерживает следующие рауты:

1. @ GET /api/contacts
2. @ GET /api/contacts/:contactId
3. @ POST /api/contacts
4. @ DELETE /api/contacts/:contactId
5. @ PATCH /api/contacts/:contactId

Для валидации принимаемых данных использован пакет [joi](https://github.com/sideway/joi)

## hw-03-mongodb

REST API для работы с коллекцией контактов.
Подключение к [MongoDB](https://www.mongodb.com/cloud/atlas) при помощи [Mongoose](https://mongoosejs.com/).
В функциях обработки запросов применены Mongoose-методы для работы с коллекцией контактов в базе данных.
Примененна схема модели для коллекции contacts:

```javascript
{
      name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
    },
    {versionKey: false, timestamps: true}
```

Реализовано обновление статуса контакта по маршруту

6. @ PATCH /api/contacts/:contactId/favorite

| Field     | Description                           |
| --------- | ------------------------------------- |
| **name**  | The user's unique username. Required. |
| **email** | The user's unique useremail.          |
| **phone** | The user's phone.                     |
| favorite  | The additional user status field.     |

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
