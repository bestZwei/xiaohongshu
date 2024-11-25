# AI 聊天助手

## 环境变量配置
需要在 Cloudflare Pages 中配置以下环境变量：
- VITE_API_URL: API基础地址
- VITE_API_KEY: API密钥
- VITE_SYSTEM_PROMPT: 系统提示词
- VITE_MODEL_LIST: 模型列表（逗号分隔）
- VITE_DEFAULT_MODEL: 默认模型

## 部署步骤
1. Fork 本仓库
2. 在 Cloudflare Pages 中连接仓库
3. 设置环境变量
4. 部署

## 本地开发
1. 创建 .env 文件并设置环境变量
2. 使用本地服务器运行 src 目录 