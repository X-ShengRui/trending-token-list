import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ⚠️ 这里一定要指向 dist/public
const staticPath = path.resolve(__dirname, "../dist/public");

app.use(express.static(staticPath));

// 对所有未命中的请求返回 index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;