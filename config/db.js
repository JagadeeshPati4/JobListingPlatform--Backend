const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     port: process.env.DB_PORT,
//     logging: false,
//   }
// );
const sequelize = new Sequelize(process.env.DB_HOST, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  logging: false
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;