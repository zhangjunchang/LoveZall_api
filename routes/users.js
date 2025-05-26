const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { comparePassword } = require('../utils/password');

// 获取用户列表
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({ message: '获取用户列表失败' });
  }
});

// 获取单个用户信息
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(user);
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ message: '获取用户信息失败' });
  }
});

// 创建新用户
router.post('/', async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = await User.create({
      username,
      password, // 注意：实际应用中应该对密码进行加密
      email,
      phone
    });
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('创建用户失败:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }
    res.status(500).json({ message: '创建用户失败' });
  }
});

// 更新用户信息
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const { username, email, phone, avatar, status } = req.body;
    await user.update({
      username,
      email,
      phone,
      avatar,
      status
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('更新用户信息失败:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }
    res.status(500).json({ message: '更新用户信息失败' });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    await user.destroy();
    res.json({ message: '用户删除成功' });
  } catch (error) {
    console.error('删除用户失败:', error);
    res.status(500).json({ message: '删除用户失败' });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }

    // 验证密码
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '密码错误' });
    }

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json({
      message: '登录成功',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ message: '登录失败' });
  }
});

module.exports = router;