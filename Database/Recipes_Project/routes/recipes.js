const express = require("express");
const router = express.Router();
const { Recipe, User } = require("../models");
const authenticate = require("../middleware/authenticate");
const validateRecipe = require("../middleware/validateRecipe");


router.get("/", async (req, res, next) => {
  try {
    const { difficulty, maxCookingTime, search } = req.query;

    const where = {};

    if (difficulty) {
      where.difficulty = difficulty;
    }
    if (maxCookingTime) {
      const max = Number(maxCookingTime);
      if (isNaN(max)) {
        return res.status(400).json({ message: "Invalid maxCookingTime" });
      }
      where.cookingTime = { [require("sequelize").Op.lte]: max };
    }
    if (search) {
      where.title = { [require("sequelize").Op.iLike]: `%${search}%` };
    }

    const recipes = await Recipe.findAll({
      where,
      include: [{ model: User, attributes: ["username", "firstName", "lastName"] }],
    });

    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
});


router.get("/stats", async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll();

    const allIngredients = recipes.flatMap((r) => r.ingredients);
    const count = {};
    allIngredients.forEach((ingredient) => {
      count[ingredient] = (count[ingredient] || 0) + 1;
    });
    const mostCommonIngredients = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const stats = {
      totalNumber: recipes.length,
      averageCookingTime:
        recipes.reduce((total, r) => total + r.cookingTime, 0) / recipes.length,
      recipesByDifficulty: {
        easy: recipes.filter((r) => r.difficulty === "easy").length,
        medium: recipes.filter((r) => r.difficulty === "medium").length,
        hard: recipes.filter((r) => r.difficulty === "hard").length,
      },
      mostCommonIngredients,
    };

    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
});


router.get("/myrecipes", authenticate, async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username", "firstName", "lastName"] }],
    });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
});


router.post("/", authenticate, validateRecipe, async (req, res, next) => {
  try {
    const { title, description, ingredients, instructions, cookingTime, servings, difficulty } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      userId: req.user.id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
});

// PUT /api/recipes/:id (protected)
router.put("/:id", authenticate, validateRecipe, async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // בדוק שהמשתמש הוא הבעלים
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.update(req.body);
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/recipes/:id (protected)
router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // בדוק שהמשתמש הוא הבעלים
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;