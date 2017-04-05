let express = require('express');
let app = express();

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

app.get('/recipes', function (req, res) {
  res.json(recipes);
});

app.get('/', function (req, res) {
  res.send('Welcome to the recipe API.');
});

app.listen(port, function () {
  console.log(`Recipe API app listening on port ${port}`);
});
