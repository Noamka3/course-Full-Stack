import { createServer } from "http";

const PORT = 3000;

let users = [
  { id: 1, name: "Noam", email: "AAA@example.com" },
  { id: 2, name: "kadosh", email: "BBB@example.com" },
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(data));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

const server = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  const url = req.url || "";

  // GET /api/users
  if (req.method === "GET" && url === "/api/users") {
    return sendJson(res, 200, users);
  }

  // GET /api/users/:id
  const match = url.match(/^\/api\/users\/(\d+)$/);
  if (req.method === "GET" && match) {
    const id = Number(match[1]);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return sendJson(res, 404, { error: "User not found" });
    }

    return sendJson(res, 200, user);
  }

  // POST /api/users
  if (req.method === "POST" && url === "/api/users") {
    try {
      const rawBody = await readRequestBody(req);

      if (!rawBody.trim()) {
        return sendJson(res, 400, { error: "Request body is required" });
      }

      let data;
      try {
        data = JSON.parse(rawBody);
      } catch {
        return sendJson(res, 400, { error: "Invalid JSON" });
      }

      const { name, email } = data;

      if (!name || !email) {
        return sendJson(res, 400, {
          error: "Missing required fields: name and email",
        });
      }

      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: String(name),
        email: String(email),
      };

      users.push(newUser);

      return sendJson(res, 201, {
        message: "User created",
        user: newUser,
      });
    } catch (err) {
      console.error(err);
      return sendJson(res, 500, { error: "Internal server error" });
    }
  }

  // Any other route
  return sendJson(res, 404, { error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});