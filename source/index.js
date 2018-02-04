class ParseByAlgorithm {
  constructor(stream, readline) {
    this.Stream = stream;
    this.Readline = readline;
    this.parsedFile = [];
    this.parseAlgorithm = null;
  }
  
  setParseAlgorithm(algorithm) {
    this.parseAlgorithm = algorithm;
  }

  isParseAlgorithmNull() {
    if (this.parseAlgorithm === null) {
      return true;
    }
    return false;
  }

  exec(buffer) {
    let stream2buffer = new this.Stream.PassThrough();
    stream2buffer.end(buffer);

    if (this.isParseAlgorithmNull()) {
      this.parseAlgorithm = (keywords) => {
        return keywords;
      };
    }

    return new Promise((resolve, reject) => {
      this.lineReader(stream2buffer).on('line', (line) => {
        let splitKey = line.match(',') ? ',' : ';';
        let keywords = line.split(splitKey);

        this.parsedFile.push(this.parseAlgorithm(keywords));
      })
      .on('close', () => resolve(this.parsedFile));
    });
  }

  lineReader(stream) {
    return this.Readline.createInterface({
      input: stream
    });
  }
}

module.exports = ParseByAlgorithm;
