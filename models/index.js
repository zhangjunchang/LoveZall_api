const sequelize = require('../config/database');
const User = require('./user');

// 同步数据库
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('数据库同步完成');
  } catch (error) {
    console.error('数据库同步失败:', error);
  }
};

// 在开发环境下自动同步数据库
if (process.env.NODE_ENV === 'development') {
  syncDatabase();
}

module.exports = {
  sequelize,
  User
};