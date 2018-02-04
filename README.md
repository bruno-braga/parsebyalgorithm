## ParseByAlgorithm

ParseByAlgorithm is a small application that parser a csv file according to the algorithm(function) you set.

Code sample:
```javascript
const Parser = require('parsebyalgorithm');
const stream = require('stream');
const readline = require('readline');
const fs = require('fs');

let algorithm = (data) => {
    // manipulate data the way you want here,
    // just keep in mind that you will be reading
    // one line per "iteration" as the Parser uses nodejs readline module
}

const parser = new Parser(stream, readline);
parser.setParseAlgorithm(algorithm);

const buffer = fs.readFileSync('path_to_a_file');

const resolvingData = parser.exec(buffer);
resolvingData
    .then(parsedData => console.log(parsedData))
    .catch(err => console.error(err));
```

## Testing

```bash
  npm test
```

## Example
 
```bash
  npm run example 
```
