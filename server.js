let express = require('express');
let app = express();

let port = 7777;

app.get('/', function (req, res) {
  res.send('Welcome to the recipe API.');
});

app.listen(port, function () {
  console.log(`Recipe API app listening on port ${port}`);
});
