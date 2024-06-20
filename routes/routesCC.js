const express = require('express');
const middlewareCC = require('../middleware/middlewareCC');
const controllerCC = require('../controllers/controllerCC.js');
const controllerReccomendation = require('../controllers/controllerReccommend.js');
const routesCC = express.Router();

//Login
routesCC.get('/users', middlewareCC, controllerCC.getUsers);
routesCC.post('/register', controllerCC.registerUser);
routesCC.post('/login', controllerCC.loginUser);
routesCC.post('/logout', middlewareCC, controllerCC.logoutUser); // Endpoint untuk logout
routesCC.get('/users/:id', controllerCC.getUserById); // Endpoint untuk mendapatkan pengguna berdasarkan ID, dilindungi oleh middlewareCC
routesCC.put('/users/:id', middlewareCC, controllerCC.updateUser);
routesCC.delete('/users/:id', middlewareCC, controllerCC.deleteUser);

//Artikel
routesCC.get('/getArticle', controllerCC.getArticles);
routesCC.get('/getArticleById/:id', controllerCC.getArticleById);
routesCC.get('/getArticlesByCategory', controllerCC.getArticlesByCategory);
routesCC.get('/getArticleByIdAndCategory/:id', controllerCC.getArticleByIdAndCategory);

//BMI
routesCC.post('/users/:user_id/health', controllerCC.storeUserHealthData);
routesCC.get('/users/:user_id/health', controllerCC.getUserHealthData);
routesCC.put('/users/:user_id/health', controllerCC.updateUserHealthData);

routesCC.get('/getFood', controllerReccomendation.getFood);
routesCC.get('/getExercise', controllerReccomendation.getExercise);
module.exports = routesCC;