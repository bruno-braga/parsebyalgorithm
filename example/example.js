const Parser = require('../source/index');
const stream = require('stream');
const readline = require('readline');
const fs = require('fs');

let algorithm = (data) => {
  return data.reverse();
};
const parser = new Parser(stream, readline);
parser.setParseAlgorithm(algorithm);

const buffer = fs.readFileSync('./file.csv');

const resolvingData = parser.exec(buffer);
resolvingData
    .then(parsedData => console.log(parsedData))
    .catch(err => console.error(err));
