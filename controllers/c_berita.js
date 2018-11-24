const Berita = require('../models/Berita');

module.exports = {
  createBerita: function (req, res) {
    Berita.create({
      judul: req.body.judul,
      isi: req.body.isi,
      view: 0,
      img: req.file.cloudStoragePublicUrl
    } , function (err, response) {
      if (err) {
        return console.log('err ==> ', err);
      }
      res.status(201).json({
        message: 'Data berhasil disimpan',
        data: response,
      })
    })

  },
  readAll: function (req, res) {
    Berita.find({}, null, function (err, response) {
      if (err) {
        return console.log('err ==>', err);
      }
      res.status(200).json({
        message: 'Data berita berhasil dibaca',
        data: response,
      })
    })
  },
  readById: function (req, res) {
    Berita.findById({
      _id: req.params.id
    }, function (err, response) {
      if (err) {
        return console.log('err ==> ', err);
      }
      res.status(200).json({
        message: `Data dengan id ${req.params.id} berhasil ditemukan`,
        data: response
      })
    })
  },
  updateById: function (req, res) {
    console.log(`Update berita dari id ke=${req.params.id}, berhasil`)
    Berita.findOneAndUpdate({
      _id: req.params.id
    }, {
      judul: req.body.judul,
      isi: req.body.isi,
      img: req.body.img
    }, function (err, response) {
      if (err) {
        return console.log('err ==> ', err)
      }
      res.status(201).json({
        message: `Data ${req.params.id}, berhasil di update !`,
        data: response
      })
    })
  },
  deleteById: function (req, res) {
    console.log(`Hapus berdasarkan data dengan ID ${req.params.id}`)
    Berita.findOneAndDelete({
      _id: req.params.id
    }, function (err, response) {
      if (err) {
        return console.log(err)
      }
      Berita.find({}, null, function (err, response2) {
        if (err) {
          return console.log('err ==>', err);
        }
        res.status(200).json({
          message: `Data dengan id ${req.params.id} berhasil dihapus`,
          data: response2
        })
      })
    })
  },
  addViewer: function (req, res) {
    Berita.findById({
      _id: req.params.id
    }, function (err, response) {
      if (err) {
        return console.log('err ==> ', err);
      }
      Berita.findByIdAndUpdate({
        _id: req.params.id
      }, {
        view: Number(response.view) + 1
      }, function (err2, response2) {
        if (err2) {
          console.log(err2)
        }
        res.status(200).json({
          message: 'Viewer berhasil ditambahkan',
          data: response2
        })
      })
    })
  }
}