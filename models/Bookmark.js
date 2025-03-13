const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Job = require('./job');

// Define Bookmark model
const Bookmark = sequelize.define('Bookmark', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'id'
    }
  }
}, {
  tableName: 'bookmarks',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'jobId']
    }
  ]
});

// Define associations
Bookmark.belongsTo(User, { foreignKey: 'userId' });
Bookmark.belongsTo(Job, { foreignKey: 'jobId' });
User.hasMany(Bookmark, { foreignKey: 'userId' });
Job.hasMany(Bookmark, { foreignKey: 'jobId' });

module.exports = Bookmark;