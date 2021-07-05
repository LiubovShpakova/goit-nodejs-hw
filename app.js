const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {Limiter} = require('./helpers/constants');
const contactsRouter = require('./routes/api/contacts');
const userRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static('public'));
app.use(rateLimit(Limiter));
app.use(cors());
app.use(express.json({limit: 100000}));

app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Not found ${req.baseURL}/api/contacts 🚀`});
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(500).json({status: 'fail', code: status, message: err.message});
});

module.exports = app;
