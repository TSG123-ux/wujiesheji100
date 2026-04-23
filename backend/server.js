const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api', routes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`后端服务运行在 http://localhost:${PORT}`);
});