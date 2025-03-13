const Bookmark = require('../models/Bookmark');
const Job = require('../models/job');
const User = require('../models/user');

// Bookmark a job
exports.bookmarkJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id;
    
    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({
      where: { userId, jobId }
    });
    
    if (existingBookmark) {
      return res.status(400).json({ message: 'Job already bookmarked' });
    }
    
    // Create bookmark
    const bookmark = await Bookmark.create({
      userId,
      jobId
    });
    
    res.status(201).json({
      message: 'Job bookmarked successfully',
      bookmark
    });
  } catch (error) {
    console.error('Bookmark job error:', error);
    res.status(500).json({ message: 'Error bookmarking job' });
  }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    
    // Find bookmark
    const bookmark = await Bookmark.findOne({
      where: { userId, jobId }
    });
    
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    
    // Delete bookmark
    await bookmark.destroy();
    
    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ message: 'Error removing bookmark' });
  }
};

// Get user's bookmarked jobs
exports.getUserBookmarks = async (req, res) => {
  console.log('api called')
  console.log('user',req.user.id)
  try {
    const bookmarks = await Bookmark.findAll({
      where: { userId: req.user.id },
      include: {
        model: Job,
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      }
    });
    
    res.json({ bookmarks });
  } catch (error) {
    console.error('Get user bookmarks error:', error);
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
};


// Add mew bookmark
exports.addBookmark = async (req,res) => {
  try {
    // Check if the job exists
    const { jobId } = req.params;
    const userId = req.user.id;
    console.log('jobId',jobId);
    console.log('userId',userId);
    const job = await Job.findByPk(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    // Use findOrCreate to avoid duplicate entries
    const [bookmark, created] = await Bookmark.findOrCreate({
      where: { userId, jobId }
    });

    if (!created) {
      return res.json({ success: false, message: 'Job already bookmarked' });
    }

    return res.json({ success: true, message: 'Job bookmarked successfully', bookmark });
  } catch (error) {
    console.error('Add bookmark error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Check if a job is bookmarked by current user
exports.checkBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    
    const bookmark = await Bookmark.findOne({
      where: { userId, jobId }
    });
    
    res.json({ isBookmarked: !!bookmark });
  } catch (error) {
    console.error('Check bookmark error:', error);
    res.status(500).json({ message: 'Error checking bookmark' });
  }
};