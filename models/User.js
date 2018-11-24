var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  aktif: Boolean
}, {
  timestamps: true
})

var User = mongoose.model('user', schema);

module.exports = User;