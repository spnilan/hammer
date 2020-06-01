const express = require('express')
const router = express.Router()
const { auth } = require('../../middleware/auth')
const { catchAsync,  AppError } = require('../../middleware/error')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')


// @route       GET api/auth
// @desc        Test route
// @access      Public
router.get('/', auth, catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return next(AppError.NO_USER_FOUND);
    }
    return res.json(user);
}))

// @route       Post api/auth
// @desc        Authenticate user & get token
// @access      Public
router.post('/', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .exists()
], 
catchAsync(async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors.array(), 400));
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) return next(AppError.USER_NOT_FOUND);
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return next(AppError.INVALID_CREDENTIALS);

    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(payload, config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
            if (err) throw err;
            res.json( { token })
        });

}))

module.exports = router;