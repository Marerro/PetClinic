const router = require('express');
const authController = require('../controllers/authController');
const loginValidation = require('../validators/login');
const validateNewUser = require('../validators/signup');
const validate = require("../validators/validate");

const authRouter = router();

authRouter.post('/signup', validateNewUser, validate, authController.signUp);
authRouter.post('/login', loginValidation, validate, authController.logIn);
authRouter.get('/me', authController.protect, authController.getAuthenticatedUser)
authRouter.get('/logout', authController.logout);

module.exports = authRouter;