// 簡易 静的サーバー   node server.js  →  http://localhost:8787
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 8787;
const MIME = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8", ".json":"application/json; charset=utf-8",
  ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".gif":"image/gif",
  ".svg":"image/svg+xml", ".webp":"image/webp", ".ico":"image/x-icon" };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(ROOT, path.normalize(p).replace(/^(\.\.[/\\])+/, ""));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"}); res.end("404 Not Found"); return; }
    res.writeHead(200, {"Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream"});
    res.end(data);
  });
}).listen(PORT, () => console.log(`Mail Builder → http://localhost:${PORT}`));
