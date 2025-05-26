const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();

// CORS配置
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL
    : process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // CORS预检请求缓存24小时
};

// 中间件配置
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 基础路由
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LoveZall API' });
});

// API 路由
app.use('/api', require('./routes'));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 端口配置
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});