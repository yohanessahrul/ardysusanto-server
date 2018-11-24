const routerUser = require('express').Router();
const ControllerUser = require('../controllers/c_user');

routerUser.get('/', (req, res) => {
  res.send('Index user');
});
routerUser.post('/register', ControllerUser.registerUser);
routerUser.post('/login', ControllerUser.login);
routerUser.get('/read', ControllerUser.readAllUser);
routerUser.get('/readbyid/:id', ControllerUser.readUserById);
routerUser.post('/resetpassword/:id', ControllerUser.resetPasswordById);
routerUser.post('/editrole/:id', ControllerUser.editRoleById)
routerUser.delete('/delete/:id', ControllerUser.deleteUserById);
routerUser.get('/cekauth/:token', ControllerUser.cekToken)

module.exports = routerUser;