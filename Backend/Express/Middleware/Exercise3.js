const express = require("express");
const Ajv = require('ajv');
const { body, param, validationResult } = require('express-validator');

const app = express();
const ajv = new Ajv();

const PORT = 3000;
app.use(express.json());

const posts = [];
const comments = [];

const requestCounts = {}; // לכל IP שומר מספר בקשות


const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, startTime: now };
    return next();
  }

  const timePassed = now - requestCounts[ip].startTime;

  if (timePassed > 60000) {
    requestCounts[ip] = { count: 1, startTime: now };
    return next();
  }

  if (requestCounts[ip].count >= 10) {
    return res.status(429).json({ error: 'Too many requests, try again in a minute' });
  }

  requestCounts[ip].count++;
  next();
};

const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.url} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};
const validateContentType = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' }); //415 - סוג של תוכן שלא נתמך
    }
  }
  next();
};

const responseFormatter = (req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (data) => {
    // אם זו תגובת שגיאה, שלח אותה כמו שהיא
    if (res.statusCode >= 400) {
      return originalJson(data);
    }
    const formatted = {
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
    };
    return originalJson(formatted);
  };

  next();
};

app.use(rateLimiter);
app.use(logger);
app.use(validateContentType);
app.use(responseFormatter);

const postSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 5, maxLength: 100 },
    content: { type: 'string', minLength: 10, maxLength: 1000 },
    tags: { type: 'array', items: { type: 'string' } },
  },
  required: ['title', 'content', 'tags'],
  additionalProperties: false,
};

const validatePost = ajv.compile(postSchema);

const validateComment = [
  body('content')
    .isLength({ min: 5, max: 500 })
    .withMessage('Content must be between 5 and 500 characters'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
];

app.post('/posts', (req, res, next) => {
  const valid = validatePost(req.body);
  if (!valid) {
    return next({ status: 400, message: validatePost.errors[0].message });
  }
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts/:postId/comments', validateComment, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: errors.array()[0].msg });
  }

  const postId = parseInt(req.params.postId);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return next({ status: 404, message: 'Post not found' });
  }

  const newComment = { id: comments.length + 1, postId, ...req.body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/posts/:postId/comments', (req, res, next) => {
  const postId = parseInt(req.params.postId);
  if (isNaN(postId)) {
    return next({ status: 400, message: 'Invalid post ID' });
  }
  const postComments = comments.filter(c => c.postId === postId);
  res.json(postComments);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});