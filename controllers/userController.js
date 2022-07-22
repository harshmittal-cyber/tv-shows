const User = require('../models/user');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../services/ErrorHandler');

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        const user = await User.create({ email, password });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            token, user
        });
    } else {
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return next(new ErrorHandler('Invalid Password', 401));
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            token,
            user
        });
    }
})