# LoveZall API

## 项目简介
LoveZall API 是一个基于 Express.js 框架开发的后端服务，为LoveZall前端应用提供RESTful API接口。

## 技术栈
- Node.js
- Express.js
- MySQL (Sequelize ORM)
- bcrypt (密码加密)

## 环境要求
- Node.js >= 14.0.0
- MySQL >= 5.7

## 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd LoveZall_api
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
创建 `.env` 文件并配置以下环境变量：
```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

# 前端URL配置
FRONTEND_URL=http://localhost:5173
PRODUCTION_URL=https://your-production-domain.com
```

4. 启动服务
```bash
pnpm start
```

## API 文档

### 用户相关接口

#### 注册用户
```http
POST /users
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "email": "string",
  "gender": "string",
  "avatar": "string"
}
```

#### 用户登录
```http
POST /users/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### 获取用户列表
```http
GET /users
```

#### 获取单个用户信息
```http
GET /users/:id
```

#### 更新用户信息
```http
PUT /users/:id
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "gender": "string",
  "avatar": "string"
}
```

#### 删除用户
```http
DELETE /users/:id
```

## 错误处理

服务器返回的错误格式如下：
```json
{
  "message": "错误信息"
}
```

常见HTTP状态码：
- 200: 请求成功
- 201: 创建成功
- 400: 请求参数错误
- 401: 未授权
- 404: 资源不存在
- 500: 服务器内部错误

## 开发指南

### 项目结构
```
LoveZall_api/
├── config/           # 配置文件
├── models/           # 数据模型
├── routes/           # 路由处理
├── utils/            # 工具函数
├── .env              # 环境变量
├── .gitignore        # Git忽略文件
├── index.js          # 应用入口
├── package.json      # 项目配置
└── README.md         # 项目文档
```

### 数据库模型

#### User 模型
```javascript
{
  id: number,          // 主键
  username: string,     // 用户名
  password: string,     // 密码（加密存储）
  email: string,        // 邮箱
  gender: string,       // 性别
  avatar: string,       // 头像URL
  createdAt: datetime,  // 创建时间
  updatedAt: datetime   // 更新时间
}
```

## 安全性
- 使用bcrypt进行密码加密
- 实现了CORS安全配置
- 环境变量管理敏感信息

## 贡献指南
1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

## 许可证
[MIT License](LICENSE)
