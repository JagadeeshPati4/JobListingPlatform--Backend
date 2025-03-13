const Job = require('../models/job');
const { Op } = require('sequelize');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      companyName,
      companyLogoUrl,
      position,
      monthlySalary,
      jobType,
      workplaceType,
      location,
      description,
      aboutCompany,
      skills,
      additionalInfo
    } = req.body;
   
    
    const job = await Job.create({
      companyName,
      companyLogoUrl,
      position,
      monthlySalary,
      jobType,
      workplaceType,
      location,
      description,
      aboutCompany,
      skills,
      additionalInfo,
      userId: req.user.id
    });
    
    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

// Get all jobs with filters and pagination
exports.getAllJobs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      location, 
      jobType, 
      workplaceType,
      minSalary,
      maxSalary,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    console.log('page',page);
    console.log('limit',limit);
    console.log('search',search);
    console.log('location',location);
    console.log('jobType',jobType);
    console.log('workplaceType',workplaceType);
    console.log('minSalary',minSalary);
    console.log('maxSalary',maxSalary);
    console.log('sortBy',sortBy);
    console.log('sortOrder',sortOrder);

    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Build where clause
    const whereClause = {};
    
    // Add search condition
    if (search) {
      whereClause[Op.or] = [
        { position: { [Op.like]: `%${search}%` } },
        { companyName: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Add filters
    if (location) whereClause.location = { [Op.like]: `%${location}%` };
    if (jobType) whereClause.jobType = jobType;
    if (workplaceType) whereClause.workplaceType = workplaceType;
    
    // Add salary range
    if (minSalary) whereClause.monthlySalary = { ...whereClause.monthlySalary, [Op.gte]: minSalary };
    if (maxSalary) whereClause.monthlySalary = { ...whereClause.monthlySalary, [Op.lte]: maxSalary };
    
    // Get jobs with pagination
    const { count, rows: jobs } = await Job.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: offset,
      order: [[sortBy, sortOrder]],
      // include: { 
      //   model: User, 
      //   attributes: ['id', 'name', 'email'] 
      // }
    });
    
    res.json({
      totalJobs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      jobs
    });
  } catch (error) {
    console.error('Get all jobs error:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ job });
  } catch (error) {
    console.error('Get job by id error:', error);
    res.status(500).json({ message: 'Error fetching job' });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the owner of the job
    if (job.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }
    
    // Update job
    await job.update(req.body);
    
    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Error updating job' });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the owner of the job
    if (job.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }
    
    // Delete job
    await job.destroy();
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Error deleting job' });
  }
};

// Get user's jobs
exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ jobs });
  } catch (error) {
    console.error('Get user jobs error:', error);
    res.status(500).json({ message: 'Error fetching user jobs' });
  }
};