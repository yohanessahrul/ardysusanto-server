const router = require('express').Router();
const routerBerita = require('./berita');
const routerUser = require('./user');

router.get('/', (req, res) => {
  res.send('Welcome to api for ardysusanto.com');
});
router.use('/berita', routerBerita);
router.use('/user', routerUser);
module.exports = router;    