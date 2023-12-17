import http from "http";
import fs from "fs/promises";
import path from "path";

const server = http.createServer(async (req, res) => {
  let filePath = `.${req.url}`;

  // If the requested URL is '/', serve 'index.html'
  if (filePath === "./") {
    filePath = "./index.html";
  }

  filePath = path.resolve(filePath);

  try {
    const content = await fs.readFile(filePath, "utf-8");

    let contentType = "text/html";

    // Adjust content type based on file extension
    if (filePath.endsWith(".css")) {
      contentType = "text/css";
    } else if (filePath.endsWith(".js")) {
      contentType = "text/javascript";
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content, "utf-8");
  } catch (err) {
    if (err.code === "ENOENT") {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(500);
      res.end("500 Internal Server Error");
    }
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
