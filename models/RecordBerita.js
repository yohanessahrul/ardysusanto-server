var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  realIdBerita: String,
  lastId: String,
  view: String,
  isi: String,
  img: String
}, {
  timestamps: true
})

var Berita = mongoose.model('berita', schema);

module.exports = Berita;