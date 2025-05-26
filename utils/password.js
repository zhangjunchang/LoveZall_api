const bcrypt = require('bcrypt');

// 密码加密
const hashPassword = async (password) => {
  const saltRounds = 10; // 加密强度
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('密码加密失败:', error);
    throw new Error('密码加密失败');
  }
};

// 密码验证
const comparePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    console.error('密码验证失败:', error);
    throw new Error('密码验证失败');
  }
};

module.exports = {
  hashPassword,
  comparePassword
};