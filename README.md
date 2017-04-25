# Your First Node API
This is an example Node/Express API.

## Getting Started

Clone the repo, switch to the cloned directory, and install the Node dependencies.

        npm install

To run the app,

        npm start

## Using the API
The API runs on port 7777, so once it is running, point your client to:

        http://localhost:7777

The example resource is `/recipes`, so the base URL for all the examples is:

        http://localhost:7777/recipes

### Create

        POST http://localhost:7777/recipes
        
        # payload body
        {
            "name": "Hash",
            "author": "Jim Beam",
            "ingredients": [
              "1 cup corn meal",
              "1 qt. whisky"
            ],
            "directions": "Mix and bake at 350 for 45 minutes."
        }


### Read (all)

        GET http://localhost:7777/recipes

### Read (one)

        GET http://localhost:7777/1

### Update

        PUT http://localhost:7777/recipes/1
        
        # payload body
        
        {
            "name": "Hash",
            "author": "Jim Beam",
            "ingredients": [
              "1 cup corn meal",
              "2 qt. whisky"
            ],
            "directions": "Mix and bake at 300 for 30 minutes."
        }

### DELETE

        DELETE http://localhost:7777/recipes/1

## Building the API Step-by-Step
You can see how I built the API step-by-step by checking out the Git tags in order.

For example,

        git checkout v3

| tag | description |
| -- | ------------ |
| v1 | app runs, but only endpoint is the root, which just returns a message |
| v2 | GET endpoint for all recipes |
| v3 | GET endpoint for 1 recipe by ID |
| v4 | POST endpoint to create new recipes |
| v5 | PUT endpoint to edit a recipe |
| v6 | DELETE endpoint to remove a recipe |
| v7 | Refactor param and validation checking |
| v8 | Simplified route handling |

