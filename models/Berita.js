var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  judul: String,
  view: Number,
  isi: String,
  img: String
}, {
  timestamps: true
})

var Berita = mongoose.model('berita', schema);

module.exports = Berita;