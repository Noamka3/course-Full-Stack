const validateRecipe = (req, res, next) => {
  const { title, description, ingredients, instructions, cookingTime, servings, difficulty } = req.body;
  
  if (!title || typeof title !== "string" || title.length < 3 || title.length > 100) {
    return res.status(400).json({ message: "title must be a string between 3-100 characters" });
  }
  if (!description || typeof description !== "string" || description.length < 10 || description.length > 500) {
    return res.status(400).json({ message: "description must be a string between 10-500 characters" });
  }
  if (!Array.isArray(ingredients) || ingredients.length < 1) {
    return res.status(400).json({ message: "ingredients must be an array with at least 1 item" });
  }
  if (!Array.isArray(instructions) || instructions.length < 1) {
    return res.status(400).json({ message: "instructions must be an array with at least 1 item" });
  }
  if (!cookingTime || typeof cookingTime !== "number" || cookingTime <= 0) {
    return res.status(400).json({ message: "cookingTime must be a positive number" });
  }
  if (!servings || !Number.isInteger(servings) || servings <= 0) {
    return res.status(400).json({ message: "servings must be a positive integer" });
  }
  if (!["easy", "medium", "hard"].includes(difficulty)) {
    return res.status(400).json({ message: "difficulty must be easy, medium, or hard" });
  }

  next();
};

module.exports = validateRecipe;