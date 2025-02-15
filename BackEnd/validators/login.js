const {body} = require('express-validator');
const argon2 = require('argon2');  
const {getUserByEmail} = require('../models/authModel');

const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .custom(async(value, {req})=>{
            const existingUser = await getUserByEmail(req.body.email);
            if(existingUser){
                const match = await argon2.verify(existingUser.password, value);
                if(!match){
                    throw new Error('Password is incorrect');
                }
    
                return true;
            }else{
                throw new Error('User with this email does not exist');
            }
            
        })
    ]

module.exports = loginValidation