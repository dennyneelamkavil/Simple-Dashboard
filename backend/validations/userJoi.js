const Joi = require('joi');

const UserJoi = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Username should be a type of text',
        'string.empty': 'Username cannot be an empty field',
        'string.min': 'Username should have a minimum length of {#limit}',
        'any.required': 'Username is a required field',
    }),
    address: Joi.string().messages({
        'string.base': 'Address should be a type of text',
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is a required field',
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is a required field',
    }),
    confirmpassword: Joi.string().required().messages({
        'string.base': 'Confirm Password should be a type of text',
        'string.empty': 'Confirm Password cannot be an empty field',
        'any.required': 'Confirm Password is a required field',
    }),
    image: Joi.any(),
    imagePublicId: Joi.any()
});

module.exports = UserJoi