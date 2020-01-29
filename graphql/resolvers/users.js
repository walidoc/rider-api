const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput } = require('../../util/validators');
const { validateLoginInput } = require('../../util/validators');


const generateToken = user => {
  return jwt.sign({
    id: user._id,
    email: user.email,
    phone: user.phone
  }, SECRET_KEY, { expiresIn: '24h'})
}

module.exports = {
  Mutation: {
    async register(_, { registerInput: { email, phone, countryCode } }) {

      const { notValid, errors } = validateRegisterInput(email, phone, countryCode);
      if(notValid) {
        throw new UserInputError('Validation Errors', { errors })
      }

      const user = await User.findOne({ phone });
      if(user) {
        throw new UserInputError('Phone is taken', {
          errors: {
            phone: 'Phone taken'
          }
        })
      }

      const newUser = new User({
        email,
        phone,
        countryCode,
        createdAt: new Date().toISOString()
      })

      const savedUser = await newUser.save();

      const token = generateToken(savedUser);

      return {
        ...savedUser._doc,
        id: savedUser._id,
        token
      }

    },
    async login(_, { phone }) {
      const { notValid, errors } = validateLoginInput(phone);
      if(notValid) {
        throw new UserInputError('Validation Errors', { errors })
      }

      const user = await User.findOne({ phone });
      if(!user) {
        throw new UserInputError('User does not exist', {
          errors: { 
            phone: 'User does not exist'
          }
        })
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }

    }
  }
}