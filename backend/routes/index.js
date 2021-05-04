const express = require('express');
const router = express.Router();
mongoose = require('mongoose');

const addEditArticle = require('../controller/addEditArticle');
const dashboard = require('../controller/dashboard');
const homepage = require('../controller/homepage');
const signUpUser = require('../controller/signUpUser');
const login = require('../controller/login');
const categoryFilter = require('../controller/categoryFilter');
const detail = require('../controller/detail');
const removeArticle = require('../controller/removeArticle');


router.post('/signUpUser', signUpUser);
router.post('/getUser', login);


router.post('/addNewListing', addEditArticle.addNewListing);
router.get('/editedArticle', addEditArticle.editedArticle);
router.post('/editedArticleUpdate', addEditArticle.editedArticleUpdate);

router.get('/dashboard', dashboard);
router.get('/homepage', homepage);
router.get('/detail', detail);
router.delete('/removeArticle', removeArticle);

router.get('/categoryFilter', categoryFilter);

module.exports = router;

