const { userRegister } = require('../models/authModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

class authController {
    signToken = (id) => {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
      };

      sendCookie = (token, res) => {
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly: true, // for security
        };
    
        res.cookie("jwt", token, cookieOptions); // send cookie
      };

      signUp = async (req, res, next) => {
        try {
            const newUserInput = req.body

            const hashPassword = await argon2.hash(newUserInput.password);

            newUserInput.password = hashPassword;

            const newUser = await userRegister(newUserInput);

            const postUser = {
                name: newUser.name,
                email: newUser.email,
                id: newUser.id,
                roles: newUser.roles || "user"
            }

            const token = this.signToken(postUser.id);

            this.sendCookie(token, res);

            newUserInput.password = undefined;

            res.status(200).json({
                status: "success",
                user: postUser
            })
        } catch (error) {
            next(error);
        }
      }

}

module.exports = new authController();