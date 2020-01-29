const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  createdAt: String,
  countryCode: String,
  phone: String,
  verified: {
      type: Boolean,
      default: false,
  }
})

module.exports = model('User', userSchema);