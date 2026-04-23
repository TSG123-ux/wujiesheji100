# 无界设计：创意管理系统

## 项目简介
这是一个创意管理系统，用于连接设计师、客户和平台，提供设计服务的管理和协作功能。

## 如何替换首页图片

### 步骤1：准备图片
准备6张图片，分别命名为：
- design1.png（创意设计1）
- design2.png（创意设计2）
- design3.jpeg（创意设计3）
- collab1.png（高效协作1）
- collab2.png（高效协作2）
- collab3.png（高效协作3）

### 步骤2：替换图片
将准备好的图片复制到 `public/images/` 目录，替换现有的占位图片文件。

### 步骤3：部署更新
1. 构建项目：`npm run build`
2. 部署到 GitHub Pages：`npm run deploy`

## 本地开发
1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 访问：http://localhost:5173

## 项目结构
- `src/`：源代码目录
- `public/`：静态资源目录
  - `images/`：首页图片目录
- `backend/`：后端服务器代码

## 技术栈
- 前端：React + Vite + React Router
- 后端：Node.js + Express
- 部署：GitHub Pages
