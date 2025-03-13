const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const auth = require('../middlewares/auth');

// All bookmark routes are protected
router.use(auth);

// Bookmark a job
router.post('/', bookmarkController.bookmarkJob);

// add bookmark
router.post('/:jobId', bookmarkController.addBookmark);

// Remove bookmark
router.delete('/:jobId', bookmarkController.removeBookmark);

// Get user's bookmarked jobs
router.get('/user', bookmarkController.getUserBookmarks);

// Check if a job is bookmarked
router.get('/check/:jobId', bookmarkController.checkBookmark);

module.exports = router;