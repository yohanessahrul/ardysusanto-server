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
      console.log('Create Berita => ', response.judul)
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
      console.log('Baca => ', response.judul)
    })
  },
  updateById: function (req, res) {
    Berita.findOneAndUpdate({
      _id: req.params.id
    }, {
      judul: req.body.judul,
      isi: req.body.isi,
    }, function (err, response) {
      if (err) {
        return console.log('err ==> ', err)
      }
      res.status(201).json({
        message: `Data ${req.params.id}, berhasil di update !`,
        data: response
      })
      console.log('Update => ', response.judul)
    })
  },
  deleteById: function (req, res) {
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
        console.log('Delete => ', response.judul)
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
  },
  changeImageById: function (req, res) {
    Berita.findOneAndUpdate({
      _id: req.params.id
    }, {
      img: req.file.cloudStoragePublicUrl
    }, function (err, response) {
      if (err) {
        return console.log(err)
      }
      
      Berita.find({}, null, function (err2, response2) {
        if (err2) {
          return console.log('err ==>', err2);
        }
        res.status(200).json({
          message: 'Gambar berhasil diubah',
          data: response2,
        })
        console.log('Change Image => ', response.judul)
      })
    })
  },
  beritaTerbaruById: function (req, res) {
    Berita.find({}, null, function(err, response) {
      if (err) {
        return console.log(err)
      }
      let beritaTerbaru = [];
      for (var i=0; i < response.length; i++) {
        if (response[i]._id != req.params.id && beritaTerbaru.length < 3) {
          beritaTerbaru.push(response[i])
        }
      }
      res.status(200).json({
        message: 'Berita terbaru berhasil didapatkan',
        data: beritaTerbaru
      })
    })
  }
}