import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // 根据环境变量选择静态文件目录
  const staticPath = process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  // 使用 express 提供静态文件服务
  app.use(express.static(staticPath));

  // 捕获所有路由，返回 index.html（适用于 SPA）
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  // 启动服务器并监听
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});