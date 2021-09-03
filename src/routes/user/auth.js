const express =require('express');
const { signup, signin } = require('../../controller/user/auth');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();
const {check}=require('express-validator');




router.post('/signup',validateSignupRequest,isRequestValidated,signup);
router.post('/signin',validateSigninRequest,isRequestValidated,signin);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });


module.exports = router;
