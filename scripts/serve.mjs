import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("dist");
http.createServer(async (request, response) => {
  let file = path.resolve(root, "." + decodeURIComponent(new URL(request.url, "http://localhost").pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { response.writeHead(403); response.end(); return; }
  let status = 200;
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    await stat(file);
  } catch { status = 404; file = path.join(root, "404.html"); }
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".txt": "text/plain", ".xml": "application/xml" };
  response.writeHead(status, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
  response.end(await readFile(file));
}).listen(4173, "127.0.0.1", () => console.log("Local: http://127.0.0.1:4173"));
