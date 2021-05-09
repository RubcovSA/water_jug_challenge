Application that solves the Water Jug Riddle for dynamic inputs (X, Y, Z).
Accepting GQl API queries. 

## Installation

```bash
$ yarn
```

## Running the app

```bash
$ yarn start:dev
```

Access the graphql playground through the link localhost:3000/graphql
use sample query to calculate steps for water jug riddle
```
query getPath($pathInput: PathInput!) {
  getPath(pathInput: $pathInput) {
    bestSolution {
      x
    	y
    	description
    }
    worstSolution {
      x
      y
      description
    }
  }
}
```
query variables
```
{
    "pathInput": {
        "x": 7,
        "y": 1,
        "z": 3
    }
}
```

# Tests
```bash
$ yarn test:e2e
```
