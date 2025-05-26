# LoveZall API

这是LoveZall项目的后端API服务器。

## 技术栈

- Node.js
- Express.js
- MongoDB (计划中)
- JWT认证 (计划中)

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境运行

```bash
npm start
```

## API 路由

### 用户相关
- GET /api/users - 获取用户列表
- GET /api/users/:id - 获取单个用户信息
- POST /api/users - 创建新用户
- PUT /api/users/:id - 更新用户信息
- DELETE /api/users/:id - 删除用户

### 商品相关
- GET /api/products - 获取商品列表
- GET /api/products/:id - 获取单个商品信息
- POST /api/products - 创建新商品
- PUT /api/products/:id - 更新商品信息
- DELETE /api/products/:id - 删除商品

### 订单相关
- GET /api/orders - 获取订单列表
- GET /api/orders/:id - 获取单个订单信息
- POST /api/orders - 创建新订单
- PUT /api/orders/:id - 更新订单状态
- DELETE /api/orders/:id - 删除订单

## 环境变量

创建 `.env` 文件并设置以下环境变量：

```env
PORT=3000
NODE_ENV=development
```

## 项目结构

```
├── index.js          # 应用入口文件
├── routes/           # 路由文件
│   ├── index.js      # 路由主文件
│   ├── users.js      # 用户相关路由
│   ├── products.js   # 商品相关路由
│   └── orders.js     # 订单相关路由
├── package.json      # 项目配置文件
└── .env             # 环境变量配置
```# LoveZall_api
