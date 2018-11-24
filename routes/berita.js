const routerBerita = require('express').Router();
const ControllerBerita = require('../controllers/c_berita');

const images = require('../helper/fileupload');

routerBerita.get('/', (req, res) => {
  res.send('Ini index berita')
})
routerBerita.post('/create', images.multer.single('img'), images.sendUploadToGCS, ControllerBerita.createBerita);
routerBerita.get('/read', ControllerBerita.readAll);
routerBerita.get('/addviewer/:id', ControllerBerita.addViewer);
routerBerita.get('/readbyid/:id', ControllerBerita.readById);
routerBerita.put('/updatebyid/:id', ControllerBerita.updateById);
routerBerita.delete('/deletebyid/:id', ControllerBerita.deleteById);

module.exports = routerBerita;