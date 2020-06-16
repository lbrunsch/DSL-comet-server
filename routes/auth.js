const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/signin', authController.get_SignIn);
router.post('/signin', authController.post_SignIn);
router.post('/login', authController.post_LoginApp);

router.get('/signup', authController.get_SignUp);
router.post('/signup', authController.post_SignUp);
router.post('/register', authController.post_RegisterApp);

router.get('/logout', authController.post_Logout);

module.exports = router;
