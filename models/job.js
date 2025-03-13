const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

// Define Job model
const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyLogoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monthlySalary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jobType: {
    type: DataTypes.ENUM('Internship', 'Full-Time', 'Part-Time', 'Contractual'),
    allowNull: false
  },
  workplaceType: {
    type: DataTypes.ENUM('Remote', 'In-Office', 'Hybrid'),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  aboutCompany: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const skills = this.getDataValue('skills');
      return skills ? skills.split(',') : [];
    },
    set(val) {
      if (Array.isArray(val)) {
        this.setDataValue('skills', val.join(','));
      } else {
        this.setDataValue('skills', val);
      }
    }
  },
  additionalInfo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'jobs',
  timestamps: true
});

// Define associations
Job.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Job, { foreignKey: 'userId' });

module.exports = Job;