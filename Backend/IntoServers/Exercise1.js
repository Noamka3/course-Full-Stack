//
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Log each request (method + URL)
  console.log(`${req.method} ${req.url}`);

  // Optional: response header
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end("Welcome to my server!");
  } 
  else if (req.method === "GET" && req.url === "/about") {
    res.statusCode = 200;
    res.end("This is the about page");
  } 
  else if (req.method === "GET" && req.url === "/contact") {
    res.statusCode = 200;
    res.end("Contact: noam@example.com | Phone: 050-1234567");
  } 
  else {
    res.statusCode = 404;
    res.end("404 - Page not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});