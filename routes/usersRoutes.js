const userRoutes = require('express').Router();
const userController = require('../controllers/userController');

userRoutes.post('/add', userController.createUser);
userRoutes.get('/read', userController.getAllUsers);
userRoutes.get('/read/:email', userController.getOneUser);
userRoutes.put('/update/:id', userController.updateUser);
userRoutes.delete('/delete/:id', userController.deleteUser)

module.exports = userRoutes;