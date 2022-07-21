const express = require("express");

const { updateShow, getShows, deleteShow, addShow } = require('../controllers/showController')

const { isAuthenticatedUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/get', isAuthenticatedUser, getShows);

router.delete('/delete/:id', isAuthenticatedUser, deleteShow);

router.put('/update/:id', isAuthenticatedUser, updateShow);

router.post('/create', isAuthenticatedUser, addShow);


module.exports = router;