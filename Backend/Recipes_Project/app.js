const express = require("express");
const app = express();
//const {recipes} = require("./Data");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const PORT = 3000; 


//File
const DATA_PATH = path.join(__dirname, "Data", "recipes.json");
const readRecipes = () => {
  try {
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeRecipes = (recipes) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(recipes, null, 2));
  } catch (err) {
    throw new Error("Failed to save recipes");
  }
};


app.use(express.json())
app.use(morgan("dev"));
app.use(morgan(":date[iso] :method :url :status :response-time ms"));

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

app.get("/api/recipes", (req,res,next) =>{
    try{

    const {difficulty,maxCookingTime,search} = req.query;


    let result = readRecipes();
    if(difficulty){
        result = result.filter(recipe => recipe.difficulty === difficulty);
    }
    if(maxCookingTime){
        const max = Number(maxCookingTime);
        if(isNaN(max)){
            result = res.status(400).json({message:"Invalid maxCookingTime"});

        }
        result = result.filter((r) => r.cookingTime <= max);
    }
    if(search){
        result = result.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));
    }
    
    
    res.status(200).json(result);
}
    catch(err){
        next(err);
    }
});

app.get("/api/recipes/stats", (req,res,next) =>{
  try {
     const recipes = readRecipes(); 
    const allIngredients = recipes.flatMap(r => r.ingredients);


  const count = {};
  allIngredients.forEach(ingredient => {
    count[ingredient] = (count[ingredient] || 0) + 1;
  });


  const mostCommonIngredients = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

    const stats = {
        totalNumber: recipes.length,
        AverageCookingTime: recipes.reduce((total, recipe) => total + recipe.cookingTime, 0) / recipes.length,
        recipesByDifficulty: {
            easy: recipes.filter(r => r.difficulty === "easy").length,
            medium: recipes.filter(r => r.difficulty === "medium").length,
            hard: recipes.filter(r => r.difficulty === "hard").length,
        },
        mostCommonIngredients
    }

    res.status(200).json(stats);
      } catch (err) {
    next(err);
  }
})

app.get("/api/recipes/:id", (req,res,next) =>{
      try {
        const recipes = readRecipes(); 
    const Id = req.params.id
    
    const recipe = recipes.find((r) => r.id === Id);
    if(!recipe){
        return res.status(404).json({message: "Recipe not found"});    
    }


    res.status(200).json(recipe);
      } catch (err) {
    next(err);
  }
});

app.post("/api/recipes",validateRecipe, (req,res,next) => {
      try {
        const recipes = readRecipes(); 
    const { title, description, ingredients, instructions, cookingTime, servings, difficulty, rating } = req.body;

  const newRecipe = {
    id: uuidv4(),
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating: rating || 0,
    createdAt: new Date().toISOString()
  };

  recipes.push(newRecipe);
  writeRecipes(recipes); 

  res.status(201).json(newRecipe);
    } catch (err) {
    next(err);
  }
});

app.put("/api/recipes/:id", validateRecipe, (req,res,next) => {
    try {
        const recipes = readRecipes(); 
    const Id = req.params.id;

    const index = recipes.findIndex((r) => r.id === Id);

    if(index === -1){
        return res.status(404).json({message: "recipe not found"});
    }
    recipes[index] = { ...recipes[index], ...req.body };
    writeRecipes(recipes); 

  res.status(200).json(recipes[index]) 
    } catch (err) {
    next(err);
  }
});

app.delete("/api/recipes/:id", (req,res,next) => {
    try {
        const recipes = readRecipes(); 
    const id = req.params.id;
    const index = recipes.findIndex((r) => r.id === id);
    if(index === -1){
        return res.status(404).json({message: "recipe not found"});

    }
    recipes.splice(index, 1);
    writeRecipes(recipes); 
    res.status(204).send();
    } catch (err) {
    next(err);
  }
}); 



const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: true,
    message: message,
    statusCode: statusCode,
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})




