const jwt = require('jsonwebtoken');
const catchAsyncError = require('./catchAsyncErrors');
const User = require('../models/user');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const authHeader = await req.headers.authorization;

    const token = await authHeader.split(" ")[1].toString();

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();
})