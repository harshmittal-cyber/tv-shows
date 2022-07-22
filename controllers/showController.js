const catchAsyncError = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../services/ErrorHandler');
const Show = require('../models/show');


exports.addShow = catchAsyncError(async (req, res, next) => {
    const { title, app, rating, review } = req.body;

    if (!title || !app || !rating || !review) {
        return next(new ErrorHandler(`All Fields Required`, 400));
    }

    const show = await Show.create({
        title, app, rating, review, userId: req.user._id
    })

    return res.status(201).json({
        message: 'Show Created Successfully',
        show,
        success: true
    });
})

exports.deleteShow = catchAsyncError(async (req, res, next) => {
    const show = await Show.findOne({ _id: req.params.id });

    if (!show) {
        return next(new ErrorHandler('Invalid Show', 404));
    }

    await Show.deleteOne({ _id: req.params.id });

    return res.status(200).json({
        _id: req.params.id,
        message: 'Show Removed Successfully',
        success: true
    });
})

exports.updateShow = catchAsyncError(async (req, res, next) => {
    let { app } = req.body;

    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidatros: true
    });

    return res.status(200).json({
        message: `${app} Updated Successfully`,
        success: true,
        show
    });
})


exports.getShows = catchAsyncError(async (req, res, next) => {
    const shows = await Show.find({ userId: req.user._id });

    if (!shows) {
        return next(new ErrorHandler('Invalid shows', 404));
    }

    return res.status(200).json({
        message: 'Shows Found Sucessfully',
        shows,
        success: true
    });
})