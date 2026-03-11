require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

const app = express();
const PORT = process.env.PORT || 3001; 


// Middleware
app.use(express.json())
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);


// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    error: true,
    message,
    statusCode,
  });
});

// Start Server
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");
    // סנכרון המודלים עם הדאטהבייס (יצירת טבלאות)
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database error:", err);
  });




