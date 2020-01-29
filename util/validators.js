
const mailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

module.exports.validateRegisterInput = ( email, phone, countryCode) => {
  // TODO: validate country code
  const errors = {};

  if(email.trim() === '') {
    errors.email = 'Email must be provided'
  } else if(!email.match(mailRegEx)){
    errors.email = 'Email must be valid'
  }
  
  if(phone.trim() === '') {
    errors.phone = 'Phone must be provided'
  } else if(!phone.match(phoneRegEx)){
    errors.phone = 'Phone must be valid'
  }

  if(countryCode.trim() === '') {
    errors.countryCode = 'CountryCode must be provided'
  }

  return {
    errors,
    notValid: Object.keys(errors).length
  }
} 

module.exports.validateLoginInput = (phone) => {
  const errors = {};

  if(phone.trim() === '') {
    errors.phone = 'Phone must be provided'
  } else if(!phone.match(phoneRegEx)){
    errors.phone = 'Phone must be valid'
  }

  return {
    errors,
    notValid: Object.keys(errors).length
  }
}