let crypto = require('../libs/data.encryption');
let User = require('../models/user.model');
let secretKeys = require('../config/secret.keys');

let {
  userController
} = require('../controllers/database.controller');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.clearCookie('x-auth');
      res.status(401).send({
        notLoggedIn: "You are not logged in."
      });
    }
  },

  get: async function (req, res, next) {
    let userId = req.user.id;
    let user = await userController.findUser({
      _id: userId
    }, res);
    if (!user) {
      res.status(401).send({
        error: 'You are not logged in'
      });
    } else {
      user.email = crypto.decrypt(user.email, secretKeys.emailKey);
      res.status(200).json({
        name: user.name,
        userName: user.userName,
        email: user.email
      });
    }
  },


  put: async (req, res, next) => {
    if (Object.keys(req.body).length != 3) {
      res.status(422).send({
        error: "Invalid format"
      });
    } else {
      let userId = req.user.id;
      let name = req.body.name;
      let userName = req.body.userName;
      let email = req.body.email;
      if (!name || !userName || !email) {
        res.status(422).send({
          error: "Invalid Data"
        });
      }
      let updatedUser = {
        name: name,
        userName: userName.toLowerCase(),
        email: crypto.encrypt(email.toLowerCase(), secretKeys.emailKey, secretKeys.emailIV)
      }

      if (updatedUser.userName == req.user.userName && updatedUser.email != req.user.email) {
        let user = await userController.findUser({
          email: updatedUser.email
        }, res);
        if (user) {
          return res.status(422).send({
            error: "Email is Already exist"
          });
        }

      } else if (updatedUser.userName != req.user.userName && updatedUser.email == req.user.email) {
        let user = await userController.findUser({
          userName: updatedUser.userName
        }, res);
        if (user) {
          return res.status(422).send({
            error: "Username is Already exist"
          });
        }

      } else if (updatedUser.userName != req.user.userName && updatedUser.email != req.user.email) {
        let user = await userController.findUser({
          userName: updatedUser.userName
        }, res);
        if (user) {
          return res.status(422).send({
            error: "Username is Already exist"
          });
        }

        user = await userController.findUser({
          email: updatedUser.email
        }, res);
        if (user) {
          return res.status(422).send({
            error: "Email is Already exist"
          });
        }
      }
      userController.updateUser(userId, updatedUser, res);
    }
  },

  delete: async (req, res, next) => {
    let userId = req.user.id;
    let user = await userController.findUser({
      _id: userId
    }, res);
    if (!user) {
      return res.status(401).send({
        error: "You are not logged in"
      });
    }
    userController.deleteUser(userId, res);
  },

  changePassword: async (req, res, next) => {
    let userId = req.user.id;
    if (Object.keys(req.body).length != 3) {
      return res.status(422).send({
        error: "Invalid Format"
      });
    }
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(422).send({
        error: "Invalid Data"
      });
    }

    let user = await userController.findUser({
      _id: userId
    }, res);
    if (user) {
      user.password = crypto.decrypt(user.password, secretKeys.passwordKey);
      if (user.password != oldPassword) {
        return res.status(401).send({
          error: "Password is incorrect"
        });
      }

      if (newPassword != confirmPassword) {
        return res.status(422).send({
          error: "Passwords don't match"
        });
      }
      userController.updateUser(userId, {
        password: crypto.encrypt(newPassword, secretKeys.passwordKey)
      }, res);
    } else {
      res.status(401).send({
        error: "You are not logged in."
      });
    }
  }
};
