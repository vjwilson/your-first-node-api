let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use( bodyParser.json() );

let port = 7777;

let recipes = [
  {
    "id": 1,
    "name": "Pecan Pie",
    "author": "Mariah Reynolds",
    "ingredients": [
      "3 eggs",
      "1 c. white sugar",
      "dash salt",
      "1 tsp. vanilla",
      "1/2 c. dark Karo syrup"
    ],
    "directions": "Melt 6 Tbsp. butter, mix in. Add 1 c. chopped nuts. Bake 57 mins. at 325 or 350."
  },
  {
    "id": 2,
    "name": "Pound Cake",
    "author": "Eliza Hamilton",
    "ingredients": [
      "1 lb. cake flour",
      "1 lb. sugar",
      "1 lb. butter",
      "1 egg"
    ],
    "directions": "Mix all ingredients thoroughly. Pour into cake pan. Bake at 350 for 1 hour and 20 minutes."
  }
];

let nextIndex = recipes.length + 1;

app.route('/recipes/:recipeId')
  .put(function(req, res) {
    const id = getRecipeIdFromUrl(req);
    const recipe = Object.assign({}, req.body);

    let validationMessages = validateRecipe(recipe);

    if (!id) {
      validationMessages = ['Bad ID', ...validationMessages];
    }

    if (validationMessages.length) {
      res.status(400);
      res.json({
        error: 'Bad request. See list for specific errors.',
        messages: validationMessages
      });
    } else {
      const result = recipes.find((recipe) => {
        return recipe.id === id;
      });

      if (result) {
        delete recipe.id;

        Object.assign(result, recipe);
        res.json(result);
      } else {
        res.status(404);
        res.json({ error: 'No recipe with that ID found '});
      }
    }
  })
  .delete(function(req, res) {
    const id = getRecipeIdFromUrl(req);

    if (!id) {
      res.status(400);
      res.json({ error: 'Bad ID' });
    } else {
      const startingLength = recipes.length;

      recipes = recipes.filter((recipe) => {
        return recipe.id !== id;
      });

      if (recipes.length < startingLength) {
        res.status(204);
        res.send();
      } else {
        res.status(404);
        res.json({ error: 'No recipe with that ID found '});
      }
    }
  })
  .get(function(req, res) {
    const id = getRecipeIdFromUrl(req);

    if (!id) {
      res.status(400);
      res.json({ error: 'Bad ID' });
    } else {
      const result = recipes.find((recipe) => {
        return recipe.id === id;
      });

      if (result) {
        req.recipe = result;
        res.json(result);
      } else {
        res.status(404);
        res.json({ error: 'No recipe with that ID found '});
      }
    }
  });

app.route('/recipes')
  .post(function (req, res) {
      const recipe = Object.assign({}, req.body);

      let validationMessages = validateRecipe(recipe);

      if (validationMessages.length) {
        res.status(400);
        res.json({
          error: 'Field validation failure. See list for specific errors.',
          messages: validationMessages
        });
      } else {
        recipe.id = nextIndex;
        recipes.push(recipe);
        nextIndex += 1;

        res.status(201);
        res.json(recipe);
      }
    })
  .get(function (req, res) {
    res.json(recipes);
  });

app.get('/', function (req, res) {
  res.send('Welcome to the recipe API.');
});

app.listen(port, function () {
  console.log(`Recipe API app listening on port ${port}`);
});

/**
 * get recipe ID from request object
 * @param  {Object} req Express request Object
 * @return {number}     positve integer, or 0 if invalid
 */
function getRecipeIdFromUrl(req) {
  const id = parseInt(req.params.recipeId, 10);

  if (Number.isNaN(id) || id < 1) {
    return 0;
  } else {
    return id;
  }
}

/**
 * check a recipe for approriate fields
 * @param  {Object} recipe the recipe to valide
 * @return {Array}         an array of validation error strings (empty array if no errors)
 */
function validateRecipe(recipe) {
  const requiredElements = [
    'name',
    'author',
    'ingredients',
    'directions'
  ];
  let validationMessages = [];

  requiredElements.forEach((element) => {
    if (!recipe[element] ||
        !recipe[element].length) {
      validationMessages.push(`The property '${element}' is required.`);
    }
  });

  return validationMessages;
}

