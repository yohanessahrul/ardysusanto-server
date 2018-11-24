'use strict'
require('dotenv').config()

const bcrypt = require('bcrypt');
const saltRound = 10;
var jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
  registerUser: function (req, res) {
    const plainTextPassword = req.body.password;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(plainTextPassword, salt);
    User.findOne({
        email: req.body.email
      }, function(err, responseEmailUnique) {
        if (err) {
          return console.log(err)
        }
        // console.log(responseEmailUnique)
        if (responseEmailUnique !== null) {
          res.status(200).json({
            message: 'Email sudah digunakan'
          })
          return console.log('Email sudah digunakan')
        }

        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          role: 'author',
          aktif: false
        }, function (err, response) {
          if (err) {
            return console.log(err)
          }
          res.status(200).json({
            message: 'Register berhasil',
            data: response
          })
        })
      }
    )

  },
  login: function (req, res) {
    const plainPasswordLogin = req.body.password;
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(plainPasswordLogin, salt);
    // console.log(bcrypt.compareSync(plainPasswordLogin, hash))
    User.findOne({
      email: req.body.email
    }, function (err, response) {
      if (err) {
        return console.log(err)
      }

      if (response === null) {
        res.status(200).json({
          message: 'Anda tidak terdaftar'
        })
        return console.log('User tidak terdaftar')
      }
      
      if (!bcrypt.compareSync(plainPasswordLogin, response.password)) {
        res.status(200).json({
          message: 'Password salah',
        })
        return console.log('Periksa kembali password anda !')
      } else {

        var token = jwt.sign({
          id: response._id,
          email: response.email,
          role: response.role,
          tiket: process.env.TOKEN_TIKET
        }, process.env.SECRET_KEY_TOKEN);

        res.status(200).json({
          message: 'Selamat datang kembali, silahkan pergunakan token dengan bijak',
          data: {
            username: response.username,
            email: response.email,
            role: response.role,
            token: token
          }
        })
      }
    })
    // User.findOne({
    //   email: req.body.email,
    //   password: req.body.password
    // })
  },
  readAllUser: function (req, res) {
    User.find({}, null, function(err, response) {
      if (err) {
        return console.log(err)
      }
      res.status(200).json({
        message: 'Read all users oke',
        data: response
      })
    })
  },
  readUserById: function (req, res) {
    User.findById({
      _id: req.params.id
    }, function (err, response) {
      if (err) {
        return console.log(err)
      }
      res.status(200).json({
        message: `Data dengan id ${req.params.id} berhasil didapatkan`,
        data: response
      })
    })
  },
  resetPasswordById: function (req, res) {
    console.log(req.body.password)
    const plainTextPassword2 = req.body.password;
    const salt2 = bcrypt.genSaltSync(saltRound);
    const hash2 = bcrypt.hashSync(plainTextPassword2, salt2);

    User.findOneAndUpdate({
      _id: req.params.id
    }, {
      password: hash2
    }, function (err, response) {
      if (err) {
        return console.log(err)
      }
      res.status(200).json({
        message: 'Reset password berhasil',
        data: response
      })
    })
  },
  deleteUserById: function (req, res) {
    User.findOneAndDelete({
      _id: req.params.id
    }, function(err, response) {
      if (err) {
        return console.log(err)
      }

      if (response) {
        User.find({}, null, function (err2, response2) {
          if (err2) {
            return console.log(err2)
          }
          res.status(200).json({
            message: 'User berhasil dihapus',
            data: response2
          })

        })
      }
    })
  },
  editRoleById: function (req, res) {
    User.findOneAndUpdate({
      _id: req.params.id
    }, {
      role: req.body.role
    }, function (err, response) {
      if (err) {
        return console.log(err)
      }
      res.status(200).json({
        message: 'Role berhasil diubah',
        data: response
      })
    })
  },
  cekToken: function (req, res) {
    console.log('Masuk server auth')
    const token = req.params.token

    jwt.verify(token, process.env.SECRET_KEY_TOKEN, function(err, decoded) {
      if (err) {
        res.status(200).json({
          message: 'no'
        })
        return console.log('Token anda tidak valid')
      }
      if (decoded.tiket === process.env.TOKEN_TIKET) {
        res.status(200).json({
          message: 'okay'
        })
      }
    });
  }
}