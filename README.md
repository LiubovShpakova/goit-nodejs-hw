# GoIT Node.js Course Homework

<h1 align="center"> hw-01-cli-app </h1>

Написание CLI(Command line interface) приложения

1. Получаем и выводим весь список контактов в виде таблицы (console.table)
2. Получаем контакт по id
3. Добавялем контакт
4. Удаляем контакт

<h1 align="center"> hw-02-express </h1>

REST API для работы с коллекцией контактов, поддерживает следующие рауты:

1. @ GET /api/contacts
2. @ GET /api/contacts/:contactId
3. @ POST /api/contacts
4. @ DELETE /api/contacts/:contactId
5. @ PATCH /api/contacts/:contactId

Для валидации принимаемых данных использован пакет [joi](https://github.com/sideway/joi)

<h1 align="center"> hw-03-mongodb </h1>

REST API для работы с коллекцией контактов.
Подключение к [MongoDB](https://www.mongodb.com/cloud/atlas) при помощи [Mongoose](https://mongoosejs.com/).
В функциях обработки запросов применены Mongoose-методы для работы с коллекцией контактов в базе данных.
Применена схема модели для коллекции contacts:

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

<h1 align="center"> hw-04-auth </h1>

Добавлена логика аутентификации/авторизации пользователя `user` с помощью JWT.
Чтобы каждый пользователь работал и видел только свои контакты в схеме контактов добавлено свойство `owner`.
Реализованы следующие эндпоинты:
1. @ POST /users/signup
2. @ POST /users/login
3. @ POST /users/logout
4. @ GET /users/current
5. @ PATCH /users/subscription

Добавлена пагинация с [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) для коллекции контактов (GET /contacts?page=1&limit=20).

<h1 align="center"> hw-05-avatars </h1>

Добавлена возможность загрузки аватарки пользователя через [Multer](https://github.com/expressjs/multer).

Использован пакет [gravatar](https://www.npmjs.com/package/gravatar) для того, чтобы при регистрации нового пользователя сразу генерировался ему аватар по его `email`.

Для возможности обновления аватарки, создан эндпоинт:

6. @ PATCH /users/avatars
Аватарка обработана пакетом [jimp](https://www.npmjs.com/package/jimp)

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

<h3 align="center"> 🛠 &nbsp;Tech Stack  </h3>

<span align="center">

![GitHub](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)&nbsp;
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-05122A?style=flat&logo=visual-studio-code&logoColor=007ACC)&nbsp;
![mongoose](https://img.shields.io/badge/-Mongoose-red)&nbsp;
![joi](https://img.shields.io/badge/-joi-green)&nbsp;

![github contribution grid snake animation](https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake.svg)