const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { hashPassword } = require('../utils/password');

const User = sequelize.define('User', {
  id: {
    // 主键

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    // 用户名
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    // 性别
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    // 密码
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    // 邮箱
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  avatar: {
    // 头像
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await hashPassword(user.password);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await hashPassword(user.password);
      }
    }
  }
});

module.exports = User;