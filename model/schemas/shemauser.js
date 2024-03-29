const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// const {v4: uuidv4} = require('uuid');
const {nanoid} = require('nanoid');
const SALT_FACTOR = 6;
const {Subscription} = require('../../helpers/constants');

const SubscriptionValues = Object.values(Subscription);
// console.log('🚀: SubscriptionValues', SubscriptionValues);

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be 8 characters or more'],
        maxlength: 100,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
          const re = /\S+@\S+\.\S+/;
          return re.test(String(value).toLowerCase());
        },
      },
      subscription: {
        type: String,
        enum: {
          values: SubscriptionValues,
          message: 'It is not allowed',
        },
        default: 'starter',
      },
      token: {
        type: String,
        default: null,
      },
      avatarURL: {
        type: String,
        default: function() {
          return gravatar.url(this.email, {s: '250'}, true);
        },
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verifyToken: {
        type: String,
        required: [true, 'Verify token is required'],
        default: nanoid(),
      },
    },
    {versionKey: false, timestamps: true},
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);
// console.log('🚀: User', User);

module.exports = User;
