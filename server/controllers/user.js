const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: "User with the given mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              surname: req.body.surname
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  id: user._id,
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (!result) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          let token = jwt.sign(
            {
              email: user.email,
              _id: user._id
            },
            'secret',
            {
              expiresIn: '2h'
            },
          )
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: {
              _id: user._id,
              email: user.email,
              name: user.name,
              surname: user.surname
            }
          });
          res.status(401).json({
            message: "Auth failed"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_get = (req, res, next) => {
  User.findById(req.params._id).select('email name surname _id')
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      delete user.password
      res.status(200).json({
        user: user
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json ({
        error: err
      })
    })
}
