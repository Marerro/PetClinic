const { userRegister, getUserByEmail, getUserById } = require('../models/authModel');
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
          httpOnly: true, 
        };
    
        res.cookie("jwt", token, cookieOptions); 
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

      logIn = async (req, res, next) => {
        try {
          const { email} = req.body;

          const user = await getUserByEmail(email);

          const token = this.signToken(user.id);

          console.log(token);

          this.sendCookie(token, res);

          user.password = undefined;
          user.id = undefined;

          res.status(200).json({
            status: "success",
            data:user
          })

        } catch (error) {
          next(error);
        }
      }

      protect = async (req, res, next) => {
        try {

          const token = req.cookies?.jwt;

      
          if (!token) {
            throw new AppError(
              "You are not logged in. Please login to get access",
              401
            );
          }
      
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const currentUser = await getUserById(decoded.id);

          console.log("decoded", decoded);
      
          if (!currentUser) {
            throw new AppError(
              "The user belonging to this token does no longer exist",
              404
            );
          }
          req.user = currentUser;
          next();
        } catch (error) {
          next(error);
        }
      };

      allowAccessTo = (...roles) => {
        return (req, res, next) => {
          try {
            if (!roles.includes(req.user.role)) {
              throw new AppError(
                'You do not have permission to perform this action',
                403
              );
            }
            next();
          } catch (error) {
            next(error);
          }
        };
      };

      getAuthenticatedUser = async (req, res, next) => {
        try {

          const authdUser = req.user;
          authdUser.password = undefined;
          res.status(200).json({
            status: "success",
            data: authdUser,
          });
        } catch (error) {
          next(error);
        }
      };

      logout = async (req, res) => {
          return res.clearCookie("jwt").status(200).json({
            message:"You are logged out!",
          })
      }
      

}

module.exports = new authController();